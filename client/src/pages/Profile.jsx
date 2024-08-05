import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "../css/Profile.css"

export function Profile() {
    const location = useLocation();
    const { avatar, email, password, tasks } = location.state;
    const [user, setUser] = useState({
        email: email,
        password: password,
        avatar: avatar,
        tasks: tasks
    })

    const [toMain, setToMain] = useState(false);
    const [imageUrl, setImageUrl] = useState(`/imgs/${avatar}`);
    const [selectedFile, setSelectedFile] = useState(null);
    const [newEmail, setNewEmail] = useState(email);
    const [newPassword, setNewPassword] = useState(password);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setImageUrl(URL.createObjectURL(event.target.files[0]));
    }
    const submitEditing = async (event) => {
        event.preventDefault()
      
        const formData = new FormData()
        formData.append('email', email)
        formData.append('newEmail', newEmail)
        formData.append('newPassword', newPassword)
        formData.append('newAvatar', selectedFile)
      
        const response = await fetch("/api/user/edit", {
            method: "PUT",
            body: formData,
        })
      
        if (response.ok) {
            const data = await response.json()
            data.tasks = tasks;
            setUser(data);
            alert("Editing successful!");
        } else {
            alert("Failed to edit")
            throw new Error("Failed to edit")
        }
      }

    return (
        <div className="profile">
            <button onClick={() => {setToMain(!toMain)}}>←Back</button>
            <form class="editProfile" onSubmit={submitEditing}>
                <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
                <img src={imageUrl ? `${imageUrl}` : "https://miro.medium.com/v2/resize:fit:720/1*W35QUSvGpcLuxPo3SRTH4w.png"} alt="avatar" onClick={() => document.querySelector('input[type="file"]').click()} />
                <input id="email" type="email" value={newEmail} onChange={(event) => {setNewEmail(event.target.value)}} placeholder='Enter your email:' required/>
                <input id="pass" type="text" value={newPassword} onChange={(event) => {setNewPassword(event.target.value)}} placeholder='Enter your password:' required/>
                <button type="submit">Save user data</button>
            </form>
            
            {toMain && <Navigate to="/main" state={user}></Navigate>}
        </div>
    )
}