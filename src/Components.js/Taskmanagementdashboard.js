import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskmanagementDashboard = () => {
  const [tasks, settask] = useState([]);
  const [taskname, settaskname] = useState("");
  const [taskdescpription, settaskdescription] = useState("");
  const [taskduedate, setdate] = useState([new Date()]);

  const createtask = () => {
    if (taskname === "") return toast.warning("Please provide task title");
    else if (taskdescpription === "")
      return toast.warning("Please provide task description");
    else if (taskduedate === "")
      return toast.warning("Please provide task due date");

    let oldtask = [...tasks];
    let createnewtask = {
      tasktitle: taskname,
      taskdescp: taskdescpription,
      taskDuedate: taskduedate,
      taskStatus: "To-Do",
    };
    oldtask.push(createnewtask);
    settask(oldtask);
    toast.success("Task created successfully");
    settaskname("");
    settaskdescription("");
    setdate("");
  };
  const deletetask = (index) => {
    let oldtask = [...tasks];
    const deltask = oldtask.filter((v, i) => i !== index);
    settask(deltask);
  };
  const updatetaskstatus = (index, status) => {
    let oldtask = [...tasks];
    if (status === "To-Do") {
      oldtask[index].taskStatus = "On-going";
    } else if (status === "On-going") {
      oldtask[index].taskStatus = "Completed";
    } else if (status === "Completed") {
      oldtask[index].taskStatus = "To-Do";
    }
    settask(oldtask);
  };

  const buttonName = (status) => {
    if (status === "To-Do") return "Start Task";
    else if (status === "On-going") return "Complete Task";
    else if (status === "Completed") return "Restart";
  };

  const getColor = (status) => {
    if (status === "To-Do") return "red";
    else if (status === "On-going") return "blue";
    else if (status === "Completed") return "green";
  };

  return (
    <>
      <ToastContainer />
      <div className="outer">
        <h1>Task Management Dashboard</h1>
        <br />
        <>
          <form>
            <div class="form-group">
              <label for="exampletaskname">Task Name : </label>
              <input
                type="text"
                required
                value={taskname}
                onChange={(e) => settaskname(e.target.value)}
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter Task name"
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">Task Description : </label>
              <input
                type="text"
                required
                value={taskdescpription}
                onChange={(e) => settaskdescription(e.target.value)}
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Task desciption"
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">Task Due Date : </label>

              <input
                type="date"
                required
                value={taskduedate}
                onChange={(e) => setdate(e.target.value)}
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Task due date"
              />
            </div>

            <button
              onClick={() => createtask()}
              type="submit"
              class="btn btn-primary"
            >
              Create Task
            </button>
          </form>
        </>

        {tasks.map((v, i) => {
          return (
            <div className="inside">
              <div key={i}>
                <div
                  class="card mt-2"
                  style={{
                    backgroundColor: getColor(v.taskStatus),
                    color: "white",
                  }}
                >
                  <div class="card-body">
                    <h5 class="card-title"> Task : {v.tasktitle}</h5>
                    <h5 class="card-text"> Task Desciption :{v.taskdescp}</h5>
                    <h5 class="card-subtitle mb-2 text-muted">
                      Due Date :{v.taskDuedate}
                    </h5>
                    <h5 class="card-subtitle mb-2 text-muted">
                      Due Date :{v.taskStatus}
                    </h5>

                    <button
                      class="btn btn-primary"
                      onClick={() => updatetaskstatus(i, v.taskStatus)}
                    >
                      {buttonName(v.taskStatus)}
                    </button>
                    <button
                      class="btn btn-primary"
                      onClick={() => deletetask(i)}
                    >
                      Delete Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default TaskmanagementDashboard;
