
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import cookieCutter from 'cookie-cutter'
import axios from 'axios'
import Board from '../../components/commons/board'
import Project from '../../components/project/project'
import NewProject from '../../components/project/newProject'

export default function Dashboard() {
    const [userState, setUserState] = useState({})
    const [state, setState] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (!cookieCutter.get('token')) {
            router.push('/')
        }

        if (!userState.name) {
            axios
                .get('/api/user', {
                    headers: {
                        token: cookieCutter.get('token')
                    }
                })
                .then((response) => {
                    setUserState({ name: response.data.name })
                    setState(response.data.projects)
                })
                .catch((err) => {
                    router.push('/')
                })
        }
    })

    return (
        <div>
            <Head>
                <title>Dashboard</title>
            </Head>
            <Board userName={userState.name}>
                <NewProject model={{ state, setState }}></NewProject>
                {
                    state
                        ? state.map(project =>
                            <Project key={project._id} project={project} model={{ state, setState }}></Project>)
                        : ""
                }
            </Board>
        </div>
    )
}