import "../css/Calendar.css"
import { CalendarRow } from "./CalendarRow"

export function Calendar({ tasks, activeDay, onTasksUpdate }) {

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    function getDaysInMonth(year, month) {
        const length = new Date(year, month, 0).getDate();
        const daysInMonth = [];
        for (let i = 1; i <= length; i++) {
            let newDate = new Date(year, month - 1, i);
            daysInMonth.push({
                date: formatDate(newDate),
                weekDay: newDate.toLocaleString("en-US", { weekday: "long" }),
                tasks: []
            });
        }
        return daysInMonth;
    }

    function addTasks(days) {
        for (let i = 0; i < days.length; i++) {
            for (let j = 0; j < tasks.length; j++) {
                if (days[i].date === tasks[j].date) {
                    days[i].tasks.push(tasks[j])
                }
            }
        }
        return days;
    }

    function getWeeks(days) {
        const weeks = [];
        let week = [];
        for (let i = 0; i < days.length; i++) {
            week.push(days[i]);
            if ((i != days.length - 1 && days[i + 1].weekDay === "Monday") || i === days.length - 1) {
                weeks.push(week);
                week = [];
            }
        }
        for (let i = 0; i <= (10 - weeks[0].length); i++) {
            weeks[0].unshift({
                date: "",
                weekDay: "",
                tasks: []
            })
        }
        for (let i = 0; i <= (6 - weeks[weeks.length - 1].length); i++) {
            weeks[weeks.length - 1].push({
                date: "",
                weekDay: "",
                tasks: []
            })
        }
        return weeks;
    }



    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const weeks = getWeeks(addTasks(getDaysInMonth(currentYear, currentMonth)))

    const deleteTask = (taskName) => {
        const newTasks = tasks.filter((task) => task.name != taskName)
        onTasksUpdate(newTasks)
    }

    return (
        <div className="main">
            <div className="days">
                {Array.from({ length: 7 }, (_, i) => (
                    <div key={i}>{["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"][i]}</div>
                ))}
            </div>
            <div className="calendar">
                {weeks.map((week, i) => {
                    return <CalendarRow key={i} days={week} activeDay={activeDay} deleteTask={deleteTask} />
                })}
            </div>
        </div>
    )
}