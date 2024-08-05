import "../css/TasksList.css"

export function TasksList({ tasks, activeDay }) {
    const formatedDate = new Intl.DateTimeFormat(
        "en-US",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
        .format(activeDay)

    const tasksForToday = tasks.filter((task) => task.date === activeDay.toISOString().slice(0, 10))

    return (
        <div className="tasksList">
            <h4>{formatedDate}</h4>
            {tasksForToday.map((task) => {
                return (
                    <div className="task" id={task.category}>
                        <div>{task.name} - {task.startTime}</div>
                        <div>{task.description}</div>
                    </div>
                )
            })}
        </div>
    )
}