import { useNavigate } from "react-router-dom" //to teleport on a different page
import React from 'react'
import { useState, useEffect } from "react";
import Chart from "react-apexcharts"
import ReactTooltip from "react-tooltip"
import Home from "./Home";
import moment from "moment";
import { ToastContainer } from "react-toastify";
const Dashboard = () => {
  const history = useNavigate();
  const [projectcount, setprojectcount] = useState([])
  const [loading,setloading] = useState(false)
  const pjtcount = async () => {
    try {
      const response = await fetch("/Dashboard")
      const data = await response.json();
      setprojectcount(data);

    } catch (error) {
      console.log(error)
    }
  }
  const [employeecount, setemployeecount] = useState([])
  const allemployeescount = async () => {
    try {
      const response = await fetch("/employeecount")
      const data = await response.json();
      // console.log(data);
      setemployeecount(data);
    } catch (error) {
      console.log(error)
    }
  }
  const [liveproject,setliveproject] = useState([]);
  const livep = async()=>{
    try {
     const date1 = new Date()
     const date = moment(date1).format('yyyy-MM-DD')
      const response = await fetch(`/liveprojectadmin/${date}`)
      const data = await response.json();
      // console.log(data);
      setliveproject(data);
    } catch (error) {
      console.log(error)
    }
  }

  const [pendingreq,setpendingreq] = useState([]);
  const pendingrequest = async()=>{
    try {
      const response = await fetch('/pendingreq')
      const data = await response.json();
      // console.log(data);
      setpendingreq(data);
    } catch (error) {
      
    }
  }

  const [dept, setdept] = useState([])
  const [emp, setemp] = useState([])
  const piechart = async () => {
    const dept = [];
    const emp = []
    try {
      const response = await fetch("/piechart")
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        dept.push(data[i].department)
        emp.push(parseInt(data[i].num))
      }
      setdept(dept)
      setemp(emp)

    } catch (error) {
      console.log(error)
    }
  }

  const [employeeassign, setemployeeassign] = useState([])
  const [count,setcount] = useState([])
  const bargraph = async () => {
    try {
      const emp1=[]
      const count=[]
      const response = await fetch("/bargraph")
      const data = await response.json();
      for (let i = 0; i < data.length; i++) {
        emp1.push(data[i].project_name)
        count.push(parseInt(data[i].employee_assigned))
      }
      // console.log(data);
      setemployeeassign(emp1);
      setcount(count)
      setloading(true)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    livep();
    pjtcount();
    allemployeescount();
    bargraph();
    piechart();
    pendingrequest();
  }, [])
  var options = {
    series: [{
      name:'Assigned',
    data: count
  }],
    chart: {
    type: 'bar',
    height: 350,
    toolbar:{
      show: false
    }
  },
  tooltip:{
    enabled: true,
     theme: 'dark',
  },
  dataLabels:{
   enabled: false
   },
   legend:{
    show : true,
    position: 'bottom',
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
      // dataLabels:{
      //   orientation: 'vertical',
      //   position: 'center'
      // }
    }
  },
  xaxis: {
    enabled: false,
    tickPlacement: "on",
    axisTicks: {
      show: false
    },
    categories: employeeassign,
    labels:{
      show: false,
      style: { fontSize: "15", colors: ["#fff"] },
    },
  },
  fill:{
    colors: ['#f7f7f7']
  },
   yaxis:{
    show:true,
    axisTicks: {
      show: true
    },
    axisBorder: {
      show: true,
      color: "#eee"
    },
    labels:{
      formatter: function(val) {
        return val.toFixed(0);
      },
      style: { fontSize: "15", colors: ["#fff"] },
    },
    // title: {
    //   text: 'No. of Employees',
    //   style:{
    //     fontSize: "15", colors: ["#fff"]
    //   }
    // }
   },
  grid:{
    show: false
  },
  
  }
    const data = employeeassign
  return (
    <>
     <Home/>
      <div className="dashboard ">
        {/* to add path on top   */}
        <div className="topper d-flex">
          <div className="path ">
            <span>Dashboard</span>
          </div>
          <div className="back">
            {/* back button icon  */}
            <i className="fa-solid fa-angle-left"></i>
          </div>
        </div>
        <div className="rightpart ">
          <div className="upper ">
            <div className="content ">
              <div className="project-count">
                <div className="project-name bgcolor ">
                  <h6>Projects</h6>
                </div>
                <div className="count ">
                  {
                    projectcount.map((curelm) => {
                      return <h5>{curelm.count > 0 ? curelm.count : "0"}</h5>
                    })
                  }

                </div>
              </div>
              <div className="employee-count project-count">
                <div className="project-name bgcolor ">
                  <h6>Employees</h6>
                </div>
                <div className="count ">
                  {
                    employeecount.map((curelm) => {
                      return <h5>{curelm.count > 0 ? curelm.count : "0"}</h5>
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
                    liveproject ? 
                    liveproject.map((curelm) => {
                      return <h5>{curelm.count > 0 ? curelm.count : "0"}</h5>
                    })
                    :
                    <h5>0</h5>
                  }
                </div>
              </div>
              <div className="employee-count project-count">
                <div className="project-name bgcolor ">
                  <h6>Pending Requests</h6>
                </div>
                <div className="count ">
                  {
                    pendingreq.map((curelm) => {
                      return <h5>{curelm.count > 0 ? curelm.count : "0"}</h5>
                    })
                  }
                </div>
              </div>
            </div>
            </div>
            <div className="bottom-part d-flex">
               <div className="pie-chart bgcolor">
              <p className="tagname">Employees/Department</p>
              <Chart type="donut"
                width={450}
                height={300}
                series={emp}
                options={{
                  noData:{
                    text: 'No data ',
                    align: 'center',
                    verticalAlign: 'middle',
                    // offsetX: 0,
                    // offsetY: 0,
                    style: {
                      color: '#fff',
                      fontSize: '14px',
                  
                    }
                  },
                  chart:{
                    foreColor:'#fff'
                  },
                  labels: dept,
                  legend:{
                    position: 'bottom',
                  },
                  plotOptions:{
                    pie:{
                      donut:{
                        labels:{
                          show: true,
                          
                        }
                      }
                    }
                  }
                }}
                
                >

              </Chart>
            </div>

          
          <div className="bar-graph bgcolor">
            <p className="tagname">Employees/Project</p>
            {
              data.length === 0 && loading ? <div className="barchartnodata">No Data Available!</div> 
              :
               <Chart
               type="bar"
               width={400}
                options={options}
                series={options.series}/>
            }
          </div>   
            </div>
        </div>
      </div>
      <div className=" sidebtns">
            <i data-tip='Add Employee' className="fa-solid fa-user-plus fa-1x btndesign" onClick={() => { history('/AddEmployee') }}></i> <br />
            <i data-tip='Add Project' className="fa-solid fa-file-circle-plus fa-1x btndesign" onClick={() => { history('/AddProjects') }}></i> <br />
            <i data-tip='Add Department' className="fa-solid fa-timeline fa-1x btndesign" onClick={() => { history('/AddDepartment') }}></i>
          </div>
      <ReactTooltip effect="solid" place="left"/>
      <ToastContainer/>
    </>
  )
}

export default Dashboard