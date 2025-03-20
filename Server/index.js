const express = require('express');
const app = express();
const path = require('path')
const password = 'Test@123'
// const cors = require('cors'); //middlewares
const client = require('./DbConfig'); //database details
const PORT = process.env.PORT || 4000;
app.use(express.static(path.join(__dirname + "/public")))
//connection
client.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
//MiddleWares
app.use(express.json())
//Routes

// for add employee Route 
app.post('/AddEmployee', async (req, res) => {
    try {
        const { firstname, doj, email, mobile, department, gender, role_id,date} = req.body;
        if (!firstname || !gender || !email || !mobile || !department || !role_id) {
            return res.status(422).json();
        }
        else {
            client.query("select * from user_profile where email = $1", [email], (err, result) => {
                const resp = result.rowCount;
                if (resp > 0) {
                    return res.status(500).json();
                }
                else {
                    client.query("INSERT INTO user_profile (name,date_of_joining,gender,email,password,mobile_no,department,role_id,added_on)VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)", [firstname, doj, gender, email, password, mobile, department, role_id,date]),
                        res.json()
                }
            })
        }
    }
    catch (err) {
        res.status(400).json();
        console.log(err)

    }
})

// for adding a project 
app.post('/AddProjects', async (req, res) => {
    try {
        const { startdate, enddate, commencementdate, deliverydate, pname, budget,date } = req.body;
        await client.query("INSERT INTO projects (project_name,start_date,end_date,commencement_date,delivery_date,budget,added_on)VALUES ($1,$2,$3,$4,$5,$6,$7)", [pname, startdate, enddate, commencementdate, deliverydate, budget,date]
        )
        res.json();
    }
    catch (err) {
        res.status(400).json();
        console.log(err)
    }
})

// for showing employee list on Dashboard 
app.get('/Addprojects/Activity/AssignEmployees', async (req, res) => {
    try {
        const employeelist = await client.query("SELECT * FROM user_profile");
        res.json(employeelist.rows);
    }
    catch (err) {
        console.error(err.message);
    }
})

app.get('/Addprojects/Activity/AssignEmployees/:dept', async (req, res) => {
    try {
        const { dept } = req.params;
        const employeelist = await client.query("SELECT * FROM user_profile WHERE Department = $1", [dept]);
        res.json(employeelist.rows);

    }
    catch (err) {
        console.error(err.message);
    }
})
app.get('/Addprojects/Activity/:pjtid', async (req, res) => {
    try {
        const { pjtid } = req.params;
        const employeelist = await client.query("SELECT * FROM project_assignments where project_id = $1 and deleted_on is null", [pjtid]);
        res.json(employeelist.rows);

    }
    catch (err) {
        console.error(err.message);
    }
})
app.get('/Projects', async (req, res) => {
    try {
        const projectlist = await client.query("SELECT * FROM projects");
        res.json(projectlist.rows);
    }
    catch (err) {
        console.error(err.message);
    }
})
app.post('/Addprojects/Activity/AssignEmployees', async (req, res) => {
    try {
        const { id, project_id, start_date, end_date, assigned, empname,newtime } = req.body;

        client.query("select * from project_assignments where project_id = $1 and empid = $2", [project_id, id], function (err, result1) {
            if (result1.rowCount > 0) {
                client.query("select * from project_assignments where project_id = $1 and empid = $2 and assigned = 'true'", [project_id, id], function (err, result2) {
                    if (result2.rowCount > 0) {
                        // console.log("test case2 " +result2.rowCount);
                        return res.status(402).json();
                    }
                    else {
                        client.query("UPDATE project_assignments set assigned = 'true', changed_on = $1 , deleted_on = NULL where project_id = $2 and empid = $3", [newtime, project_id, id])
                        res.json();
                    }
                })
            }
            else {
                const assignedemp = client.query("INSERT INTO project_assignments (employee_name,empid,project_id,assigned,start_date,end_date,added_on)VALUES ($1,$2,$3,$4,$5,$6,$7) returning *", [empname, id, project_id, assigned, start_date, end_date,newtime]);
                res.json(assignedemp.rows);


            }
        })
    }
    catch (err) {
        res.status(400).json();
        console.log(err)
    }
})

