import { useState } from "react"
const Signup=(props)=>{
    const [user, setUser]=useState({})
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(user)
        fetch(`http://localhost:3000/users`, {
            method: "POST",
            headers: {
                accept: 'application/json',
                "content-type": 'application/json'
            },
            body: JSON.stringify({
                name: user.name,
                username: user.username,
                password: user.password
            })
        })
        .then(res=>res.json())
        .then(newUser=>{
            console.log(newUser)
        })
        .catch(error=>console.log(error))
        props.toggle(e)
    }
    return(
        <div className ='signup-modal'>
            <div className='signup-modal-content'>
                {/* <h1 className ='close'> X </h1> */}
                <h1 className='login-header'>Sign Up</h1>
                <form
                className = "login-form"
                >
                    <input
                    placeholder = 'Name'
                    name = "name"
                    value = {user.name}
                    onChange ={(e)=>setUser({...user, name: e.target.value})}
                    />
                    <input
                    placeholder = 'username please'
                    name = "username"
                    value = {user.username}
                    onChange ={(e)=>setUser({...user, username: e.target.value})}
                    />
                    <input
                    type ="password"
                    name = "password"
                    value = {user.password}
                    onChange ={(e)=>setUser({...user, password: e.target.value})}
                    placeholder = 'start typing your password'
                    />
                    <div>
                        <button
                            onClick={handleSubmit}
                        >Sign Up</button>
                    </div>
                
                </form>
            </div>
        </div>
        
    )

}
export default Signup