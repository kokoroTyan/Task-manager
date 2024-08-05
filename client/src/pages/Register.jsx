import "../css/Register.css"
import { useState } from "react"
import { Navigate, Link } from "react-router-dom"

export function Register() {
    const [showPass, setShowPass] = useState(false)
    const [showPassRep, setShowPassRep] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [newUser, setNewUser] = useState({})

    const submitRegistration = async (event) => {
        event.preventDefault()
        const email = document.getElementById("email").value
        const password = document.getElementById("pass").value
        const passwordRep = document.getElementById("passRep").value

        if (password !== passwordRep) {
            alert("Passwords do not match!")
            return;
        }

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, pass: password }),
        })

        if (response.ok) {
            const data = await response.json()
            setNewUser(data)
            setRegistered(true)
        } else {
            alert("Failed to register")
            throw new Error("Failed to register")
        }
    }


    return (
        <div className="container">
            <div className="regArea">
                {!registered &&
                    <>
                        <h2>Create a new account!</h2>
                        <form onSubmit={submitRegistration}>
                            <label>
                                Enter your email:<br />
                                <input type="email" id="email" required />
                            </label>
                            <label>
                                Enter your password:<br />
                                <div className="input-container">
                                    <input type={showPass ? "text" : "password"} id="pass" required />
                                    <button
                                        type="button"
                                        onClick={() => { setShowPass(!showPass) }}
                                        className="toggle-button"
                                    >
                                        {showPass ? <i class="bi bi-eye"/> : <i class="bi bi-eye-slash"/>}
                                    </button>
                                </div>
                            </label>
                            <label>
                                Repeat your password:<br />
                                <div className="input-container">
                                    <input type={showPassRep ? "text" : "password"} id="passRep" required /><button
                                        type="button"
                                        onClick={() => { setShowPassRep(!showPassRep) }}
                                        className="toggle-button"
                                    >
                                        {showPassRep ? <i class="bi bi-eye"/> : <i class="bi bi-eye-slash"/>}
                                    </button>
                                </div>
                            </label>
                            <button type="submit">Register</button>
                            <Link className="link" to="/log-in">Already have an account? Log in!</Link>
                        </form>
                    </>
                }

                {registered && <Navigate to="/main" state={newUser}></Navigate>}
            </div>
        </div>
    )
}