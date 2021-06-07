
import { useState } from "react"
import Signup from "./Signup"

const Login =(props)=>{
    const [login, setLogin] = useState({})
    const [signupToggle, setSignupToggle]=useState(false)
    const [message,setMessage] =useState("")
    const handleSubmit =(e)=>{
        e.preventDefault()
        fetch(`http://localhost:3000/users/${login.username}`)
        .then(res=>res.json())
        .then(user=>{
            if(user){
                if(user.password===login.password){
                    console.log('logged in')
                    props.setCurrentUser(user)
                    setMessage('')
                }else{
                    setMessage('Wrong password, try 123!')
                }
                
            }else{
                setMessage('No username found, try tsering!')
            }
        })
    }
    
    const renderSignup =(e)=>{
        e.preventDefault()
        setSignupToggle(!signupToggle)
    }
    return(
        <div>
            <h1 className='login-header'>Login</h1>
            <form
            className = "login-form"
            >
                <input
                placeholder = 'username please'
                name = "username"
                value = {login.username}
                onChange ={(e)=>setLogin({...login, username: e.target.value})}
                />
                <input
                type ="password"
                name = "password"
                value = {login.password}
                onChange ={(e)=>setLogin({...login, password: e.target.value})}
                placeholder = 'start typing your password'
                />
                <label className = 'login-message'>
                {message}
                </label>
                <div>
                    <button
                        onClick={handleSubmit}
                    >Log In</button>
                    <button
                    onClick={renderSignup}
                    >Sign Up</button>
                </div>
                
            </form>
        {signupToggle && <Signup toggle={renderSignup}/>}
        </div>
        )
}

export default Login