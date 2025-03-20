import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import ReactTooltip from "react-tooltip"
import EmployeeSidebar from './EmployeeSidebar'

const Projectlist = () => {
  const id = localStorage.getItem('id')
  const history = useNavigate();
  const [searchterm, setsearch] = useState("")
  const [project, setproject] = useState([])
  const [loading,setloading] = useState(false)
  const handlesearch = (e) => {
    setsearch(e.target.value)
  }
  const filtered = !searchterm
  ? project
  : project.filter((item) =>
      item.project_name.toLowerCase().includes(searchterm.toLowerCase())
  );

  const sendprojectdata = (projectname, projectid, startdate, enddate) => {
    history('/ProjectInfo',{ state: {  pjtname: projectname , pjtid:  projectid , startdate:  startdate , enddate: enddate }   })
   
  }
  const empprojectlist = async () => {
    try {
      const response = await fetch(`/Employeeprojectlist/${id}`)
      const data = await response.json();
      setproject(data);
      setloading(true)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    empprojectlist();
  }, [])
  return (
    <>
    <EmployeeSidebar/>
       <div className="dashboard">
        <div className="topper d-flex">
          <div className="path ">
            <span>Projects</span>
          </div>
          <div className="back">
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
             filtered.length === 0 && loading? <div className='noresultfound'>No result found!</div> : filtered.map((val) => {
                  return <div className="card_body bgcolor" key={val.id}>
                    <h5 className="card-title text-center " onClick={() => { sendprojectdata(val.project_name, val.project_id, val.start_date, val.end_date) }}>{val.project_name}</h5>
                  </div>

                })
              }
            </div>
          </div>

        </div>
      </div>
      <ReactTooltip effect="solid" place="left"/>
    </>
  )
}

export default Projectlist