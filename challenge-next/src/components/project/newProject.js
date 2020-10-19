import { useState } from 'react'
import axios from 'axios'
import cookieCutter from 'cookie-cutter'
import styles from './newProject.module.css'
import Button from '../commons/button'
import Input from '../commons/input'

export default function NewProject({ model }) {
    const [inputState, setInputState] = useState("")

    const createProject = () => {
        if (inputState) {
            const newProject = { name: inputState, tasks: [] }
            const body = [...model.state, newProject]

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

    const updateValue = ({ target }) => {
        setInputState(target.value)
    }

    return (
        <div className={styles.card}>
            <div className={styles.innerCard}>
                <div className={styles.form}>
                    <label>Create a new project</label>
                    <div>
                        <Input value={inputState} height="30px" width="100%" placeholder="Project name" changeFunction={updateValue}></Input>
                    </div>
                    <Button height="30px" width="100%" backgroundColor="#42d7f5" clickFunction={createProject}>Create Project</Button>
                </div>
            </div>
        </div>
    )
}