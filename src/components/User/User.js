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
        timeZone: "", // Initialize with an empty string
        firstName: "", // Initialize with an empty string
        lastName: "", // Initialize with an empty string
        isActive: true,
        createdAt: "",
        updatedAt: ""
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    
    const taskApiUrl = `http://localhost:8080/api/tasks`;

    useEffect(() => {
        getTask();
    }, [id]);

    const getTask = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${taskApiUrl}/${id}`);
            setTask(response.data);
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

        // Log the task state before making the request
        console.log("Task state before PUT request:", task);

        try {
            setIsLoading(true);
            
            // Ensure that none of the parameters are undefined
            if (!task.timeZone || !task.firstName || !task.lastName || typeof task.isActive === 'undefined') {
                throw new Error("All fields must be filled");
            }

            // Construct query parameters
            const params = new URLSearchParams({
                timeZone: task.timeZone,
                firstName: task.firstName,
                lastName: task.lastName,
                isActive: task.isActive,
            });

            // Construct the full API URL with query parameters
            const updateTaskApi = `${taskApiUrl}/${id}?${params.toString()}`;

            // Make the PUT request with task data in the body
            const response = await axios.put(updateTaskApi, {
                title: task.title,
                description: task.description,
                status: task.status
            });

            if (response.status !== 200) {
                throw new Error("Network response was not ok");
            }

            // Navigate to the task detail page after successful update
            navigate(`/task/${id}`);
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
