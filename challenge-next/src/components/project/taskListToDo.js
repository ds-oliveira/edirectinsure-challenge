import axios from 'axios'
import cookieCutter from 'cookie-cutter'
import styles from './taskListToDo.module.css'
import EditableLabelTask from './editableLabelTask'
import ActionIcon from './actionIcon'
import Checkbox from './../commons/checkbox'

export default function TaskList({ title, tasks, model }) {
    const deleteTask = (taskId) => {
        if (confirm("Are you sure you want to delete this task?")) {
            const body = model.state.map(p => {
                p.tasks = p.tasks.filter(f => f._id !== taskId)
                return p
            })

            axios
                .put('/api/project',
                    body,
                    { headers: { token: cookieCutter.get('token') } })
                .then((response) => {
                    model.setState(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const moveTask = (taskId) => {
        if (confirm("Are you sure you want do move this task to done?")) {
            const body = model.state.map(p => {
                const task = p.tasks.find(f => f._id === taskId)

                if (task) {
                    task.status = "done"
                    task.endDate = new Date().toISOString()
                    task.isChecked = true
                    p.tasks = p.tasks.filter(f => f._id !== taskId)
                    p.tasks.push(task)
                }

                return p
            })

            axios
                .put('/api/project',
                    body,
                    { headers: { token: cookieCutter.get('token') } })
                .then((response) => {
                    model.setState(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const checkTask = (taskId, target) => {
        const body = model.state.map(p => {
            const task = p.tasks.find(f => f._id === taskId)
            
            if (task) {
                task.isChecked = target.checked
            }

            return p
        })

        axios
            .put('/api/project',
                body,
                { headers: { token: cookieCutter.get('token') } })
            .then((response) => {
                model.setState(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const renameTask = (taskId, target) => {
        const body = model.state.map(p => {
            const task = p.tasks.find(f => f._id === taskId)
            
            if (task) {
                task.name = target.value
            }

            return p
        })

        axios
            .put('/api/project',
                body,
                { headers: { token: cookieCutter.get('token') } })
            .then((response) => {
                model.setState(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className={styles.taskList}>
            <div><label>{title}</label></div>
            {tasks.filter(f => f.status === "todo").map(task =>
                (<Checkbox isChecked={task.isChecked} key={task._id} change={({target}) => checkTask(task._id, target)}>
            <EditableLabelTask task={task} blur={({target}) => renameTask(task._id, target)} ></EditableLabelTask>
            <ActionIcon image="images/delete.svg" clickAction={() => deleteTask(task._id)}></ActionIcon>
            <ActionIcon image="images/done.svg" clickAction={() => moveTask(task._id)}></ActionIcon>
                </Checkbox>))
}
        </div >
    )
}