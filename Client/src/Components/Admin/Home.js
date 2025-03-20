import React from 'react'
import {  useLocation } from 'react-router-dom'; //for making links responsive and better
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Home = () => {
  const history = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  // const [logout, setlogout] = useState(false);
  //  const [sidebar,setsidebar]=useState(false);
  //  const togglesidebar=()=>{
  //   setsidebar((prevstate)=>!prevstate)
  //  }
  //  const hidesidebar =()=>{
  //   setsidebar(false)
  //  }
  const logouthandler = (e) => {
    e.preventDefault();
    localStorage.clear();
    history('/')
  }
  return (
    <>

      {/* //side nav bar */}
      {/* <i className='fa-solid' /> */}

      {/* <div className="sidenav bgcolor">
         <div className='ham-burger' onClick={togglesidebar}>
          {sidebar?(
            <i  className="fas fa-times bars fa-2x" ></i>) :
            ( <i className="fas fa-bars cancel fa-2x"></i> 
            )} */}
      {/* <span>PROJECT MANAGEMENT</span> */}
      {/* </div>
          </div> */}
      {/* <div className={sidebar ? "sidebar  sidebar-open": "sidebar "}> */}
      <div className="sidebar">
        <nav >
          <li><Link to="/AdminDashboard" className={splitLocation[1] === "AdminDashboard" ? "active nav-link" : 'nav-link'}><i className="fa-solid fa-bars ml-3"></i>Dashboard</Link></li>
          <li><Link to="/Projects" className={splitLocation[1] === "Projects" ? "active nav-link" : 'nav-link'}><i className="fa-solid fa-file"></i>Projects</Link></li>
          <li><Link to="/Employee" className={splitLocation[1] === "Employee" ? "active nav-link" : 'nav-link'}><i className="fa-solid fa-user-group"></i>Employee</Link></li>
          {/* <li><Link to="/Permissions" className={splitLocation[1] === "Permissions" ? "active nav-link" : 'nav-link'}><i className="fa-solid fa-lock"></i>Permissions</Link></li> */}
          <li><Link to="/TimeSheet" className={splitLocation[1] === "TimeSheet" ? "active nav-link" : 'nav-link'}><i className="fa-solid fa-timeline"></i>Time Sheet</Link></li>
          <li><Link to="/BookTime" className={splitLocation[1] === "BookTime" ? "active nav-link" : 'nav-link'}><i className="fa-solid fa-business-time"></i>Book Time</Link></li>
          <li><Link to="/Requests" className={splitLocation[1] === "Requests" ? "active nav-link" : 'nav-link'}><i className="fa-solid fa-code-pull-request"></i>Requests</Link></li>
          <li><Link to="/AddDepartment" className={splitLocation[1] === "AddDepartment" ? "active nav-link" : 'nav-link'}><i className="fa-solid fa-building"></i>Department</Link></li>
          <li><Link to="/Changepassword" className={splitLocation[1] === "Changepassword" ? "active nav-link" : 'nav-link'}><i className="fa-solid fa-key"></i>Change Password</Link></li>
          <li><Link onClick={logouthandler} className="nav-link"><i className="fa-solid fa-right-from-bracket"></i>Log out</Link></li>
        </nav>
      </div>
    </>

  )
}

export default Home