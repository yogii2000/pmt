import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import ReactTooltip from "react-tooltip"
import Home from './Home'
import ApproverSidebar from '../Approver/ApproverSidebar'
import EmployeeSidebar from '../Employee/EmployeeSidebar'

const Projects = () => {
  const history = useNavigate();
  const sidebar = localStorage.getItem('role')
  console.log(sidebar)
  const [searchterm, setsearch] = useState("")
  const [project, setproject] = useState([])
  const [loading, setloading] = useState(false)
  const handlesearch = (e) => {
    setsearch(e.target.value)
  }
  const filtered = !searchterm
    ? project
    : project.filter((item) =>
      item.project_name.toLowerCase().includes(searchterm.toLowerCase())
    );
  const sendprojectdata = (projectname, projectid, startdate, enddate) => {
    const role = localStorage.getItem('role')
    role === 'Admin' || role === 'Approver' ? history('/ProjectDetails', { state: { pjtname: projectname, pjtid: projectid, startdate: startdate, enddate: enddate } })
      :
      history('/ProjectInfo', { state: { pjtname: projectname, pjtid: projectid, startdate: startdate, enddate: enddate } })

  }

  useEffect(() => {
    const allproject = async () => {
      try {
        const response = await fetch("/Projects")
        const data = await response.json();
        setproject(data);
        setloading(true)
      } catch (error) {
        console.log(error)
      }
    }
    allproject();
  }, [])
  
  return (
    <>
      {
        sidebar === 'Admin' ? <Home /> : sidebar === 'Approver' ? <ApproverSidebar /> : <EmployeeSidebar />
      }

      <div className="dashboard">
        <div className="topper d-flex">
          <div className="path ">
            <span>Projects</span>
          </div>
          <div className="back" onClick={() => history('/AdminDashboard')}>
            <i className="fa-solid fa-angle-left"></i>
          </div>
        </div>
        <nav className="navbar  ">
          <search className="d-flex">
            <input className="form-control me-2 width" type="search" preventDefault placeholder="Search" onChange={handlesearch} />
            {/* <button className="btn btn-primary bgcolor" type="submit">Search</button> */}
          </search>
        </nav>

        {/* projects list */}
        <div className="projects-container d-flex">
          <div className="scroller ">
            <div className="projects-list "  >
              {
                filtered.length === 0 && loading ? <div className='noresultfound'>No result found!</div> : filtered.map((val) => {
                  return <div className="card_body bgcolor" onClick={() => { sendprojectdata(val.project_name, val.project_id, val.start_date, val.end_date) }} key={val.id}>
                    <h5 className="card-title text-center " >{val.project_name}</h5>
                  </div>
                })

              }
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

export default Projects