app.post('/', async (req, res) => {
    try {
        const { userid,password } = req.body;
        if (!userid || !password) {
            return res.status(402).json();
        }
        else {
            client.query("select * from user_profile inner join roles on user_profile.role_id = roles.role_id where email = $1 and password = $2", [userid, password], (error, result, field) => {
                if (result.rowCount > 0) {
                    res.json(result.rows);
                }
                else {
                    res.status(400).json();
                    // res.end();
                }
            });
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json();
    }
}
)
app.get('/Activities/:project', async (req, res) => {
    try {
        const { project } = req.params;
        const resp = await client.query("select project_activities.activity_name,projects.project_name from project_activities  join projects on project_activities.project_id = projects.project_id where project_name = $1", [project]);
        res.json(resp.rows)
    } catch (error) {
        res.status(400).json();
        console.log(error)
    }
}) 

app.post('/AddDepartment', async (req, res) => {
    try {
        const { department,date } = req.body;
        await client.query("INSERT INTO departments (department,added_on)values($1,$2)", [department,date])
        res.json();
    } catch (error) {
        res.status(400).json();
        console.log(error)
    }
})
app.get('/DepartmentList', async (req, res) => {
    try {
        const departments = await client.query("SELECT * FROM departments");
        res.json(departments.rows);
    } catch (error) {
        console.log(error)
    }
})
app.get('/ProjectDetails/:name', async (req, res) => {
    try {
        const { name } = req.params;
        const departments = await client.query("SELECT * FROM projects where project_name = $1", [name]);
        res.json(departments.rows);
    } catch (error) {
        console.log(error)
    }
})


app.get('/Dashboard', async (req, res) => {
    try {
        const projectcount = await client.query("select count(*) from projects")
        res.json(projectcount.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/employeecount', async (req, res) => {
    try {
        const projectcount = await client.query("select count(*) from user_profile")
        res.json(projectcount.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/liveproject/:date/:id', async (req, res) => {
    try {
        const { date, id } = req.params;
        const projectcount = await client.query("select count(*) from project_assignments where end_date >= $1 and empid = $2 and deleted_on is null", [date, id])
        res.json(projectcount.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/liveprojectadmin/:date', async (req, res) => {
    try {
        const { date } = req.params;
        const projectcount = await client.query("select count(*) from projects where end_date >= $1", [date])
        res.json(projectcount.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/pendingreq', async (req, res) => {
    try {
        const projectcount = await client.query("select count(*) from project_approves where isapproved is null")
        res.json(projectcount.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get('/bargraph', async (req, res) => {
    try {
        bargraphdata = await client.query("SELECT projects.project_name, COUNT(empid) AS Employee_assigned FROM projects INNER JOIN project_assignments on projects.project_id = project_assignments.project_id where project_assignments.deleted_on is NULL GROUP BY project_name")

        res.json(bargraphdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/piechart', async (req, res) => {
    try {
        piedata = await client.query("select department, count(empid) as num from user_profile group by department")

        res.json(piedata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.post('/Addprojects/Activity/remove/:id/:project_id', async (req, res) => {
    try {
        const { pid, id, newtime, unassigned } = req.body;
        await client.query("update project_assignments set deleted_on = $1,assigned = $2 WHERE empid = $3 and project_id = $4", [newtime, unassigned, pid, id])
        res.json();
    } catch (error) {
        console.log(error)
    }
})
app.post('/createactivity', async (req, res) => {
    try {
        const { activityname,pjtid, id, project_name ,date} = req.body;
        if (!activityname) {
            return res.status(402).json();
        }
        await client.query("insert into project_activities(activity_name,pjtname,project_id,added_on,added_by) values($1,$2,$3,$4,$5)", [activityname, project_name, pjtid,date, id,])
        res.json();
    } catch (error) {
        console.log(error)
        res.status(400).json();
    }
})

app.get('/createdActivitylist/:pjtid', async (req, res) => {
    try {
        const { pjtid } = req.params;
        const createdlist = await client.query("select * from project_activities where project_id = $1", [pjtid])
        res.json(createdlist.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get('/activitiescount/:pjtid', async (req, res) => {
    const { pjtid } = req.params;
    const createdlist = await client.query("select count(*) from project_activities where project_id = $1", [pjtid])
    res.json(createdlist.rows)
})
app.get('/assignedcount/:pjtid', async (req, res) => {
    const { pjtid } = req.params;
    const createdlist = await client.query("select count(*) from project_assignments where project_id = $1 and deleted_on is null ", [pjtid])
    res.json(createdlist.rows)
})
app.post('/Askapproval', async (req, res) => {
    try {
        const { startdate, project, activity, hours, id, sidebar,date} = req.body;
        await client.query("insert into project_approves(project_name,empid,activity_name,no_of_hours,start_date,added_on,added_by) values($1,$2,$3,$4,$5,$6,$7)", [project, id, activity, hours, startdate,date, sidebar])
        res.json();
    } catch (error) {
        console.log(error)
        res.status(501).json();
    }
})
app.get('/disapproverlist/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const approverlist = await client.query("select * from project_approves where isapproved = 'disapproved' and empid = $1", [id])
        res.json(approverlist.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get('/approvedlist/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const approverlist = await client.query("select * from project_approves where isapproved = 'approved' and empid = $1", [id])
        res.json(approverlist.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/pending/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const approverlist = await client.query("select * from project_approves  where isapproved is NULL and empid = $1", [id])
        res.json(approverlist.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/pendingcount', async (req, res) => {
    try {
        const approverlist = await client.query("select project_name,count(*) as count from project_approves where isapproved is NULL group by project_name ")
        res.json(approverlist.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/pendinglist/:pname', async (req, res) => {
    try {
        const { pname } = req.params;
        const approverlist = await client.query("select project_approves.id,project_activities.added_on,project_activities.added_by ,user_profile.role_id,project_approves.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.start_date ,project_approves.empid from project_approves left join user_profile on user_profile.empid = project_approves.empid left join project_activities on project_approves.activity_name = project_activities.activity_name and project_activities.pjtname = $1 where project_approves.isapproved is null and project_approves.project_name = $2", [pname, pname])
        res.json(approverlist.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/filterTimeSheetdata', async (req, res) => {
    try {
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' ")
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})


app.get('/filterTimeSheetdata/:project', async (req, res) => {
    try {
        const { project } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and projects.project_name = $1", [project])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/filterTimeSheetdata/:project/:activity', async (req, res) => {
    try {
        const { project, activity } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and projects.project_name = $1 and project_activities.activity_name = $2", [project, activity])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/filterTimeSheetdata/:project/:activity/:employee_name', async (req, res) => {
    try {
        const { project, activity, employee_name } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and projects.project_name = $1 and project_activities.activity_name = $2 and user_profile.name = $3", [project, activity, employee_name])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/filterTimeSheetdataemp/:employee_name', async (req, res) => {
    try {
        const { employee_name } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and user_profile.name = $1 ", [employee_name])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/filterTimeSheetdataonlyproject/:project', async (req, res) => {
    try {
        const { project } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and projects.project_name = $1 ", [project])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/filterTimeSheetdataonlyprojectandactivity/:project/:activity', async (req, res) => {
    try {
        const { project, activity } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and projects.project_name = $1 and project_activities.activity_name = $2  ", [project, activity])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/filterTimeSheetdataonlyprojectandactivityandemp/:project/:activity/:employee', async (req, res) => {
    try {
        const { project, activity, employee } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and projects.project_name = $1 and project_activities.activity_name = $2 and user_profile.name = $3  ", [project, activity, employee])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/filterTimeSheetdata/:project/:activity/:employee_name/:from/:to', async (req, res) => {
    try {
        const { project, activity, employee_name, from, to } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and projects.project_name = $1 and project_activities.activity_name = $2 and user_profile.name = $3 and projects.added_on::date between $4 and $5", [project, activity, employee_name, from, to])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/filterTimeSheetdataempinterval/:employee_name/:from/:to', async (req, res) => {
    try {
        const { employee_name, from, to } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and user_profile.name = $1 and project_approves.added_on::date between $2 and $3", [employee_name, from, to])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/filterTimeSheetdataonlyinterval/:from/:to', async (req, res) => {
    try {
        const { from, to } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved'  and project_approves.added_on::date between $1 and $2", [from, to])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get('/filterEmployeeTimeSheetdata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and user_profile.empid = $1 ", [id])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get('/filterEmployeeTimeSheetdata/:id/:project', async (req, res) => {
    try {
        const { id, project } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and projects.project_name = $1 and user_profile.empid = $2", [project, id])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/filterEmployeeTimeSheetdata/:id/:project/:activity', async (req, res) => {
    try {
        const { project, activity, id } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and projects.project_name = $1 and project_activities.activity_name = $2 and user_profile.empid = $3", [project, activity, id])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/filterEmployeeTimeSheetdata/:id/:project/:activity/:from/:to', async (req, res) => {
    try {
        const { project, activity, id, from, to } = req.params
        const timesheetdata = await client.query("select projects.project_name,project_activities.activity_name,user_profile.name,project_approves.no_of_hours,project_approves.added_on,project_approves.approved_on,project_approves.approved_by,project_approves.added_by,project_approves.isapproved,projects.start_date,projects.end_date,projects.commencement_date,projects.delivery_date from projects inner join project_activities on projects.project_id = project_activities.project_id inner join project_approves on project_activities.activity_name = project_approves.activity_name and project_activities.pjtname = project_approves.project_name  inner join user_profile on user_profile.empid = project_approves.empid where project_approves.isapproved = 'approved' and projects.project_name = $1 and project_activities.activity_name = $2 and user_profile.empid = $3 and projects.start_date::date between $4 and $5", [project, activity, id, from, to])
        res.json(timesheetdata.rows)
    } catch (error) {
        console.log(error)
    }
})
app.get('/double', async (req, res) => {
    client.query('select * from user_profile', function (err, result1) {
        const res1 = result1.rowCount
        if (res1 < 1) {

            client.query('select * from projects', function (err, result2) {
                const res2 = result2.rows
                res.json(res2)
            })
        }
        else {
            res.json("hello")
        }

    })
})
app.post('/reqapproved/:id/:act_name/:pname', async (req, res) => {
    try {
        const { id, act_name, pname } = req.params;
        const { isapproved, newtime, role } = req.body;
        console.log(newtime)
        const resp = await client.query('update project_approves set isapproved = $1,approved_on = $2,approved_by = $3 where empid = $4 and activity_name = $5 and project_name = $6 returning *', [isapproved, newtime, role, id, act_name, pname])
        res.json(resp.rows);
    } catch (error) {
        console.log(error)
        console.log(res.status(400).json());
    }
})
app.post('/reqdisapproved/:id/:act_name/:pname', async (req, res) => {
    try {
        const { id, act_name, pname } = req.params;
        const { isdisapproved, comment } = req.body;
        const resp = await client.query('update project_approves set isapproved = $1, comment = $2 where empid = $3 and activity_name = $4 and project_name = $5  returning *', [isdisapproved, comment, id, act_name, pname])
        res.json(resp.rows);
    } catch (error) {
        console.log(error)
    }
})
app.post('/changepassword', async (req, res) => {
    try {
        const { oldpassword, newpassword, confirmpassword, id } = req.body;
        if (!oldpassword || !newpassword || !confirmpassword) {
            return res.status(502).json();
        }
        else if (newpassword !== confirmpassword) {
            return res.status(501).json();
        }
        else {
            client.query('select * from user_profile where password = $1 and empid = $2', [oldpassword, id], function (err, result) {
                if (result.rowCount > 0) {
                    client.query('update user_profile set password =$1 where empid = $2 and password= $3 ', [newpassword, id, oldpassword])
                    res.json();
                }
                else {
                    res.status(505).json();
                }
            })

        }
    } catch (error) {
        res.status(400).json()
        console.log(error)
    }
})

app.get('/employeeprojectcount/:id', async (req, res) => {
    try {
        const { id } = req.params
        const count = await client.query("select count(*) from project_assignments where empid = $1 and deleted_on is null", [id])
        res.json(count.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get('/employeeprojecthours/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const hours = await client.query("select project_name,sum(no_of_hours) as total_hours from project_approves where empid = $1 and isapproved = 'approved' group by project_name ", [id])
        res.json(hours.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get('/deadlinedates/:newdate', async (req, res) => {
    try {
        const { newdate } = req.params;
        const data = await client.query("select * from project_approves where start_date::date = $1", [newdate])
        res.json(data.rows)
    } catch (error) {
        console.log(error)
    }
})

app.get('/Employeeprojectlist/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await client.query("select projects.project_name,projects.project_id from project_assignments join projects on projects.project_id = project_assignments.project_id where project_assignments.empid = $1 and assigned = 'true' ", [id])
        res.json(data.rows)
    } catch (error) {
        console.log(error)
    }
})
// server working on 4000 port 
app.listen(PORT, console.log("server is working"));
