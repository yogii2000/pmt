import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from "react-tooltip"
import Home from './Home';

const AddDepartment = () => {
  const history = useNavigate();
  const [department, setdepartment] = useState("")
  const createdepartment = async (e) => {
    e.preventDefault();
    const date = new Date()
    const res = await fetch('/AddDepartment', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          department,date
        }
      )
    },date)
    setdepartment("");
    const resp = res;
    if (resp.status === 200) {
      toast.success("Department Added Successfully", {
        position: "top-center"
      });
    }
    else {
      toast.error("Department already exists", {
        position: "top-center"
      });
    }
  }
  return (
    <>
    <Home/>
       <div className="dashboard">
        <div className="topper d-flex">
          <div className="path ">
            <span>Create Department</span>
          </div>
          <div className="back" onClick={() => history('/AdminDashboard')}>
            {/* back button icon  */}
            <i  className="fa-solid fa-angle-left"></i>
          </div>
        </div>
        <div className='adddepartment d-flex'>
          <form onSubmit={createdepartment}>
        <div className="div">
            <input type="text" className='form-control' placeholder='Enter Department' onChange={(e) => { setdepartment(e.target.value) }} value={department} pattern="^[A-Za-zÀ-ÿ ,.'-]+$" required />
            <button  className='btn btn-primary bgcolor form-control'>Create Department</button>
          </div>

          </form>
        

         
        </div>

      </div>
      <div className="sidebtns   ">
            <i data-tip='Add Employee' className="fa-solid fa-user-plus  btndesign " onClick={() => { history('/AddEmployee') }}></i> <br />
            <i data-tip='Add Project' className="fa-solid fa-file-circle-plus btndesign " onClick={() => { history('/AddProjects') }}></i> <br />
            <i data-tip='Add Department' className="fa-solid fa-timeline btndesign" onClick={() => { history('/AddDepartment') }}></i>
          </div>
     
      <ToastContainer />
      <ReactTooltip effect="solid" place="left"/>
    </>
  )
}

export default AddDepartment