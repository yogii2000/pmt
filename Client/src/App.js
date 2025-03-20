import React from 'react'
import './App.css';
import { HashRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import AddDepartment from './Components/Admin/AddDepartment';
import Dashboard from './Components/Admin/Dashboard';
import AddEmployee from './Components/Admin/AddEmployee';
import Projects from './Components/Admin/Projects';
import Employee from './Components/Admin/Employee';
import Login from './Components/Login';
import AddProjects from './Components/Admin/AddProjects';
import CreateActivity from './Components/Admin/CreateActivity'
import AssignActivityEmployees from './Components/Admin/AssignActivityEmployees';
import TimeSheet from './Components/Admin/TimeSheet';
import ProjectDetails from './Components/Admin/ProjectDetails';
import BookTime from './Components/Admin/BookTime';
import ProtectedRoutes from './Components/ProtectedRoutes';
import ProtectedEmpRoutes from './Components/ProtectedEmpRoutes';
import ProtectedApproverRoutes from './Components/ProtectedApproverRoutes';
import ApproverDashboard from './Components/Approver/ApproverDashboard'
import Requests from './Components/Admin/Requests';
import RequestsHandle from './Components/Admin/RequestsHandle';
import EmployeeDashboard from './Components/Employee/EmployeeDashboard';
import ChangePassword from './Components/ChangePassword';
import Projectdetails from './Components/Employee/Projectdetails';
import Projectlist from './Components/Employee/Projectlist'
import EmployeeTimeSheet from './Components/Employee/EmployeeTimeSheet';

function App() {
  return (
    <>
      <HashRouter basename='/'>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/AdminDashboard" element={<Dashboard />}></Route>
            <Route path="/Projects" element={<Projects />}></Route>
            <Route path="/Employee" element={<Employee />}></Route>
            <Route path='/AddProjects' element={<AddProjects />}></Route>
            <Route path="/AddEmployee" element={<AddEmployee />}></Route>
            <Route path="/Addprojects/Activity" element={<CreateActivity name='projects > Create Activity' />}></Route>
            <Route path="/Addprojects/Activity/AssignEmployees" element={<AssignActivityEmployees name='projects > Create Activity > Assign Employees > Dev' />}></Route>
            <Route path="/AddDepartment" element={<AddDepartment />}></Route>
            <Route path="/TimeSheet" element={<TimeSheet />}></Route>
            <Route path="/ProjectDetails" element={<ProjectDetails />}> </Route>
            <Route path="/BookTime" element={<BookTime />}></Route>
            <Route path='/Requests' element={<Requests />}></Route>
            <Route path='/RequestHandle' element={<RequestsHandle />} />
            <Route path='/Changepassword' element={<ChangePassword />} />
          </Route>
          <Route element={<ProtectedEmpRoutes />}>
            <Route path='/ApproverDashboard' element={<ApproverDashboard />}></Route>
            <Route path='/EmployeeTimeSheet' element={<EmployeeTimeSheet />}></Route>
            {/* <Route path="/Projects" element={<Projects />}></Route> */}
          </Route>
          <Route element={<ProtectedApproverRoutes />}>
            <Route path='/EmployeeDashboard' element={<EmployeeDashboard />}></Route>
            <Route path='/Projectlist' element={<Projectlist />}></Route>
            <Route path="/ProjectInfo" element={<Projectdetails />}></Route>
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
