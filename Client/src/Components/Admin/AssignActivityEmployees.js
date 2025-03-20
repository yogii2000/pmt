import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from "react-tooltip"
import Home from './Home';
import ApproverSidebar from '../Approver/ApproverSidebar';

const AssignActivityEmployees = (props) => {

  // const [arrayofdetails, setarrayofdetails] = useState({})
  const history = useNavigate();
  const location = useLocation();
  // const project_name = location.state.ptname.pname
  const project_id = location.state.pid;
  const start_date = location.state.startdate;
  const end_date = location.state.enddate;
  const assigned = "true"
  
  const [employee, setemployee] = useState([])
  const [department, setdepartment] = useState([]);
  const [active, setactive] = useState("a")
  // console.log(project_id);
  const alldepartments = async () => {
    try {
      const response = await fetch(`/DepartmentList`)
      const data = await response.json();
      setdepartment(data);
    } catch (error) {
      console.log(error)
    }
  }

  const allemployees = async (e) => {
    try {
      //  e.preventDefault();
      const response = await fetch(`/Addprojects/Activity/AssignEmployees`)
      const data = await response.json();
      setemployee(data);
    } catch (error) {
      console.log(error)
    }

  }
  // const [createdby,setcreatedby]=useState()

  const buttonactive = async (dept, index) => {

    setactive(index)
    const response = await fetch(`/Addprojects/Activity/AssignEmployees/${dept}`)
    const data = await response.json();
    setemployee(data);
  }

  const assignemployee = async (id, empname, index) => {

    // setarrayofdetails(arr => ({ ...arr, [index]: !arr[index] }))
   const newtime = new Date()
    const response = await fetch('/Addprojects/Activity/AssignEmployees', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id, empname, project_id, start_date, end_date, assigned,newtime

      })
    })
    const resp = response;
    if (resp.status === 200) {
      // setemployee({})
      toast.success("Employee Assigned", {
        position: "top-center"
      });
    }
    else {
      toast.error("Employee already assigned", {
        position: "top-center"

      });
    }
  }

  useEffect(() => {
    allemployees();
    alldepartments();
  }, [])
  const sidebar = localStorage.getItem('role')
  return (
    <>
    {
      sidebar==='Admin' ? <Home/> : <ApproverSidebar/>
    }
      <div className='dashboard'>
        {/* path top bar  */}
        <div className="topper d-flex">
          <div className="path ">
            {props.name}
          </div>
          <div className="back" onClick={() => history(-1)}>
            <i  className="fa-solid fa-angle-left"></i>
          </div>
        </div>
        <div className="main">
          <div className="activity-assign d-flex ">
            <div className="assign-project-name d-flex ">
              <input type="text" className='form-control assignempact' placeholder='project name' value={location.state.ptname} />
              <div className="calender-icon">
                <i className="fa-solid fa-file mt-3 fa-lg project-icon-1"></i>
              </div>
            </div>

          </div>
          {/* <div className="searchbar d-flex">
                   <input type="search" className='form-control searchemp' placeholder='Search Employees' />
                   <button className='btn btn-primary bgcolor searchbtn'>Search</button>
             </div> */}
          <div className="department-list">
            <button value="" onClick={() => { buttonactive('', 'a') }} className={active === "a" ? 'btn btn-primary bgcolor ' : 'btn btn-primary empactivebtn '}>All employees</button>
            {
              department.map((cval, index) => {
                return <><button className={active === index ? 'btn btn-primary bgcolor' : 'btn btn-primary empactivebtn'} onClick={() => { buttonactive(cval.department, index) }} key={cval.id}>{cval.department}</button></>
              })
            }
          </div>
          <br />
          <div className="assignemptable d-flex">
            <div className="list ">
              <div className="assigntable">


                <div className=" sticky">
                  <table className="table table-striped ">
                    <thead>
                      <tr>
                        <th className='bgcolor border-line' scope="col">Employee ID</th>
                        <th className='bgcolor border-line' scope="col">Employee Name</th>
                        <th className='bgcolor border-line' scope="col">Email</th>
                        <th className='bgcolor'></th>
                      </tr>
                    </thead>
                    <tbody >
                      {employee.map((currele, index) => {
                        return <tr key={currele.id}>
                          <td className='border-line'>{currele.empid}</td>
                          <td className='border-line'>{currele.name}</td>
                          <td className='border-line'>{currele.email}</td>
                          <td>
                            {/* <div className="btns">
                              {arrayofdetails[index] ?
                                <button className='btn-primary btn bgcolor ' onClick={() => removeemp(currele.empid, index)}>Unassign</button> :
                                <button className='btn btn-primary bgcolor' onClick={() => assignemployee(currele.empid, currele.name, index)}>Assign</button>}
                            </div> */}
                             <div className="btns">
                              
                                
                                <button className='btn btn-primary bgcolor' onClick={() => assignemployee(currele.empid, currele.name, index)}>Assign</button>
                            </div>
                          </td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
                <br />
              </div>
              <div className="save-btn">
                <button className='btn btn-primary bgcolor' onClick={() => { history(-1) }}>Save</button>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {
      sidebar==='Admin' ? <div className=" buttons sidebtns ">
      <i data-tip='Add Employee' className="fa-solid fa-user-plus  btndesign " onClick={() => { history('/AddEmployee') }}></i> <br />
      <i data-tip='Add Project' className="fa-solid fa-file-circle-plus  btndesign " onClick={() => { history('/AddProjects') }}></i> <br />
      <i data-tip='Add Department' className="fa-solid fa-timeline  btndesign" onClick={() => { history('/AddDepartment') }}></i>
    </div> : ''
    }
      <ToastContainer />
      <ReactTooltip effect="solid" place="left"/>
    </>
  )
}

export default AssignActivityEmployees