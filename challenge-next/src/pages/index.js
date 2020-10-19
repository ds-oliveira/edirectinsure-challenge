import { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router'
import {sha256} from 'js-sha256'
import Form from '../components/commons/form'
import Input from '../components/commons/input'
import Button from '../components/commons/button'
import ErrorMessage from '../components/commons/errorMessage'

export default function Login(){
    const [credentials, setCredentials] = useState({})
    const [error, setError] = useState("")
    const router = useRouter()

    const login = async() => {
      if(!credentials.email){
        return setError("Email is required")
      }

      if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(credentials.email)){
        return setError("Invalid Email")
      }

      if(!credentials.password){
        return setError("Password is required")
      }

      if(credentials.password.length <6){
        return setError("Password is too short (Min. 6)")
      }

      if(credentials.password.length >16){
        return setError("Password is too long (Max. 16)")
      }

      credentials.password = sha256(credentials.password)

      axios.post('/api/auth', credentials)
      .then((response) => {
        cookieCutter.set("token", response.data.token)
        router.push('/dashboard')
      })
      .catch((err) => {
        console.log(err)
        setError(err.response.data.message)
      })
    }

    const set = ({target}) => setCredentials({...credentials, [target.name]: target.value})

    return (<div>
      <Head>
        <title>Sign In</title>
      </Head>
      <Form width="50vw" marginTop="10vh" marginLeft="25vw">
        <Input name="email" placeholder="Your email"  height="30px" width="100%" changeFunction={set}></Input>
        <Input name="password" type="password"  height="30px" placeholder="Your password" width="100%" changeFunction={set}></Input>
        <Button clickFunction={login} backgroundColor="green"  height="30px" marginTop="10px" width="100%">Login</Button>
        <Button clickFunction={() => router.push('sign-up')} backgroundColor="blue"  height="30px" marginTop="10px" width="100%">Create a new account</Button>
        <ErrorMessage>{error}</ErrorMessage>
      </Form>
    </div>)
}