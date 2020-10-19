import { useState } from 'react'
import axios from 'axios'
import cookieCutter from 'cookie-cutter'
import styles from './project.module.css'
import Input from '../../components/commons/input'
import Button from '../../components/commons/button'
import TaskListToDo from '../../components/project/taskListToDo'
import TaskListDone from '../../components/project/taskListDone'
import EditableLabelProject from '../../components/project/editableLabelProject'
import ActionIcon from '../../components/project/actionIcon'

export default function Project({ model, project }) {
    const [inputState, setInputState] = useState("")

    const deleteProject = (projectId) => {
        if (confirm("Are you sure?")) {
            const body = model.state.filter(p => p._id !== projectId)

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

    const createTask = (projectId) => {
        if (inputState) {
            const body = model.state.map(p => {
                if (p._id === projectId) {
                    p.tasks = [...p.tasks, { name: inputState, createdAt: new Date().toISOString(), status: "todo", isChecked: false }]
                }
                return p
            })

            axios
                .put('/api/project',
                    body,
                    { headers: { token: cookieCutter.get('token') } })
                .then((response) => {
                    model.setState(response.data)
                    setInputState("")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    const renameProject = (projectId, target) => {
        const body = model.state.map(p => {

            if (p._id === projectId) {
                p.name = target.value
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

    const updateValue = ({ target }) => {
        setInputState(target.value)
    }

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <EditableLabelProject defaultValue={project.name} blur={({ target }) => renameProject(project._id, target)}></EditableLabelProject>
                <ActionIcon image="images/delete.svg" clickAction={() => deleteProject(project._id)}></ActionIcon>
            </div>
            <div className={styles.body}>
                {project.tasks && project.tasks.filter(f => f.status === "todo").length > 0
                    ? (<TaskListToDo title="To Do" model={model} tasks={project.tasks.filter(f => f.status === "todo")}>
                    </TaskListToDo>)
                    : ""
                }

                {project.tasks && project.tasks.filter(f => f.status === "done").length > 0
                    ? (<TaskListDone title="Done" model={model} tasks={project.tasks.filter(f => f.status === "done")}>
                    </TaskListDone>)
                    : ""
                }

                <hr />

                <div style={{ marginBottom: "50px" }}>
                    <Input height="30px" width="65%" placeholder="Task" value={inputState} changeFunction={updateValue}></Input>
                    <Button height="30px" width="30%" backgroundColor="#50db40" float="right" marginRight="5px" clickFunction={() => createTask(project._id)}>Add</Button>
                </div>
            </div>
        </div>
    )
}