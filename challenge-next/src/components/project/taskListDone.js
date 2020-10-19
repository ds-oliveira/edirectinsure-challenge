import ReactTooltip from 'react-tooltip'
import styles from './taskListDone.module.css'
import Checkbox from './../commons/checkbox'

export default function TaskListDone({ title, tasks }) {
    return (
        <div className={styles.taskList}>
            <div><label>{title}</label></div>
            {tasks.filter(f => f.status === "done").map(task =>
                (<Checkbox permanentChecked="true">
                    <a data-tip data-for={task._id}>
                        <label style={{ marginLeft: "5px", fontSize: 14, color: "black" }}>{task.name}</label>
                    </a>
                    <ReactTooltip id={task._id} type='info'>
                        <span>{task.endDate}</span>
                    </ReactTooltip>
                </Checkbox>))
            }
        </div>
    )
}