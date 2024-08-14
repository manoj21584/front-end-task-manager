import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Loader from '../Common/Loader';
import './Task.css';

const CreateUser = () => {
    const { taskId } = useParams(); // Assume taskId is passed as a route parameter
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
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

    // Fetch task data if editing an existing task
    useEffect(() => {
        if (taskId) {
            const fetchTask = async () => {
                try {
                    setIsLoading(true);
                    const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`);
                    if (response.ok) {
                        const data = await response.json();
                        setUser({
                            title: data.title,
                            description: data.description,
                            status: data.status,
                            timeZone: data.user?.timeZone || "",
                            firstName: data.user?.firstName || "",
                            lastName: data.user?.lastName || "",
                            isActive: data.user?.isActive || true,
                            createdAt: data.createdAt,
                            updatedAt: data.updatedAt
                        });
                    } else {
                        console.error('Failed to fetch task data');
                    }
                } catch (error) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchTask();
        }
    }, [taskId]);

    const handleInput = (event) => {
        const { name, value, type, checked } = event.target;
        setUser({
            ...user,
            [name]: type === "checkbox" ? checked : value 
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLoading(true);

            const createUserApi = `http://localhost:8080/api/tasks${taskId ? `/${taskId}` : ''}?timeZone=${user.timeZone}&firstName=${user.firstName}&lastName=${user.lastName}&isActive=${user.isActive}`;

            const response = await fetch(createUserApi, {
                method: taskId ? 'PUT' : 'POST', // PUT if updating, POST if creating
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: user.title,
                    description: user.description,
                    status: user.status
                }),
            });

            if (response.ok) {
                console.log('Form submitted successfully!');
                setUser({ title: "", description: "", status: "", firstName: "", lastName: "", timeZone: "", isActive: true, createdAt: "", updatedAt: "" });
                navigate('/show-user');
            } else {
                console.error('Form submission failed!');
            }

        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='user-form'>
            <div className='heading'>
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>User Form</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={user.title}
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
                        value={user.description}
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        className="form-control"
                        id="status"
                        name="status"
                        value={user.status}
                        onChange={handleInput}
                    >
                        <option value="">Select Status</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={user.firstName}
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
                        value={user.lastName}
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="timeZone" className="form-label">Time Zone</label>
                    <select
                        className="form-control"
                        id="timeZone"
                        name="timeZone"
                        value={user.timeZone}
                        onChange={handleInput}
                    >
                        <option value="">Select Time Zone</option>
                        <option value="Asia/Kolkata">Asia/Kolkata</option>
                        <option value="America/New_York">America/New_York</option>
                        <option value="Europe/London">Europe/London</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="isActive" className="form-label">Active User</label>
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        checked={user.isActive}
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
                        value={user.createdAt}
                        onChange={handleInput}
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
                        value={user.updatedAt}
                        onChange={handleInput}
                        readOnly
                    />
                </div>
                <button type="submit" className="btn btn-primary submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default CreateUser;
