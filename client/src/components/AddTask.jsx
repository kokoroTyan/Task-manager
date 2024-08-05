import "../css/AddTask.css"

export function AddTask({ onTasksUpdate }) {

    const addTask = async (event) => {
        event.preventDefault()

        const name = document.getElementById("name").value
        const description = document.getElementById("description").value
        const category = document.getElementById("category").value
        const startTime = document.getElementById("startTime").value
        const endTime = document.getElementById("endTime").value
        const date = document.getElementById("date").value


        if (Number(startTime.split(":").join("")) >= Number(endTime.split(":").join(""))) {
            alert("Please input valid time")
            throw new Error("Failed to add a task")
        }

        const response = await fetch("/api/add-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                description: description,
                category: category,
                startTime: startTime,
                endTime: endTime,
                date: date
            }),
        })

        if (response.ok) {
            const data = await response.json()
            onTasksUpdate(data.tasks)
            document.getElementById("name").value = ""
            document.getElementById("description").value = ""
            document.getElementById("category").value = ""
            document.getElementById("startTime").value = ""
            document.getElementById("endTime").value = ""
            document.getElementById("date").value = ""
        } else {
            alert("Failed to add a task")
            throw new Error("Failed to add a task")
        }
    }


    return (
        <form className="addTaskForm" onSubmit={addTask}>
            <input type="text" placeholder="Event name" id="name" required />
            <textarea type="text" placeholder="Description" id="description" />
            <select name="category" id="category">
                <option value="UrgImp">Urgent important</option>
                <option value="UrgNotImp">Urgent not important</option>
                <option value="NotUrgImp">Not urgent important</option>
                <option value="NotUrgNotImp">Not urgent not important</option>
            </select>
            <input type="time" placeholder="Start time" id="startTime" required />
            <input type="time" placeholder="End time" id="endTime" required />
            <input type="date" placeholder="Date of event/task" id="date" required />
            <button type="submit">Add event</button>
        </form>
    )
}