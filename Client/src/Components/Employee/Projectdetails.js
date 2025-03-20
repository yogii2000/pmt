import moment from 'moment';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";
import ReactTooltip from "react-tooltip"
import EmployeeSidebar from './EmployeeSidebar'

const Projectdetails = () => {
    const history = useNavigate();
    const location = useLocation();
    const [projectData, setprojectdata] = useState([])
    const [activitycreated,setactvitycreatedlist] = useState([])
    // const [actcount, setactcount] = useState([])
    const pname = location.state.pjtname
    const id = location.state.pjtid;
    // const startdate = location.state.startdate;
    // const enddate = location.state.enddate;
    const projectDetails = async () => {
      try {
        const resp = await fetch(`/ProjectDetails/${pname}`)
        const data = await resp.json();
        setprojectdata(data);
      } catch (error) {
  
      }
    }
    const createdactivitylist = async (e) => {
        try {
          const response = await fetch(`/createdActivitylist/${id}`)
          const data = await response.json();
          setactvitycreatedlist(data)
        } catch (error) {
          console.log(error)
        }
      }

    // const activitycount = async () => {
    //   try {
    //     const response = await fetch(`/activitiescount/${id}`)
    //     const data = await response.json();
    //     setactcount(data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    useEffect(() => {
      // activitycount();
      projectDetails();
      createdactivitylist();
    }, [])
  return (
    <>
    <EmployeeSidebar/>
    <div className='dashboard'>
    <div className="topper d-flex">
          <div className="path ">
            <span>Project</span>
          </div>
          <div className="back">
            <i onClick={() => history('/Dashboard')} className="fa-solid fa-angle-left fs-lg"></i>
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
                        <p>Start date: {moment(curvle.start_date).format("yyyy-MM-DD") }</p>
                      </div>
                      <div className="first d-flex">
                        <i className='fa-solid fa-calendar graycolor'></i>
                        <p>Commencement Date: {moment(curvle.commencement_date).format("yyyy-MM-DD")}</p>
                      </div>
                      <div className="first d-flex">
                        <i className="fa-solid fa-indian-rupee-sign graycolor"></i>
                        <p>Budget: {curvle.budget}</p>
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
          {/* <div className="activity-btn d-flex">
            <div className="crtactivity d-flex ">
              {
                actcount.map((cval) => {
                  return (<input type="text" placeholder={cval.count + "  Activities"} className='form-control bottombtn' />
                  )
                })
              }

              <button className='btn btn-primary create activity-buttons' onClick={() => {
                history("/Addprojects/Activity",{
                  state: {
                    ptname: pname ,
                    pid:  id ,
                    startdate:startdate,
                    enddate:  enddate 
                  }
                })
              }} >Create Activities</button> <br />
            </div>
          </div> */}
        </div>
        <div className="tagname">
            <h5 className='gcolor'>Activity</h5>
        </div>
        <div className="employeeactivity">
        <div className="employeeactivitytable">
              <table className=" table-striped table">
                <thead>
                  <tr>
                    <th className='bgcolor border-line' scope="col">Activity</th>
                    <th className='bgcolor border-line' scope="col">Created On</th>
                    <th className='bgcolor border-line' scope="col">Created By</th>
                    <th className='bgcolor border-line' scope="col">Action</th>
                    {/* <th className='bgcolor border-line'></th> */}
                  </tr>
                </thead>
                <tbody>
                  {activitycreated.map((currele) => {
                    return <tr key={currele.id}>
                      <td className='border-line'><p>{currele.activity_name}</p></td>
                      <td className='border-line'><p>{moment(currele.added_on).format("yyyy-MM-DD")}</p></td>
                      <td className='border-line'><p>{currele.added_by}</p></td>
                      <td className='border-line'>
                        <button className='btn btn-primary bgcolor booktimebtn' onClick={()=>{
                          history('/BookTime',{
                            state :{
                              projectname : pname,
                              activityname : currele.activity_name
                            }
                          })
                        }}>Book Time</button>
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
        </div>

    </div>
    <ReactTooltip effect="solid" place="left"/>
    </>
  )
}

export default Projectdetails