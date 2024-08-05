import "../css/Register.css"
import { useState } from "react"
import { Navigate, Link } from "react-router-dom"

export function Authorise() {
    const [showPass, setShowPass] = useState(false)
    const [authorised, setAuthorised] = useState(false)
    const [user, setUser] = useState({})

    const submitLogIn = async (event) => {
        event.preventDefault()
        const email = document.getElementById("email").value
        const password = document.getElementById("pass").value

        const response = await fetch("/api/authorise", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email, pass: password }),
        })

        if (response.ok) {
            const data = await response.json()
            setUser(data)
            setAuthorised(true)
        } else {
            alert("Failed to authorise")
            throw new Error("Failed to authorise")
        }
    }

    return (
        <div className="container">
            <div className="regArea">
                {!authorised &&
                    <>
                        <h2>Log into your account!</h2>
                        <form onSubmit={submitLogIn}>
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
                            <button type="submit">Log in</button>
                            <Link className="link" to="/register">Don't have an account yet? Sign up!</Link>
                        </form>
                    </>
                }

                {authorised && <Navigate to="/main" state={user}></Navigate>}
            </div>
        </div>
    )
}