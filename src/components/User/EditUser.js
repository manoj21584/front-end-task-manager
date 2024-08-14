import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Common/Loader";
import "./Task.css";

const EditTask = () => {
    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "",
        timeZone: "",
        firstName: "",
        lastName: "",
        isActive: true,
        createdAt: "",
        updatedAt: ""
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    
    // URL for fetching and updating the task
    const taskApiUrl = `http://localhost:8080/api/tasks`;

    useEffect(() => {
        // Fetch task details when the component mounts
        getTask();
    }, [id]);

    const getTask = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${taskApiUrl}/${id}`);
            setTask(response.data);
            console.log(task)
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setTask({
            ...task,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            // Construct the URL with query parameters
            const updateTaskApi = `${taskApiUrl}/${id}?timeZone=${encodeURIComponent(task.timeZone)}&firstName=${encodeURIComponent(task.firstName)}&lastName=${encodeURIComponent(task.lastName)}&isActive=${task.isActive}`;

            const response = await fetch(updateTaskApi, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: task.title,
                    description: task.description,
                    status: task.status
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            await response.json();
            navigate("/tasks");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="task-form">
            <div className="heading">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>Edit Task Form</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={task.title}
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3 mt-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={task.description}
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <input
                        type="text"
                        className="form-control"
                        id="status"
                        name="status"
                        value={task.status}
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={task.firstName}
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={task.lastName}
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="timeZone" className="form-label">Time Zone</label>
                    <select
                        className="form-control"
                        id="timeZone"
                        name="timeZone"
                        value={task.timeZone}
                        onChange={handleInput}
                    >
                        <option value="">Select Time Zone</option>
                        <option value="Asia/Kolkata">Asia/Kolkata</option>
                        <option value="America/New_York">America/New_York</option>
                        <option value="Europe/London">Europe/London</option>
                        {/* Add more time zones as needed */}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="isActive" className="form-label">Active Task</label>
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={task.isActive}
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="createdAt" className="form-label">Created At</label>
                    <input
                        type="text"
                        className="form-control"
                        id="createdAt"
                        name="createdAt"
                        value={task.createdAt}
                        readOnly
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="updatedAt" className="form-label">Updated At</label>
                    <input
                        type="text"
                        className="form-control"
                        id="updatedAt"
                        name="updatedAt"
                        value={task.updatedAt}
                        readOnly
                    />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">
                    Update
                </button>
            </form>
        </div>
    );
};

export default EditTask;
