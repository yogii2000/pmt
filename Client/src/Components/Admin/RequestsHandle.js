import React, { useState } from 'react'
import { useEffect } from 'react'
import ApproverSidebar from '../Approver/ApproverSidebar'
import Home from './Home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router';
import moment from 'moment';

const RequestsHandle = () => {
  const history = useNavigate();
  const location = useLocation();
  const [popup, setpopup] = useState(false)
  const [comment, setcomment] = useState('')
  const [pendinglist, setpendinglist] = useState([])
  const isapproved = 'approved'
  const pname = location.state.pjtname
  const isdisapproved = 'disapproved'
  const role = localStorage.getItem('role')
  const reqapproved = async (id, act_name, pname) => {
    try {
      const newtime = new Date()
      const response = await fetch(`/reqapproved/${id}/${act_name}/${pname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          isapproved, newtime, role
        })
      })
      if (response.status === 200) {
        toast.success("Request Approved", {
          position: "top-center"
        });
      }
    } catch (error) {
      console.log(error)
    }


  }
  const reqdisapproved = async (id, act_name, pname) => {
    try {
      setpopup(false)
      const response = await fetch(`/reqdisapproved/${id}/${act_name}/${pname}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          isdisapproved, comment
        })
      })
      if (response.status === 200) {
        toast.success("Disapproved successfully", {
          position: "top-center"
        });
      }
    } catch (error) {
      console.log(error)
    }

  }

  const popupopen = () => {
    setpopup(true)
  }
  const handleclosebtn = () => {
    setpopup(false)
  }
  const pendingcount = async () => {
    const response = await fetch(`/pendinglist/${pname}`);
    const data = await response.json();
    setpendinglist(data)
    console.log(data)
  }
  useEffect(() => {

    pendingcount();
  }, [reqapproved,reqdisapproved])
  const sidebar = localStorage.getItem('role')
  return (

    <>
      {
        sidebar === 'Admin' ? <Home /> : <ApproverSidebar />

      }
      <div className='dashboard'>
        <div className="topper d-flex">
          <div className="path ">
            <span>Projects</span>
          </div>
          <div className="back" onClick={() => history('/AdminDashboard')}>
            <i className="fa-solid fa-angle-left"></i>
          </div>
        </div>
        <div className="request-handle d-flex">
          <div className="sticky">
            <div className="request-listt ">
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th className='bgcolor border-line' scope="col">Project name</th>
                    <th className='bgcolor border-line' scope="col">Task Name</th>
                    <th className='bgcolor border-line' scope="col">Created On</th>
                    <th className='bgcolor border-line' scope="col">Created By</th>
                    <th className='bgcolor border-line' scope="col">Employee Name</th>
                    <th className='bgcolor border-line' scope="col">Hours</th>
                    <th className='bgcolor border-line' scope="col">Date</th>
                    {/* <th className='bgcolor border-line' scope="col">Commencement Date</th>
                    <th className='bgcolor border-line' scope="col">End Date</th>
                    <th className='bgcolor border-line' scope="col">Delivery date</th> */}
                    <th className='bgcolor border-line' scope="col"></th>
                    {/* <th className='bgcolor'></th> */}
                  </tr>
                </thead>
                <tbody >
                  {
                    pendinglist.map((currele) => {
                      return <tr key={currele.id}>
                        <td className='border-line'>{currele.project_name}</td>
                        <td className='border-line'>{currele.activity_name}</td>
                        <td className='border-line'>{moment(currele.added_on).format("yyyy-MM-DD") }</td>
                        <td className='border-line'>{currele.added_by}</td>
                        <td className='border-line'>{currele.name}</td>
                        <td className='border-line'>{currele.no_of_hours}</td>
                        <td className='border-line'>{moment(currele.start_date).format("yyyy-MM-DD") }</td>
                        <td>
                          <div className="btns">
                            <button className='btn-primary btn bgcolor' onClick={() => { reqapproved(currele.empid, currele.activity_name, currele.project_name) }}>Approved</button>
                            <button className='btn btn-primary bgcolor reqhandlebtn' onClick={popupopen} >Disapproved</button>
                          </div>
                          <div className="popup-outer">
                            <div className={popup ? 'open-popup popup ' : "popup"}>
                              <div className="headerdisapprove d-flex">
                                <h5 className='gcolor'>Add Reason For Refusing approval</h5>
                                <button className='gcolor cancel-btn2' onClick={handleclosebtn}><h7>X</h7></button>
                              </div>
                              <textarea className='form-control' placeholder='Enter Comment!' rows='5' value={comment} onChange={(e) => { setcomment(e.target.value) }}></textarea> <br />
                              <button className='btn btn-primary bgcolor submitbtn' onClick={() => { reqdisapproved(currele.empid, currele.activity_name, currele.project_name) }}>Submit</button>
                            </div>
                          </div>
                        </td>

                      </tr>

                    })}
                </tbody>
              </table>
            </div>


          </div>

        </div>
        <div className="popup">
          <h5 className='gcolor'>Add Reason For Disapproval</h5>
          <h1>hello</h1>
          <button className='gcolor cancel-btn2' onClick={() => { history(-1) }}><h7>X</h7></button>
          <textarea className='form-control' placeholder='Enter Comment!' rows='5' ></textarea> <br />
          <button className='btn btn-primary bgcolor'>Submit</button>
        </div>
      </div>
      <div className=" buttons sidebtns ">
        <i data-tip='Add Employee' className="fa-solid fa-user-plus  btndesign " onClick={() => { history('/AddEmployee') }}></i> <br />
        <i data-tip='Add Project' className="fa-solid fa-file-circle-plus  btndesign " onClick={() => { history('/AddProjects') }}></i> <br />
        <i data-tip='Add Department' className="fa-solid fa-timeline  btndesign" onClick={() => { history('/AddDepartment') }}></i>
      </div>
      <ToastContainer />
    </>
  )
}

export default RequestsHandle