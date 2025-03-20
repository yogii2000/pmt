import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import Home from './Admin/Home';
import ApproverSidebar from './Approver/ApproverSidebar';
import EmployeeSidebar from './Employee/EmployeeSidebar';

const ChangePassword = () => {
    const history = useNavigate();
    const [passwordType, setPasswordType] = useState("password");
    const [passwordcnfrmType, setPasswordcnfrmType] = useState("password");
    const role = localStorage.getItem('role')
    const togglePassword =()=>{
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }
      const togglecnfrmPassword =()=>{
        if(passwordcnfrmType==="password")
        {
         setPasswordcnfrmType("text")
         return;
        }
        setPasswordcnfrmType("password")
      }
    const [changepassword,setchangepassword] = useState({
        oldpassword:'', newpassword:'', confirmpassword:''
    })
    const id = localStorage.getItem('id')
    const handleinputs = (e) => {
        const newdata = { ...changepassword }
        newdata[e.target.name] = e.target.value;
    setchangepassword(newdata)
        
      }
      const submitbutton = async(e)=>{
        try {
            e.preventDefault();
                const {  oldpassword, newpassword, confirmpassword} = changepassword;
            const response = await fetch('/changepassword',{
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    oldpassword, newpassword, confirmpassword,id
                })
            })
            if(response.status===200){
                toast.success("Password changed successfully...", {
                    position: "top-center"
        });
        setchangepassword({oldpassword:'', newpassword:'', confirmpassword:''})
                // if(localStorage.getItem('role')==='Admin'){
                //     history('/AdminDashboard')
                // }
                // if(localStorage.getItem('role')==='Approver'){
                //     history('/ApproverDashboard')
                // }
                // if(localStorage.getItem('role')==='Employee'){
                //     history('/EmployeeDashboard')
                // }
            }
            else if(response.status===501){
                toast.error("New password and confirm password doesn't matched", {
                    position: "top-center"
        });
            }
            else if(response.status===502){
                toast.error("Enter all details", {
                     position: "top-center"
        });
            }
            else if(response.status===505){
                toast.error("Old password is wrong", {
                      position: "top-center"
        });
            }
          
        } catch (error) {
            console.log(error)
        }
      }
      
  return (
    <>
    {
        role==='Admin' ? <Home/> : role==='Approver' ? <ApproverSidebar/> : <EmployeeSidebar/>
    }
    <div className="dashboard">
    <div className="topper d-flex">
          <div className="path ">
            <span>Change Password</span>
          </div>
          <div className="back" onClick={() => history('/AdminDashboard')}>
            {/* back button icon  */}
            <i  className="fa-solid fa-angle-left"></i>
          </div>
        </div>
    <div className='change-password'>
        <div className='change-password-inner'>
             <div className="header">
             <h5 className='gcolor'>Change Password</h5>
             <button className='gcolor cancel-btn' onClick={()=>{history(-1)}}><h7>X</h7></button>
             </div>
             <form onSubmit={submitbutton} autoComplete="off" >
              <input onChange={(e) => handleinputs(e)} value={changepassword.oldpassword} name='oldpassword' className='form-control' type="password " placeholder='Old password' autoComplete='off' required/>
              <div className="newpassword d-flex">
              <input onChange={(e) => handleinputs(e)} value={changepassword.newpassword} name='newpassword' className='form-control' type={passwordType} placeholder='New password'  pattern="(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" autoComplete='new-password' required/>
              <span className="eye" onClick={togglePassword}>
                     { passwordType==="password"? <i className="fa-solid fa-eye-slash"></i> :<i className="fa-solid fa-eye"></i> }
                     </span>
              </div>
                  <div className="confirmpassword d-flex">
              <input onChange={(e) => handleinputs(e)} value={changepassword.confirmpassword} name='confirmpassword' className='form-control' type={passwordcnfrmType} placeholder='Confirm password' autoComplete='off' required/> 
              <span className="eye" onClick={togglecnfrmPassword}>
                     { passwordcnfrmType==="password"? <i className="fa-solid fa-eye-slash"></i> :<i className="fa-solid fa-eye"></i> }
                     </span>
                  </div>
              <p>Must have minimum 8 characters : atleast one upper case, lower 
                   case, number and special character</p>
              <button  className='btn btn-primary bgcolor changepasswordbtn' >Submit</button>
             </form>
        </div>
    </div>
    </div>
    <ToastContainer/>
    </>
  )
}

export default ChangePassword