import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'//for selecting a date
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import ReactTooltip from "react-tooltip"
import Home from './Home';
import { useLocation } from 'react-router-dom';
import ApproverSidebar from '../Approver/ApproverSidebar';
import EmployeeSidebar from '../Employee/EmployeeSidebar';

const BookTime = () => {
  const history = useNavigate();
  const location = useLocation();
  const [project, setproject] = useState(location?.state?.projectname? location.state.projectname  : '');
  const [activity, setactivity] = useState(location?.state?.activityname? location.state.activityname  : '');
  const [getdate1, setdate1] = useState(0) //for start date
  // const [getdate2, setdate2] = useState(0) //for end date
  // const [getdate3, setdate3] = useState(0) //for commencement date
  // const [getdate4, setdate4] = useState(0) //for delivery date
  // const [isapproved, setisapproved] = useState("Not approved")
  const [appbtn, setappbtn] = useState('a')
  // const  project_name = location.state.projectname
  // const activity_name = location.state.activityname
  
  const id = localStorage.getItem('id')
  const role = localStorage.getItem('role')
  // const [active,setactive] = useState("")
  const [hours, sethours] = useState()
  const [allprojects, setallprojects] = useState([])
  const [allempprojects, setallempprojects] = useState([])
  const [allactivity, setallactivities] = useState([])
  const [approvelist, setapprovedlist] = useState([])
  const startdate = moment(getdate1).format("yyyy-MM-DD")



  useEffect(() => {
    const allproject = async () => {
      try {
        const response = await fetch("/Projects")
        const data = await response.json();
        setallprojects(data);
      } catch (error) {
        console.log(error)
      }
    }
    const allEmpproject = async () => {
      try {
        const response = await fetch(`/Employeeprojectlist/${id}`)
        const data = await response.json();
        setallempprojects(data);
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
    
    allproject();
    allactivities();
    approvedlist();
    allEmpproject();
  }, [project])
  
  const askapproval = async (e) => {
    try {
      e.preventDefault();
      const date = new Date()
       //  to fetch the data from add project page 
      const response = await fetch('/Askapproval', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
        {
          startdate, hours, project, activity,sidebar,id,date
        }
        )
      })
      // console.log(response)
      if (response.status === 200) {
        toast.success("Request sent successfully", {
          position: "top-center"
        });
        setproject(location.state.projectname='')
        setactivity(location.state.activityname='')
        setdate1("")
        // setdate2("")
        // setdate3("")
        // setdate4("")
        sethours("")
      }
      else if (response.status === 402) {
        toast.error("Please fill all details", {
          position: "top-center"
        });
      }
      else {
        toast.error("Already Requested!", {
          position: "top-center"
        });
      }
    } catch (error) {
      console.log(error)
    }
    // e.preventDefault();
  
  }
  const disapprovedlist = async () => {
    try {
      setappbtn('b')
      const data = await fetch(`/disapproverlist/${id}`)
      const response = await data.json();
      setapprovedlist(response)
    } catch (error) {
      console.log(error)
    }
  }
  const approvedlist = async () => {
    try {
      setappbtn('a')
      const data = await fetch(`/approvedlist/${id}`)
      const response = await data.json();
      setapprovedlist(response)
    } catch (error) {
      console.log(error)
    }
  }
  const pending = async ()=>{
    try {
      setappbtn('c')
      const data = await fetch(`/pending/${id}`)
      const response = await data.json();
      setapprovedlist(response)
    } catch (error) {
      
    }
  }
  // console.log(approvelist)

  const sidebar = localStorage.getItem('role')
  return (
    <>
       {
      sidebar==='Admin' ? <Home/> : sidebar==='Approver'? <ApproverSidebar/> : <EmployeeSidebar/>
    }
      <div className='dashboard'>
        <div className="topper d-flex">
          <div className="path ">
            <span>Book Time</span>
          </div>
          <div className="back" onClick={() => history('/AdminDashboard')}>
            <i  className="fa-solid fa-angle-left"></i>
          </div>
        </div>

        <div className="booktimediv">
          <form onSubmit={askapproval}>

          <div className="dropdown-2  fas-arrow-down d-flex ">
            <div className="drop1">
              <select name='department' onChange={(e) => { setproject(e.target.value) }} value={location?.state?.projectname ?location.state.projectname :project } className='booktimefield' required >
                <option value="" disabled hidden selected>Enter project</option>
                {
                  role==='Admin' || role==='Approver' ? 
                  allprojects.map((cval) => {
                    return <><option key={cval.id} value={cval.project_name}>{cval.project_name}</option></>

                  }) :
                  allempprojects.map((cval)=>{
                    return <><option key={cval.id} value={cval.project_name}>{cval.project_name}</option></>
                  })
                }
              </select>
              <select name='department' onChange={(e) => { setactivity(e.target.value) }} value={location?.state?.activityname ? location.state.activityname :activity} className='booktimefield bookact' required >
                <option value="" disabled hidden selected>Enter Activity</option>
                {
                  allactivity.map((cval) => {
                    return <><option key={cval.id} value={cval.activity_name}>{cval.activity_name}</option></>

                  })
                }
              </select>
            </div>
          </div>
          <div className="booktimehours">
            <input type="text" placeholder='Enter No. of hours' className='form-control hours' value={hours} onChange={(e) => { sethours(e.target.value) }} pattern="^\d+$" required/>
          </div>
            <div className="button-1 d-flex">
              <ReactDatePicker autoComplete='off' className=' form-control' name='getdate1' placeholderText='Date' selected={getdate1} onChange={date => setdate1(date)} />
              <div className="calender-icon">
                <i className="fa-solid fa-calendar fa-lg mt-3 project-icon-2 "></i>
              </div>
          </div>
          <div className="approval-btn">
            <button className='btn btn-primary bgcolor approvalbtn'>Save</button>
          </div> 
          </form>
          <br />
          <div className="booktimebuttons">
            <button className={appbtn==='a' ? "btn btn-primary bgcolor" : "btn empactivebtn"} onClick={approvedlist}>Approved</button>
            <button className={appbtn==='b' ? "btn bgcolor btn-primary " : "btn empactivebtn"} onClick={disapprovedlist}>Not approved</button>
            <button className={appbtn==='c' ? "btn bgcolor btn-primary" : "btn empactivebtn"} onClick={pending}>pending</button>
          </div>
          <div className="booksheettable d-flex">
              <div className="sticky">
            <div className="approve-list ">
                <table className="table table-striped ">
                  <thead>
                    <tr>
                      <th className='bgcolor border-line' scope="col">Project name</th>
                      <th className='bgcolor border-line' scope="col">Activity name</th>
                      <th className='bgcolor border-line' scope="col">hours</th>
                      <th className='bgcolor border-line' scope="col">Created On</th>
                      {/* <th className='bgcolor border-line' scope="col">End date</th>
                      <th className='bgcolor border-line' scope="col">Commencement date</th>
                      <th className='bgcolor border-line' scope="col">Delivery date</th> */}
                      {
                        appbtn==='b' ? <th className='bgcolor border-line' scope="col">Comment</th> : ''
                      }
                    </tr>
                  </thead>
                  <tbody >
                    {
                        approvelist.map((currele) => {
                          return <tr key={currele.id}>
                            <td className='border-line'>{currele.project_name}</td>
                            <td className='border-line'>{currele.activity_name}</td>
                            <td className='border-line'>{currele.no_of_hours}</td>
                            <td className='border-line'>{moment(currele.added_on).format("yyyy-MM-DD")}</td>
                            {/* <td className='border-line'>{currele.end_date}</td>
                            <td className='border-line'>{currele.commencement_date}</td>
                            <td className='border-line'>{currele.delivery_date}</td> */}
                            {
                              appbtn==='b' ? <td className='border-line'>{currele.comment}</td> : ''
                            }
                          </tr>
                        })
                    }

                  </tbody>
                </table>
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

export default BookTime