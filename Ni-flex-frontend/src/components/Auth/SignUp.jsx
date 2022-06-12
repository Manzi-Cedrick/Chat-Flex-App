import React,{ useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './signIn.css'
function SignUp() {
const [email,setEmail]=useState("");
const [password,setpassword]=useState("");
const [username,setUsername]=useState("");
const [isValid,setisValid]=useState(false);
const [showPass,setShowPass]=useState(false);
const [pic,setPic]=useState(null);
const [loading,setisLoading]=useState(false);
const handleSubmit = (event)=>{
    event.preventDefault()
    if (!password.trim().length==0|| !email.trim().length==0 || !username.trim().length || !pic.trim().length) {
        setisLoading(true);
    }if(password.trim().length==0|| email.trim().length==0){
        setisValid(true)
    }else{
    setEmail('')
    setpassword('')
    setUsername('')
    setisLoading(false)
    }
    const SignUp = async () =>{
        const response = await fetch('http://localhost:3500/api/chat/signup',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },body: JSON.stringify({
                name: username,
                email : email,
                password : password,
                pic:pic
            })
        })
        const data = await response.json()
        if(data.success){
            console.log('Function Okay')
        }
    }
    SignUp()
}
const PostDetails =(pics)=>{
    if(pics === undefined){
        setisValid(true);
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png' || pics.type === 'image/jpg') {
        setisLoading(true);
        const data = new FormData();
        data.append('file',pics);
        data.append('upload_preset','chat-app');
        data.append('cloud_name','real-service-ltd')
        fetch('https://api.cloudinary.com/v1_1/real-service-ltd/image/upload',{
            method: 'POST',
            body: data
        }).then((response)=>response.json()).then((data)=>{
            setPic(data.url);
            setisLoading(false);
        }).catch((error)=>{console.log(error)});
    }
}
const handleEmail = (event)=>{
    setEmail(event.target.value)
}
const handlepassword = event =>{
    setpassword(event.target.value)
}
const handleUsername = event =>{
    setUsername(event.target.value)
}
const handleShowPass = () =>{
    setShowPass((PrevState)=>!PrevState)
}
  return (
    <div className="sign-up">
    <span id="header">Sign Up</span>
    <div className="form">
        <form onSubmit={handleSubmit}>
            <label>Username</label><input type="text" placeholder="Enter your Username" value={username} onChange={handleUsername}/> {isValid && <small style={{ 'color':'red'}}>No UserName Please</small>} 
            <label>Email Address</label><input type="email" placeholder="Enter your email" value={email} onChange={handleEmail}/> {isValid && <small style={{ 'color':'red'}}>No email Please</small>}
            <label>Password</label>
            <input type={`${ showPass ? ' text' : 'password' }`} placeholder="Enter your password" value={password} onChange={handlepassword} autoComplete="true"/> {isValid && <small style={{ 'color':'red'}}>No password Please</small>}
            {showPass ? <FaEyeSlash onClick={handleShowPass} className="see"/> : <FaEye onClick={handleShowPass}  className="see"/> }
            <label>Upload Profile</label><input type="file" accept="image/*" onChange={(e)=>PostDetails(e.target.files[0])} />
            <div>
            <div className={`${loading && ' spinner'}`}></div>
            <input type="submit" value={`${loading ? '':'Sign Up'}`}/>
            </div>
        </form>
    </div>
</div>
  )
}

export default SignUp