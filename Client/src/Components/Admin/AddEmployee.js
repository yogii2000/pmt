import { React, useState } from 'react' //react and react hooks
import { useNavigate } from 'react-router-dom'  //for jumping on a page 
import ReactDatePicker from 'react-datepicker' //react datepicker
import 'react-datepicker/dist/react-datepicker.css'; //datepicker css
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useFormInputValidation } from "react-form-input-validation";
// import '../App.css'  //importing css
import { useEffect } from 'react';
import moment from 'moment';
import ReactTooltip from "react-tooltip"
import Home from './Home';

const AddEmployee = () => {
  const history = useNavigate();
  const [getdate1, setdate1] = useState(0) //date of joining
  const [department, setdepartment] = useState([]);
  // const [formerr,setformerr] = useState({})
  // const [issubmit,setissubmit] = useState(false)
  //for employee information
  const [employee, setemployee] = useState({
    firstname: "", email: "", mobile: "", department: "", gender: "",role_id:""
  })
  const alldepartments = async () => {
    try {
      const response = await fetch(`/DepartmentList`)
      const data = await response.json();
      setdepartment(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleinputs = (e) => {
    const newdata = { ...employee }
    newdata[e.target.name] = e.target.value;
    setemployee(newdata)
    // setformerr(validate(employee))
  }

  //  event handling on button  autoComplete='off'


  const senddata = async (e) => {
       e.preventDefault();
       const date = new Date()
    const doj = moment(getdate1).format("DD-MM-yyyy")
    // console.log("button clicked")
    const { firstname, gender, email, mobile, department,role_id } = employee;
    // for fetch the data from add employee data 
    const res = await fetch('/AddEmployee', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstname, email, mobile, department, gender, doj,role_id,date
      })
    })
    const resp = res;
    if (resp.status === 200) {
      // setemployee({})
      toast.success("Employee Added Successfully", {
        position: "top-center"
      });
      setemployee({
        firstname: "", email: "", mobile: "", department: "", gender: "",role_id:""
      })
      setdate1("")
    }
    else if (resp.status === 400) {
      toast.error("Something Went Wrong!", {
        position: "top-center"

      });
    }
    else if (resp.status === 500) {
      toast.error("Email already exists!", {
        position: "top-center"

      });
    }
    else {
      toast.error("Please fill all the details!", {
        position: "top-center"
      });
    }
  //  setissubmit(true)
  }
  useEffect(() => {

    alldepartments();
  }, [])
  return (
    <>
    <Home/>
      <div className="dashboard">
        <div className="topper d-flex">
          <div className="path ">
            <span>Add Employee</span>
          </div>
          <div className="back" onClick={() => history('/AdminDashboard')}>
            <i  className="fa-solid fa-angle-left fs-lg"></i>
          </div>
        </div>
          <div className="container">
          <div className="add-employee">
            <form onSubmit={senddata}>
            <div className="row mb-3">
            <div className="col-lg-12 d-flex">
            <input autoComplete='off' name="firstname" className='form-control ' type="text" placeholder='Enter Employee Name' onChange={(e) => handleinputs(e)} value={employee.firstname} pattern="^[A-Za-zÀ-ÿ ,.'-]+$" required/>
              <div className="calender-icon2">
                <i className="fa-solid fa-user fa-lg  "></i>
              </div>
            </div>
            </div>
            <div className="row mb-3">
               <div className="col-lg-6 d-flex">
                <ReactDatePicker autoComplete='off' className=' form-control' selected={getdate1} onChange={date => setdate1(date)} name='date' placeholderText='DOJ' required/>
                <div className="calender-icon">
                  <i className="fa-solid fa-calendar fa-lg mt-3 project-icon-2 "></i>
                </div>
              </div>
      <div className="col-lg-6 d-flex">
              <input autoComplete='off' name='email' className='form-control ' type="email" placeholder='email' onChange={(e) => handleinputs(e)} value={employee.email} required/>
              <div className="calender-icon2">
                <i className="fa-solid fa-envelope fa-lg  "></i>
              </div> 
              </div>
            </div>
            <div className="row mb-3">
             <div className="col-lg-6 d-flex ">
              <input autoComplete='off' type="text" name="mobile" className='form-control ' placeholder='Enter Phone' onChange={(e) => handleinputs(e)} value={employee.mobile} pattern="[789][0-9]{9}" required/>
              <div className="calender-icon2">
                <i className="fa-solid fa-phone fa-lg  "></i>
              </div>
              </div>
             <div className="col-lg-6 drop1">
             <select name='gender' onChange={(e) => handleinputs(e)} value={employee.gender} className='form-control ' required >
                <option value="" disabled selected hidden>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="others">others</option>
              </select>
           </div>
            </div>
            <div className="row mb-3">
                 <div className="col-lg-12 drop1">
              <select name='department' onChange={handleinputs} value={employee.department} className='form-control ' required >
                <option value="" disabled selected hidden>Enter Department</option>
                {
                  department.map((curele) => {
                    return <><option key={curele.id} value={curele.department}>{curele.department}</option></>
                  })
                }
              </select>
            </div>
            </div>
            <div className="row mb-4">
                 <div className="col-lg-12 drop1">
              <select name='role_id' onChange={handleinputs} value={employee.role_id} className='form-control ' required >
                <option value="" disabled selected hidden>Select Role</option>
                <option value="DM151" >Employee</option>
                <option value="DM152" >Approver</option>
              </select>
            </div>
            </div>
           <div className="row p-3">
            <button className='btn btn-primary bgcolor col-lg-12' >Create Employee</button>
           </div>
            </form>
          </div>
        </div>

      </div>
      <div className="sidebtns">
            <i data-tip='Add Employee' className="fa-solid fa-user-plus fa-1x btndesign " onClick={() => { history('/AddEmployee') }}></i> <br />
            <i data-tip='Add Project' className="fa-solid fa-file-circle-plus fa-1x btndesign " onClick={() => { history('/AddProjects') }}></i> <br />
            <i data-tip='Add Department' className="fa-solid fa-timeline fa-1x btndesign" onClick={() => { history('/AddDepartment') }}></i>
          </div>
      <ToastContainer />
      <ReactTooltip effect="solid" place="left"/>
    </>
  )
}

export default AddEmployee