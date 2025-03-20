import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip"
import ApproverSidebar from '../Approver/ApproverSidebar';
import Home from './Home';
import moment from "moment";

const ProjectDetails = () => {
  const history = useNavigate();
  const location = useLocation();
  const unassigned = "false"
  const [projectData, setprojectdata] = useState([])
  const [assignedemp, setassignedemp] = useState([]);
  const [createdlist, setcreatedlist] = useState([]);
  const [actcount, setactcount] = useState([])
  const [assigncount, setassigncount] = useState([])
  const pname = location.state.pjtname
  const id = location.state.pjtid;
  const startdate = location.state.startdate;
  const enddate = location.state.enddate;
  const projectDetails = async () => {
    try {
      const resp = await fetch(`/ProjectDetails/${pname}`)
      const data = await resp.json();
      setprojectdata(data);
    } catch (error) {

    }
  }
  const allassignemployees = async (e) => {
    try {
      // e.preventDefault();
      const response = await fetch(`/Addprojects/Activity/${id}`)
      const data = await response.json();
      setassignedemp(data);
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
  const createdactivitylist = async (e) => {
    try {
      const response = await fetch(`/createdActivitylist/${id}`)
      const data = await response.json();
      setcreatedlist(data)
    } catch (error) {
      console.log(error)
    }
  }
  const activitycount = async () => {
    try {
      const response = await fetch(`/activitiescount/${id}`)
      const data = await response.json();
      setactcount(data)
    } catch (error) {
      console.log(error)
    }
  }
  const assignedcount = async () => {
    try {
      const response = await fetch(`/assignedcount/${id}`)
      const data = await response.json();
      setassigncount(data)
    } catch (error) {
      console.log(error)
    }
  }
  const removeemp = async (pid, index) => {
    try {
      // id.preventDefault();
      // setarrayofdetails(arr => ({ ...arr, [index]: !arr[index] }))
      const result = window.confirm("Do you want to unassign?")
      if (result) {
        const newtime = new Date();
        await fetch(`/Addprojects/Activity/remove/${pid}/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
           pid, id, unassigned,newtime

          })
        })
      }
    }
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    activitycount();
    assignedcount();
    projectDetails();
    allassignemployees();
    createdactivitylist();
  }, [assignedemp])
  
  const sidebar = localStorage.getItem('role');

  return (
    <>
      {
        sidebar === 'Admin' ? <Home /> : <ApproverSidebar />
      }
      <div className='dashboard'>
        <div className="topper d-flex">
          <div className="path ">
            <span>Project</span>
          </div>
          <div className="back" onClick={() => history('/AdminDashboard')}>
            <i className="fa-solid fa-angle-left fs-lg"></i>
          </div>
        </div>
        <div className="details ">
          <div className="data d-flex">
            {
              projectData.map((curvle) => {
                return (
                  <>
                    <div className="left">
                      <div className="first d-flex">
                        <i className='fa-solid fa-file graycolor'></i>
                        <p>{curvle.project_name}</p>
                      </div>
                      <div className="first d-flex">
                        <i className='fa-solid fa-calendar graycolor'></i>
                        <p>Start date: {moment(curvle.start_date).format("yyyy-MM-DD")}</p>
                      </div>
                      <div className="first d-flex">
                        <i className='fa-solid fa-calendar graycolor'></i>
                        <p>Commencement Date: {moment(curvle.commencement_date).format("yyyy-MM-DD")}</p>
                      </div>
                      <div className="first d-flex">
                        <i className="fa-solid fa-indian-rupee-sign graycolor"></i>
                        <p>Budget: {moment(curvle.budget).format("yyyy-MM-DD")}</p>
                      </div>
                    </div>
                    <div className="second ">
                      <div className="first d-flex">
                        <i className='fa-solid fa-file graycolor'></i>
                        <p>{curvle.project_id}</p>
                      </div>
                      <div className="first d-flex">
                        <i className='fa-solid fa-calendar graycolor'></i>
                        <p>End Date: {moment(curvle.end_date).format("yyyy-MM-DD")}</p>
                      </div>
                      <div className="first d-flex">
                        <i className='fa-solid fa-calendar graycolor'></i>
                        <p>Delivery Date: {moment(curvle.delivery_date).format("yyyy-MM-DD")}</p>
                      </div>

                    </div>

                  </>

                )
              })
            }

          </div>
          <div className="activity-btn d-flex">

            <div className="crtactivity d-flex ">
              {
                actcount.map((cval) => {
                  return (<input type="text" placeholder={cval.count + "  Activities"} className='form-control inputfields' />
                  )
                })
              }

              <button className='btn btn-primary  btn-size' onClick={() => {
                history("/Addprojects/Activity", {
                  state: {
                    ptname: pname,
                    pid: id,
                    startdate: startdate,
                    enddate: enddate
                  }
                })
              }} >Create Activities</button> <br />
            </div>
            <div className="assignemp d-flex ">
              {
                assigncount.map((cval) => {
                  return (
                    <input type="text" placeholder={cval.count + "  Assigned"} className='form-control inputfields assign' />
                  )
                })
              }

              <button className='btn btn-primary btn-size' onClick={() => {
                history("/Addprojects/Activity/AssignEmployees", {
                  state: {
                    ptname: pname,
                    pid: id,
                    startdate: startdate,
                    enddate: enddate
                  }
                })
              }}>Assign Employee</button> <br />
            </div>
          </div>
        </div>
        <div className="tablenames d-flex">


        </div>

        <div className="asignedlist d-flex">
          <div className=" sticky">
            <p className='activitytag tags gcolor'>Activities</p>
            <div className="activitytable">
              <table className=" table-striped table">
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
                  {createdlist.map((currele) => {
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

          <div className="sticky">
            <p className='assignedtag tags gcolor'>Assigned</p>
            <div className="assignedtable">
              <table className=" table-striped table">
                <thead>
                  <tr>
                    <th className='bgcolor border-line' scope="col"> ID</th>
                    <th className='bgcolor border-line' scope="col">Employee Name</th>
                    <th className='bgcolor border-line' scope="col">project ID</th>
                    <th className='bgcolor border-line' scope="col">Start Date</th>
                    <th className='bgcolor border-line' scope="col">End Date</th>
                    <th className='bgcolor'></th>
                    {/* <th className='bgcolor border-line'></th> */}
                  </tr>
                </thead>
                <tbody >
                  {assignedemp.map((currele) => {
                    return <tr key={currele.id}>
                      <td className='border-line'><p>{currele.empid}</p></td>
                      <td className='border-line'><p>{currele.employee_name}</p></td>
                      <td className='border-line'><p>{currele.project_id}</p></td>
                      <td className='border-line'><p>{moment(currele.start_date).format("yyyy-MM-DD")}</p></td>
                      <td className='border-line'><p>{moment(currele.end_date).format("yyyy-MM-DD")}</p></td>
                      <td className='border-line'>
                        <div className="btns">
                          <button className='btn-primary btn bgcolor ' onClick={() => removeemp(currele.empid)}>Unassign</button>
                        </div>
                      </td>

                    </tr>

                  })}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </div>
      {
        sidebar === 'Admin' ? <div className=" buttons sidebtns ">
          <i data-tip='Add Employee' className="fa-solid fa-user-plus  btndesign " onClick={() => { history('/AddEmployee') }}></i> <br />
          <i data-tip='Add Project' className="fa-solid fa-file-circle-plus  btndesign " onClick={() => { history('/AddProjects') }}></i> <br />
          <i data-tip='Add Department' className="fa-solid fa-timeline  btndesign" onClick={() => { history('/AddDepartment') }}></i>
        </div> : ''
      }
      <ReactTooltip effect="solid" place="left" />
    </>
  )
}

export default ProjectDetails