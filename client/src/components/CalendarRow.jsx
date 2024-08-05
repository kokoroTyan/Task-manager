import { CalendarCell } from "./CalendarCell"
import "../css/CalendarRow.css"

export function CalendarRow({ days, activeDay, deleteTask }) {
    // const rowTasksUpdate = (day) => {
    //     for (let i = 0; i < days.length; i++) {
    //         if (days[i].date === day.date) {
    //             days[i] = day;
    //         }
    //     }
    //     onTasksUpdate(days)
    // }

    return (
        <div className="row">
            {days.map((day, i) => {
                if (day.date === activeDay) {
                    return <CalendarCell key={i} day={day} isActive={true} deleteTask={deleteTask} />
                }
                return <CalendarCell key={i} day={day} isActive={false} deleteTask={deleteTask} />
            })}
        </div>
    )
}