import { useState} from 'react'
import Head from 'next/head'
import axios from 'axios'
import Form from '../../components/commons/form'
import Input from '../../components/commons/input'
import Button from '../../components/commons/button'
import cookieCutter from 'cookie-cutter'
import { useRouter } from 'next/router'
import ErrorMessage from '../../components/commons/errorMessage'
import {sha256} from 'js-sha256'

export default function SignUp(){
    const [user, setUser] = useState({})
    const [error, setError] = useState("")
    const router = useRouter()

    const register = async() => {
      if(!user.email){
        return setError("Email is required")
      }

      if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(user.email)){
        return setError("Invalid Email")
      }

      if(!user.name){
        return setError("Name is required")
      }

      if(user.name.length <6){
        return setError("Name is too short (Min. 6)")
      }
 
      if(user.name.length >255){
        return setError("Name is too long (Max. 255)")
      }

      if(!user.password){
        return setError("Password is required")
      }

      if(user.password.length <6){
        return setError("Password is too short (Min. 6)")
      }

      if(user.password.length >16){
        return setError("Password is too long (Max. 16)")
      }

      user.password = sha256(user.password)

      axios.post('/api/user', user)
        .then((response) => {
          cookieCutter.set("token", response.data.token)
          router.push('/dashboard')
        })
        .catch((err) => {
          console.log(err)
          setError(err.response.data.message)
        })
    }

    const set = ({target}) => setUser({...user, [target.name]: target.value})

    return (<div>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Form width="50vw" marginTop="10vh" marginLeft="25vw">
        <Input name="name" placeholder="Your name"  height="30px" width="100%" changeFunction={set}></Input>
        <Input name="email" placeholder="Your email"  height="30px" width="100%" changeFunction={set}></Input>
        <Input name="password" type="password"  height="30px" placeholder="Your password" width="100%" changeFunction={set}></Input>
        <Button clickFunction={register} backgroundColor="green"  height="30px" marginTop="10px" width="100%">Register</Button>
    <ErrorMessage>{error}</ErrorMessage>
      </Form>
    </div>)
}