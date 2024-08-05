import "../css/CalendarCell.css"

export function CalendarCell({ day, isActive, deleteTask }) {
    const handleDeleteTask = async (taskName) => {
        const response = await fetch(`/api/delete-task/${taskName}`, {
            method: "DELETE"
        })
        if (!response.ok) {
            alert("Failed to delete a task")
            throw new Error("Failed to delete a task")
        }
        deleteTask(taskName);
    }
    return (
        <div className="cell" id={isActive ? "active" : ""}>
            {day.tasks ? (
                <>
                    <div className="tasks">{day.tasks.map((task, i) => {
                        return (
                            <div className="task" id={task.category}>
                                <div className="task-data">
                                    <div>{task.name}</div>
                                    <div>{task.startTime} - {task.endTime}</div>
                                </div>
                                <button className="deleteTask" onClick={() => handleDeleteTask(task.name)}>x</button>
                            </div>
                        )
                    })}</div>
                    
                    <p className="date">{day.date.split("-")[2]}</p>
                </>
            ) : (
                    <p className="date">{day.date.split("-")[2]}</p>
                )}
        </div>
    )
}