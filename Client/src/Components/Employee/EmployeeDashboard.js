import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Chart from "react-apexcharts"
import EmployeeSidebar from './EmployeeSidebar'

const EmployeeDashboard = () => {
  const id = localStorage.getItem('id')
  const [employeeproject,setemployeeproject] = useState([0])
  const [liveproject,setliveproject] = useState([])
  const [deadlinedates,setdeadlinedates] = useState([])
  const [pjt, setpjt] = useState([])
  const [hours, sethours] = useState([])
  const current = new Date()
  const date = `${current.getDate()<10 ? ('0'+ (current.getDate())):(current.getDate()) }-${current.getMonth()+1}-${current.getFullYear()}`;
  const newdate = `${current.getDate()<10 ? ('0'+ (current.getDate())):(current.getDate()) }-${current.getMonth()+1}-${current.getFullYear()}`;
  useEffect(()=>{
    const yourprojects = async()=>{
      try {
        const count = await fetch(`/employeeprojectcount/${id}`)
        const data = await count.json();
        setemployeeproject(data)
      } catch (error) {
        console.log(error)
      }
    }

   
    const livep = async()=>{
      try {
        const response = await fetch(`/liveproject/${date}/${id}`)
        const data = await response.json();
        console.log(data);
        setliveproject(data);
      } catch (error) {
        
      }
    }
       
    const totalhours = async()=>{
      const pjt = [];
      const hours = []
      try {
        const response = await fetch(`/employeeprojecthours/${id}`)
        const data = await response.json();
        for (let i = 0; i < data.length; i++) {
          pjt.push(data[i].project_name)
          hours.push(parseInt(data[i].total_hours))
        }
        setpjt(pjt)
        sethours(hours)
      } catch (error) {
        
      }
    }

    const deadline = async()=>{
      try {
        const response = await fetch(`/deadlinedates/${newdate}`)
        const data = await response.json();
        setdeadlinedates(data);
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    yourprojects();
    livep();
    totalhours();
    deadline();
  },[])
  return (
    <>
    <EmployeeSidebar/>
    <div className="dashboard">
    <div className="topper d-flex">
          <div className="path ">
            <span>Dashboard</span>
          </div>
          <div className="back">
            <i className="fa-solid fa-angle-left"></i>
          </div>
        </div>
          <div className="employeedashboarddiv d-flex">
            <div className="left">
          <div className="employeedashboard-content d-flex">
              <div className="project-count">
                <div className="project-name bgcolor ">
                  <h6>Your Projects</h6>
                </div>
                <div className="count ">
                  {
                    employeeproject.map((curelm) => {
                      return <h5>{curelm.count}</h5>
                    })
                  }

                </div>
              </div>
              <div className="employee-count project-count">
                <div className="project-name bgcolor ">
                  <h6>Live Projects</h6>
                </div>
                <div className="count ">
                  {
                    liveproject.map((curelm) => {
                      return <h5>{curelm.count}</h5>
                    })
                  }
                </div>
              </div>
      
            </div>
            <div className="pie-chart bgcolor">
              <p className="tagname">Total Hours/Project</p>
              <Chart type="donut"
                width={410}
                height={270}
                series={hours}
                options={{
                  noData:{
                    text: 'No data ',
                    align: 'center',
                    Align: 'center',
                    offsetX: 0,
                    offsetY: 0,
                    style: {
                      color: '#fff',
                      fontSize: '20px',
                  
                    }
                  },
                  labels: pjt,
                  chart:{
                    foreColor:'#fff'
                  },
                  plotOptions:{
                    pie:{
                      donut:{
                        labels:{
                          show:true,
                          
                        }
                      }
                    }
                  }
                }}>

              </Chart>
            </div>
            </div>
            <div className="right">
                <div className="upcomingdeadlines">
                    <p className='span'>Upcoming Deadlines</p>

                    <div className="employeedashboardtable">
            <div className="upcoming-table">
              <div className="sticky">
                <table className="table ">
                  <thead>
                    <tr>
                      <th className='newcolor' scope="col">Task</th>
                      <th className='newcolor' scope="col">End Date</th>
                    </tr>
                  </thead>
                  <tbody >
                  {deadlinedates.map((currele) => {
                      return <tr key={currele.id}>
                        <td ><p>{currele.activity_name}</p></td>
                        <td ><p>{currele.start_date}</p></td>
                      </tr>

                    })}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
                </div>
            </div>
          </div>

    </div>
    </>
  )
}

export default EmployeeDashboard