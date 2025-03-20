import React from 'react'
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip"
import Home from './Home';
import moment from 'moment';
import ApproverSidebar from '../Approver/ApproverSidebar';
import EmployeeSidebar from '../Employee/EmployeeSidebar';

const CreateActivity = (props) => {
  const history = useNavigate();
  const location = useLocation();
  const [createdactivity, setactivity] = useState([]);
  const [activityname, setactivityname] = useState("");
  // const [activityid, setactivityid] = useState("");
  const id = localStorage.getItem('role')
  const pjtid = location.state.pid
  const project_name = location.state.ptname
  const allcreatedactivity = async (e) => {
    e.preventDefault();
    const date = new Date()
    //  to fetch the data from add project page 
    const res = await fetch('/createactivity', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          activityname, pjtid ,id,project_name,date
        }
      )
    })


    const resp = res;
    if (resp.status === 200) {
      // setemployee({})
      toast.success("Activity Created", {
        position: "top-center"
      });
      setactivityname("")
    }
    else if (resp.status === 400) {
      toast.error("Already Created", {
        position: "top-center"

      });
    }
    else if (resp.status === 402) {
      toast.error("Please enter all details", {
        position: "top-center"

      });
    }
    else {
      toast.error("Something went wrong", {
        position: "top-center"

      });
    }
  }

  const createdactivitylist = async (e) => {
    try {
      const response = await fetch(`/createdActivitylist/${pjtid}`)
      const data = await response.json();
      setactivity(data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    createdactivitylist();
  },[allcreatedactivity])

  const sidebar = localStorage.getItem('role')
  return (
    <>
    {
      sidebar==='Admin' ? <Home/> : sidebar==='Approver'?  <ApproverSidebar/> : <EmployeeSidebar/>
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

        <div className="main ">
              <form onSubmit={allcreatedactivity}>
          <div className="activity-name ">
            <div className="actityname d-flex">
              <input onChange={(e) => { setactivityname(e.target.value) }} value={activityname} name='ptname' type="text" className='form-control ' placeholder='Enter Activity Name' autoComplete='off' pattern="^[A-Za-zÀ-ÿ ,.'-]+$" required/>
              <div className="calender-icon">
                <i className="fa-solid fa-clipboard mt-3 fa-lg project-icon-1"></i>
              </div>
            </div>
          </div>
          <div className="createactivity">
            <button className='btn btn-primary  bgcolor createactivitybtn'>Create Activity</button> <br />
          </div>
          </form>
          <div className="createactivitytable d-flex">
            <div className="activity-record">
              <div className="sticky">
                <table className="table table-striped ">
                  <thead>
                    <tr>
                      <th className='bgcolor border-line' scope="col">ID</th>
                      <th className='bgcolor border-line' scope="col">Activity name</th>
                      <th className='bgcolor border-line' scope="col">Project ID</th>
                      <th className='bgcolor border-line' scope="col">Created on</th>
                      {/* <th className='bgcolor border-line'></th> */}
                    </tr>
                  </thead>
                  <tbody >
                    {createdactivity.map((currele) => {
                      return <tr key={currele.id}>
                        <td className='border-line'><p>{currele.id}</p></td>
                        <td className='border-line'><p>{currele.activity_name}</p></td>
                        <td className='border-line'><p>{currele.project_id}</p></td>
                        <td className='border-line'><p>{moment(currele.added_on).format("yyyy-MM-DD")}</p></td>

                      </tr>

                    })}
                  </tbody>
                </table>
              </div>

            </div>
    
          </div>
          <div className="savebutton">
            <button className='btn btn-primary bgcolor activitysavebtn' onClick={() => { history(-1) }}>Save</button>
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

export default CreateActivity