import React, { useEffect } from 'react'
import logo from '../icons/Login.png'
import logo2 from '../icons/abc.png'
import { ToastContainer, toast } from 'react-toastify';
import '../App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'

const Login = () => {
  const history = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [user,setUser] = useState('')
  const [logindata, setlogindata] = useState({
    userid: "",
    password: ""
  })
  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  }
  const handleinput = (e) => {
    const newdata = { ...logindata }
    newdata[e.target.name] = e.target.value;
    setlogindata(newdata)
  }
  const senddata = async (e) => {
    try {
      e.preventDefault();
      const { userid, password } = logindata
      //  to fetch the data from page 
      const resp = await fetch('/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userid, password
        })
      })
      
      if (resp.status === 200) {
         const respp = await resp.json();
          if(respp[0].role==='Admin'){
            
            localStorage.setItem("auth", true);
            localStorage.setItem("role", 'Admin');
            localStorage.setItem("id", respp[0].empid);
            history('/AdminDashboard');
          }
          else if(respp[0].role==='Approver'){
            localStorage.setItem("auth", true);
            localStorage.setItem("role", 'Approver');
            localStorage.setItem("id", respp[0].empid);
            history('/ApproverDashboard');
          }
          else {
            localStorage.setItem("auth", true);
            localStorage.setItem("role", 'Employee');
            localStorage.setItem("id", respp[0].empid);
            history('/EmployeeDashboard');
          }
      }
      else if (resp.status === 402) {
        toast.error("Enter necessary details", {
          position: "top-center"
  
        });
      }
      else {
        toast.error("Invalid Credentials!", {
          position: "top-center"
  
        });
      }
    } catch (error) {
      console.log(error)
    }
 
  }
  if (user) {
     const role = localStorage.getItem('role')
     if(role==='Admin'){
      history('/AdminDashboard');
     }
     else if(role==='Approver'){
      history('/ApproverDashboard');
     }
     else{
      history('/EmployeeDashboard')
     }
  }
  useEffect(()=>{
    const loggedInUser = localStorage.getItem("auth");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  })
  return (
    <>
    <div className="container-fluid">
      <div className="row" >
        <div className="col-lg-5 col-md-6 col-sm-12">
          
        <form onSubmit={senddata} method="POST" className='p-5 mt-5'>
        <div>
        <div className='img-logo'>
        <img src={logo2}  alt="" />
       </div>
          <h1 className='gcolor mt-4 mb-4'>Log - In</h1>
          </div>
  <div className="mb-4">
    <input name='userid' type="email" autoComplete='off' className='form-control' placeholder='User Id' onChange={(e) => {
              handleinput(e)
            }} value={logindata.userid} required/> 
  </div>
  <div className="mb-4 d-flex">
    <input name='password' type={passwordType} className='form-control' placeholder='Password' onChange={(e) => {
              handleinput(e)
            }} value={logindata.password} required/>
                  <span className="eye-icon" onClick={togglePassword}>
                     { passwordType==="password"? <i className="fa-solid fa-eye-slash"></i> :<i className="fa-solid fa-eye"></i> }
                     </span>
  </div>
  <div className="d-grid gap-2 mt-5">
  <button className='btn btn-primary login-button bgcolor' type='submit'>Log In</button>
  </div>
</form>
        </div>
        <div className="col-lg-7 col-md-6 col-sm-12  login-backgroundcolor">
        <div className='p-5 mt-5 text-center login-img '>
        <img src={logo} alt="Logo" className='' />
        </div>
        </div>
      </div>
    </div>
      <ToastContainer />
    </>
  )
}

export default Login