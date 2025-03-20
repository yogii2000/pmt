import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from "react-tooltip"
import EmployeeSidebar from '../Employee/EmployeeSidebar';
import moment from 'moment/moment';

const EmployeeTimeSheet = () => {
  const id = localStorage.getItem('id')
    const history = useNavigate();
    const [project, setproject] = useState("");
    const [activity, setactivity] = useState("");
    const [fromdate, setfromdate] = useState("");
    const [todate, settodate] = useState("");
    const [allprojects, setallprojects] = useState([])
    const [allactivity, setallactivities] = useState([])
    const [timesheetdata, settimesheetdata] = useState([])

    useEffect(() => {
        const allproject = async () => {
          try {
            const response = await fetch(`/Employeeprojectlist/${id}`)
            const data = await response.json();
            setallprojects(data);
          } catch (error) {
            console.log(error)
          }
        }
        const allactivities = async () => {
          try {
            const response = await fetch(`/Activities/${project}`)
            const data = await response.json();
            setallactivities(data);
          } catch (error) {
            console.log(error)
          }
        }
        const timesheetdata = async () => {
            try {
              const response = await fetch(`/filterEmployeeTimeSheetdata/${id}`)
              const data = await response.json();
              settimesheetdata(data)
            } catch (error) {
              console.log(error)
            }
          }
      
          allproject();
          allactivities();
          timesheetdata()
        }, [project])

        const filtertimesheetdata = async () => {
            try {
                
              const from = moment(fromdate).isValid() ? moment(fromdate).format('yyyy-MM-DD') : ''
              const to = moment(todate).isValid() ? moment(todate).format('yyyy-MM-DD') : ''
              
              const response = await fetch(`/filterEmployeeTimeSheetdata/${id}/${project}/${activity}/${from}/${to}`)
              const res = response;
              // console.log(from)
              console.log(response)
              if (res.status === 422) {
                toast.error("Please fill the mandatory details!", {
                  position: "top-center"
        
                });
              }
              else {
                const data = await response.json();
                settimesheetdata(data)
              }
        
            } catch (error) {
              console.log(error)
            }
          }
  return (
    <>
    <EmployeeSidebar/>
    <div className='dashboard'>
        <div className="topper d-flex">
          <div className="path ">
            <span>Time Sheet</span>
          </div>
          <div className="back">
            <i onClick={() => history('/Dashboard')} className="fa-solid fa-angle-left fs-lg"></i>
          </div>
        </div>

        <div className="timesheetformat">
          <div className="dropdown-2  fas-arrow-down d-flex">
            <select name='department' onChange={(e) => { setproject(e.target.value) }} value={project} className='timesheetfields' required >
              <option value="" selected>All Projects</option>
              {
                allprojects.map((cval) => {
                  return <><option key={cval.id} value={cval.project_name}>{cval.project_name}</option></>

                })
              }
            </select>
            <select name='department' onChange={(e) => { setactivity(e.target.value) }} value={activity} className='timesheetfields' required >
              <option value="" selected>All Activities</option>
              {
                allactivity.map((cval) => {
                  return <><option key={cval.id} value={cval.activity_name}>{cval.activity_name}</option></>

                })
              }
            </select>
          </div>
          <div className="secfield d-flex timesheet-date">
            <div className="button-1 d-flex">
              <ReactDatePicker autoComplete='off' className=' form-control' name='getdate1' placeholderText='Date' selected={fromdate} onChange={date => setfromdate(date)} />
              <div className="calender-icon">
                <i className="fa-solid fa-calendar fa-lg mt-3 project-icon-2 "></i>
              </div>
            </div>
            <div className="button-1 d-flex">
              <ReactDatePicker autoComplete='off' className=' form-control' name='enddate' placeholderText='Date' selected={todate} onChange={date => settodate(date)} />
              <div className="calender-icon">
                <i className="fa-solid fa-calendar fa-lg mt-3 project-icon "></i>
              </div>
            </div>
          </div>

        </div>

        <div className="viewresultbtn">
          <button onClick={filtertimesheetdata} className='btn btn-primary bgcolor see-results'>See Results</button>
        </div>

        <div className="timesheet-bottom d-flex">
          <div className="timesheet ">
            <div className="sticky">
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th className='bgcolor border-line' scope="col">Project Name</th>
                    <th className='bgcolor border-line' scope="col">Activity Name</th>
                    <th className='bgcolor border-line' scope="col">Created On</th>
                    {/* <th className='bgcolor border-line' scope="col">Created By</th> */}
                    <th className='bgcolor border-line' scope="col">Approval Status</th>
                    <th className='bgcolor border-line' scope="col">Approved On</th>
                    <th className='bgcolor border-line' scope="col">Approved By</th>
                    <th className='bgcolor border-line' scope="col">Employee Name</th>
                    <th className='bgcolor border-line' scope="col">Total No. of Hours</th>
                    <th className='bgcolor border-line' scope="col">Start date</th>
                    <th className='bgcolor border-line' scope="col">End date</th>
                    <th className='bgcolor border-line' scope="col">Commencement date</th>
                    <th className='bgcolor border-line' scope="col">Delivery date</th>

                    {/* <th className='bgcolor border-line' scope="col">Created by</th> */}
                    {/* <th className='bgcolor'></th> */}
                  </tr>
                </thead>
                <tbody >
                  {timesheetdata.length===0 ? (
                     <tr key="data-empty" className='no-data'>
                     <td colspan="14">Sorry! No Result Found.</td>
                   </tr>
                  )
                 : timesheetdata.map((currele) => {
                    return <tr key={currele.id}>
                      <td className='border-line'>{currele.project_name}</td>
                      <td className='border-line'>{currele.activity_name}</td>
                      <td className='border-line'>{moment(currele.added_on).format("yyyy-MM-DD")}</td>
                      {/* <td className='border-line'>{currele.added_by}</td> */}
                      <td className='border-line'>{currele.isapproved}</td>
                      <td className='border-line'>{moment(currele.approved_on).format("yyyy-MM-DD")}</td>
                      <td className='border-line'>{currele.approved_by}</td>
                      <td className='border-line'>{currele.name}</td>
                      <td className='border-line'>{currele.no_of_hours}</td>
                      <td className='border-line'>{moment(currele.start_date).format("yyyy-MM-DD")}</td>
                      <td className='border-line'>{moment(currele.end_date).format("yyyy-MM-DD")}</td>
                      <td className='border-line'>{moment(currele.commencement_date).format("yyyy-MM-DD")}</td>
                      <td className='border-line'>{moment(currele.delivery_date).format("yyyy-MM-DD")}</td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
      <ToastContainer />
      <ReactTooltip effect="solid" place="left"/>
    </>
  )
}

export default EmployeeTimeSheet