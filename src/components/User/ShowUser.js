import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";

const ShowUser = () => {
  const showUserApi = "http://localhost:8080/api/tasks";

  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${showUserApi}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setTasks(tasks.filter((task) => task.id !== id));
      console.log('task deletes successfully')
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(showUserApi);
      setTasks(response.data);
    } catch (err) {
      setError("Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (tasks.length === 0) {
    return <h1>No tasks found</h1>;
  }

  return (
    <div className="mt-5">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>User Name</th>
            <th>User Time Zone</th>
            <th>User Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td>{index + 1}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.user?.firstName} {task.user?.lastName}</td>
              <td>{task.user?.timeZone}</td>
              <td>{task.user?.active ? "Active" : "Inactive"}</td>
              <td>
                <Link to={`/edit-task/${task.id}`}>
                  <i className="btn btn-success" aria-hidden="true">update Task&User</i>
                </Link>
                <Link to={`/task/${task.id}`}>
                  <i className="fa fa-eye" aria-hidden="true"></i>
                </Link>
                <i
                  className="fa fa-trash-o"
                  aria-hidden="true"
                  onClick={() => handleDelete(task.id)}
                ></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUser;
