import Dropdown from 'react-bootstrap/Dropdown';
import { useLocation } from 'react-router-dom'
import { useState } from "react"
import { Navigate } from "react-router-dom"
import "../css/MainHeader.css"

export function MainHeader({ avatar, email, password, tasks }) {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [toProfilePage, setЕoProfilePage] = useState(false);

    const user = {
        email: email,
        password: password,
        avatar: avatar,
        tasks: tasks,
    }

    const handleToggle = () => {
        setToggleMenu(!toggleMenu);
    }

    const handleLogOut = async(event) => {
        event.preventDefault()

        const response = await fetch(`/api/logout/${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (response.ok) {
            window.location.href = "/";
        } else {
            alert("Failed to log out")
            throw new Error("Failed to log out")
        }
    }

    return (
        <div className="header">
            <img src={avatar ? `/imgs/${avatar}` : "https://miro.medium.com/v2/resize:fit:720/1*W35QUSvGpcLuxPo3SRTH4w.png"} alt="avatar" />
            <h2>{email}</h2>

            <Dropdown show={toggleMenu}>
                <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={handleToggle}>
                    {toggleMenu ? "▲" : "⯆"}
                </Dropdown.Toggle>

                <div className="menu-container">
                    {toggleMenu && (
                        <Dropdown.Menu className="menu">
                            <Dropdown.Item className="dd-item"><button onClick={handleLogOut}>Log out</button></Dropdown.Item>
                            <Dropdown.Item className="dd-item"><button onClick={() => {setЕoProfilePage(!toProfilePage)}}>Edit profile</button></Dropdown.Item>
                        </Dropdown.Menu>
                    )}
                </div>
                
            </Dropdown>
            {toProfilePage && <Navigate to="/profile" state={user}></Navigate>}
        </div>
        
    )
}