import React, { useState } from 'react' //react hooks
import { useNavigate } from 'react-router-dom'; //for jumping on a page
import ReactDatePicker from 'react-datepicker'//for selecting a date
import 'react-datepicker/dist/react-datepicker.css';  //for adding css in datepicker
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import addDays from 'date-fns/addDays'
// import '../App.css'
import ReactTooltip from "react-tooltip"
import Home from './Home';
// const ptname = createContext();
// const pid = createContext;
const AddProjects = () => {
  const history = useNavigate();
  const [getdate1, setdate1] = useState(0) //for start date
  const [getdate2, setdate2] = useState(0) //for end date
  const [getdate3, setdate3] = useState(0) //for commencement date
  const [getdate4, setdate4] = useState(0) //for delivery date
  const [pname, setpname] = useState("")   //for project name
  // const [id, setid] = useState("")   //for project id
  const [budget, setbudget] = useState("")  //for budget


  const startdate = moment(getdate1).format("yyyy-MM-DD")
  const enddate = moment(getdate2).format("yyyy-MM-DD")
  const commencementdate = moment(getdate3).format("yyyy-MM-DD")
  const deliverydate = moment(getdate4).format("yyyy-MM-DD")

  console.log(startdate) //for current time
  //  submit button function 
  const senddata = async (e) => {
    e.preventDefault();
    const date = new Date()
    //  to fetch the data from add project page 
    const res = await fetch('/AddProjects', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          startdate, enddate, commencementdate, deliverydate, pname, budget,date
        }
      )
    })
 
    const resp = res;
    if (resp.status === 200) {
      toast.success("Project Created Successfully", {
        position: "top-center"
      });
      setpname("")
      setdate1("")
      setdate2("")
      setdate3("")
      setdate4("")
      setbudget("")
    }
    else if(resp.status===422) {
      toast.error("Enter all details", {
        position: "top-center"
      });
    }
    else{
      toast.error("Project already exist!", {
        position: "top-center"
      });
    }
  }


  return (
    <>
    <Home/>
      <div className="dashboard ">

        {/* path top bar  */}
        <div className="topper d-flex">
          <div className="path ">
            <span>Projects</span>
          </div>
          <div className="back" onClick={() => history('/AdminDashboard')}>
            <i  className="fa-solid fa-angle-left"></i>
          </div>
        </div>
        <div className="maindiv d-flex">
          <div className="container ">
          <div className="add-project">
            <form onSubmit={senddata}>
              <div className="row mb-3">
              <div className="col-lg-12 d-flex">
              <input autoComplete='off' name="pname" type="text" placeholder="Project Name " className='form-control ' onChange={(e) => { setpname(e.target.value) }} value={pname} pattern="^[A-Za-zÀ-ÿ ,.'-]+$" required/>
              <div className="calender-icon">
                <i className="fa-solid fa-file mt-3 fa-lg project-icon-1"></i>
              </div>
            </div>
              </div>
            
            <div className="row mb-3">
                 <div className=" col-lg-6 ">
              <div className="d-flex">
                <ReactDatePicker autoComplete='off' className=' form-control' name='getdate1' placeholderText='Start Date' selected={getdate1} onChange={date => setdate1(date)} minDate={new Date()}/>
                <div className="calender-icon">
                  <i className="fa-solid fa-calendar fa-lg mt-3 project-icon-2 "></i>
                </div>
              </div>
              </div>
              <div className="col-lg-6">
                    <div className="d-flex">
                <ReactDatePicker autoComplete='off' className=' form-control' name='enddate' placeholderText='End Date' selected={getdate2} onChange={date => setdate2(date)} minDate={addDays(getdate1,2)}/>
                <div className="calender-icon">
                  <i className="fa-solid fa-calendar fa-lg mt-3 project-icon "></i>
                </div>
              </div>
              </div>
            </div>
            <div className="row mb-3">
                         <div className="col-lg-6">
              <div className="d-flex">
                <ReactDatePicker autoComplete='off' className=' form-control' name='commencementdate' placeholderText='Commencement Date' selected={getdate3} onChange={date => setdate3(date)} minDate={addDays(getdate1,1)} required/>
                <div className="calender-icon">
                  <i className="fa-solid fa-calendar fa-lg mt-3 project-icon-2 "></i>
                </div>
              </div>
              </div>
              <div className="col-lg-6">
                   <div className="d-flex">
                <ReactDatePicker autoComplete='off' className=' form-control ' name='deliverydate' placeholderText='Delivery Date' selected={getdate4} onChange={date => setdate4(date)} minDate={addDays(getdate2,1)} required/>
                <div className="calender-icon">
                  <i className="fa-solid fa-calendar fa-lg mt-3 project-icon "></i>
                </div>
              </div>
              </div>            
            </div>
         <div className="row mb-3">
                <div className="col-lg-12 d-flex">
              <input autoComplete='off' name="budget" type="text" className='form-control' placeholder='Enter Budget' onChange={(e) => { setbudget(e.target.value) }} value={budget} pattern = "\d{1,10}" required />
              <div className="calender-icon">
                <i className="fa-solid fa-indian-rupee-sign  fa-lg mt-3 project-icon-1" />
              </div>
            </div>
         </div>
      
            <div className="row p-3">
              <button className='btn btn-primary bgcolor col-lg-12' >Create Project</button>
            </div>
            </form>
           
          </div>
            
          </div>
          
        </div>
      </div>
      <div className=" sidebtns  ">
            <i data-tip='Add Employee' className="fa-solid fa-user-plus fa-1x btndesign " onClick={() => { history('/AddEmployee') }}></i> <br />
            <i data-tip='Add Project' className="fa-solid fa-file-circle-plus fa-1x btndesign " onClick={() => { history('/AddProjects') }}></i> <br />
            <i data-tip='Add Employee' className="fa-solid fa-timeline fa-1x btndesign" onClick={() => { history('/AddDepartment') }}></i>
          </div>
      <ToastContainer />
      <ReactTooltip effect="solid" place="left"/> 
    </>
  )
}

export default AddProjects;