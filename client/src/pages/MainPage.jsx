import '../css/MainPage.css'
import { useLocation } from 'react-router-dom'
import { useState } from "react"
import { Calendar } from "../components/Calendar"
import { AddTask } from '../components/AddTask'
import { TasksList } from '../components/TasksList'
import { MainHeader } from "../components/MainHeader"

export function MainPage() {
    const location = useLocation();
    const { avatar, email, tasks, password } = location.state;
    const [updatedTasks, setUpdatedTasks] = useState(tasks);

    const handleTasksUpdate = (updatedTasks) => {
        setUpdatedTasks(updatedTasks);
    };

    let [today, setToday] = useState(new Date())
    const formatedDate = new Intl.DateTimeFormat(
        "en-US",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
        .format(today)


    const goBack = () => {
        if (today.getDate() != 1) {
            const newDate = new Date(today.getTime())
            newDate.setDate(newDate.getDate() - 1)
            setToday(newDate)
        }
    }
    const goForward = () => {
        if (today.getDate() < new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()) {
            const newDate = new Date(today.getTime())
            newDate.setDate(newDate.getDate() + 1)
            setToday(newDate)
        }
    }

    return (
        <div className="main-page">
            <MainHeader avatar={avatar} email={email} password={password} tasks={tasks} />
            <div className="main-container">
                <div className="center">
                    <div className="top">
                        <div className='current-day-field'>
                            <p>Today</p>
                            <div className="today">
                                <button className="dayBack" onClick={goBack}>←</button>
                                <p>{formatedDate}</p>
                                <button className="dayForward" onClick={goForward}>→</button>
                            </div>
                        </div>
                        <ul className='categories'>
                            <li style={{color: "#d55448"}}>■ Urgent important</li>
                            <li style={{color: "#ffa577"}}>■ Urgent not important</li>
                            <li style={{color: "#896e69"}}>■ Not urgent important</li>
                            <li style={{color: "#ffccb3"}}>■ Not urgent not important</li>
                        </ul>
                    </div>
                    <div className="calendarField">
                        <Calendar tasks={updatedTasks} activeDay={today.toISOString().slice(0, 10)} onTasksUpdate={handleTasksUpdate} />
                    </div>
                </div>
                <div className="right">
                    <AddTask onTasksUpdate={handleTasksUpdate} />
                    <TasksList tasks={updatedTasks} activeDay={today} />
                </div>
            </div>
        </div>
    )
}