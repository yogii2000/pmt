import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactTooltip from "react-tooltip"
import Home from './Home'

const Employee = () => {
  const history = useNavigate();
  const [employee, setemployee] = useState([])
  const [department, setdepartment] = useState([])
  const [active, setactive] = useState("a")
  const [searchterm, setsearch] = useState("")
  const [loading,setloading] = useState(false)
  const handlesearch = (e) => {
    setsearch(e.target.value)
  }
  const filtered = !searchterm
  ? employee
  : employee.filter((item) =>
      item.name.toLowerCase().includes(searchterm.toLowerCase())
  );
  const allemployees = async (e) => {
    try {
      //  e.preventDefault();
      const response = await fetch(`/Addprojects/Activity/AssignEmployees`)
      const data = await response.json();
      setemployee(data);
      setloading(true)
    } catch (error) {
      console.log(error)
    }

  }
  const buttonactive = async (dept, index) => {
    setactive(index)
    const response = await fetch(`/Addprojects/Activity/AssignEmployees/${dept}`)
    const data = await response.json();
    setemployee(data);
  }
  const alldept = async () => {
    try {
      const response = await fetch("/DepartmentList")
      const data = await response.json();
      setdepartment(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    allemployees();
    alldept();
  }, [])
  return (
   <>
   <Home/>
    <div className='dashboard'>
      <div className="employee-list">
        <div className="topper d-flex">
          <div className="path ">
            <span>Employees</span>
          </div>
          <div className="back" onClick={() => history('/AdminDashboard')}>
            <i  className="fa-solid fa-angle-left"></i>
          </div>
        </div>
        <nav className="navbar  ">
          <search className="d-flex">
            <input className="form-control me-2 width" type="search" placeholder="Search Employees" aria-label="Search" onChange={handlesearch} />
            {/* <button className="btn btn-primary bgcolor" type="submit">Search</button> */}
          </search>
        </nav>

        <div className="department-list">
          <button value="" onClick={() => { buttonactive('', 'a') }} className={active === "a" ? 'btn btn-primary bgcolor ' : 'btn btn-primary empactivebtn '}>All</button>
          {
            department.map((cval, index) => {
              return <><button className={active === index ? 'btn btn-primary bgcolor ' : 'btn btn-primary empactivebtn'} onClick={() => { buttonactive(cval.department, index) }} key={cval.id}>{cval.department}</button></>
            })
          }
        </div>
        <br />
        <div className="employee-bottom d-flex">
            <div className="sticky">
          <div className="employee-listt ">
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th className='bgcolor border-line' scope="col">ID</th>
                    <th className='bgcolor border-line' scope="col">Employee Name</th>
                    <th className='bgcolor border-line' scope="col">DOJ</th>
                    <th className='bgcolor border-line' scope="col">Email ID</th>
                    <th className='bgcolor border-line' scope="col">Phone No</th>
                    <th className='bgcolor border-line' scope="col">Gender</th>
                    <th className='bgcolor border-line' scope="col">Department</th>
                    {/* <th className='bgcolor'></th> */}
                  </tr>
                </thead>
                <tbody >
                  {

                    filtered.length === 0 && loading? <tr><td colSpan='8'>No Result Found!</td></tr> :  employee.map((currele) => {
                      return <tr key={currele.id}>
                        <td className='border-line'>{currele.empid}</td>
                        <td className='border-line'>{currele.name}</td>
                        <td className='border-line'>{currele.date_of_joining}</td>
                        <td className='border-line'>{currele.email}</td>
                        <td className='border-line'>{currele.mobile_no}</td>
                        <td className='border-line'>{currele.gender}</td>
                        <td className='border-line'>{currele.department}</td>
                      </tr>
                    })}
                </tbody>
              </table>
            </div>


          </div>
   
        </div>

      </div>
    </div>
    <div className=" buttons sidebtns ">
            <i data-tip='Add Employee' className="fa-solid fa-user-plus  btndesign " onClick={() => { history('/AddEmployee') }}></i> <br />
            <i data-tip='Add Project' className="fa-solid fa-file-circle-plus  btndesign " onClick={() => { history('/AddProjects') }}></i> <br />
            <i data-tip='Add Department' className="fa-solid fa-timeline  btndesign" onClick={() => { history('/AddDepartment') }}></i>
          </div>
    <ReactTooltip effect="solid" place="left"/>
    </>
  )
}

export default Employee