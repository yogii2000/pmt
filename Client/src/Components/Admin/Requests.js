import React from 'react'
import Home from './Home'
import { useNavigate } from 'react-router'
import ApproverSidebar from '../Approver/ApproverSidebar'
import { useState } from 'react'
import { useEffect } from 'react'
const Requests = () => {

     const [requestpending,setrequestpending]= useState([])
    const history = useNavigate();
    const [search,setsearch]=useState('');
    const sidebar = localStorage.getItem('role')
    const [loading,setloading] = useState(false)
  const handlesearch = (e) => {
    setsearch(e.target.value)
  }
  const filtered = !search
  ? requestpending
  : requestpending.filter((item) =>
      item.project_name.toLowerCase().includes(search.toLowerCase())
  );
    useEffect(()=>{
      const requestlist = async()=>{
        const response = await fetch('/pendingcount');
           const data = await response.json();
           setrequestpending(data)
           setloading(true)
    }
    requestlist();
    },[])
  return (
    <>
    {
      sidebar==='Admin' ? <Home/> : <ApproverSidebar/>
    }
    <div className='dashboard'>
    <div className="topper d-flex">
          <div className="path ">
            <span>Requests</span>
          </div>
          <div className="back" onClick={() => history('/AdminDashboard')}>
            <i  className="fa-solid fa-angle-left fs-lg"></i>
          </div>
        </div>
        <nav className="navbar  ">
          <div className="d-flex">
            <input className="form-control me-2 width" type="search" placeholder="Search Requests" aria-label="Search" value={search} onChange={handlesearch} />
            {/* <button className="btn btn-primary bgcolor" type="submit">Search</button> */}
          </div>
        </nav>
        <div className="request-container d-flex" >
          {
             filtered.length === 0 && loading? <div className='noresultfound'>No Pending Requests!</div> : requestpending.reverse().map((val)=>{
              return <div className="request-count" onClick={()=>{history('/RequestHandle',{
                state:{
                  pjtname : val.project_name
                }
              })}}>
            <div className="title bgcolor">
                <h4>{val.project_name}</h4>
            </div>
             <div className="pending-count">
                <p>{val.count} Requests</p>
             </div>

           </div>
            })
          }
       

        </div>

    </div>
    {
      sidebar==='Admin' ? <div className=" buttons sidebtns ">
      <i data-tip='Add Employee' className="fa-solid fa-user-plus  btndesign " onClick={() => { history('/AddEmployee') }}></i> <br />
      <i data-tip='Add Project' className="fa-solid fa-file-circle-plus  btndesign " onClick={() => { history('/AddProjects') }}></i> <br />
      <i data-tip='Add Department' className="fa-solid fa-timeline  btndesign" onClick={() => { history('/AddDepartment') }}></i>
    </div> : ''
    }
    </>
  )
}

export default Requests