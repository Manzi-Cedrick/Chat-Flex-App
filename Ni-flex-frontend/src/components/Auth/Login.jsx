import React,{useState} from 'react';
import './signIn.css';
import { useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function Login() {
const navigate = useNavigate()
const [email,setEmail]=useState('');
const [password,setpassword]=useState('');
const [isValid,setisValid]=useState(false);
const [showPass,setShowPass]=useState(false)
const handleSubmit = (event)=>{
    event.preventDefault()
    if (!password.trim().length==0|| !email.trim().length==0) {
    }if(password.trim().length==0|| email.trim().length==0){
        setisValid(true)
    }
    setEmail('')
    setpassword('')
    const LoginUser = async () =>{
        try{
        const response = await fetch('http://localhost:3500/api/chat/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await response.json()
        if(data.message) {
            localStorage.setItem('chat-token',data.chat_token)
            navigate('/chats');
        }
        }catch(error){console.log(error)}
    }
    LoginUser()
}
const handleEmail = (event)=>{
    setEmail(event.target.value)
}
const handlepassword = event =>{
    setpassword(event.target.value)
}
const handleShowPass = () =>{
    setShowPass((PrevState)=>!PrevState)
}
  return (
    <div className="sign-in">
    <span id="header">Sign In</span>
    <div className="form">
        <form onSubmit={handleSubmit}>
            <label>Email Address</label><input type="email" placeholder="Enter your email" value={email} onChange={handleEmail}/> {isValid && <small style={{ 'color':'red'}}>No email Please</small>}
            <label>Password</label>
            <input type={`${ showPass ? ' text' : 'password' }`} placeholder="Enter your password" value={password} onChange={handlepassword} autoComplete="true"/> {isValid && <small style={{ 'color':'red'}}>No password Please</small>}
            {showPass ? <FaEyeSlash onClick={handleShowPass} className="see"/> : <FaEye onClick={handleShowPass}  className="see"/> }
            <div className="checks">
                <input type="checkbox"/><span>Remember me</span>
                <span id="forgot">Forgot password?</span>
            </div>
            <input type="submit" value="Sign In"/>
        </form>
        <div className="sign-in-register">
        <span>Dont' have an account ? Sign Up</span>
        </div>
    </div>
</div>
  )
}

export default Login
