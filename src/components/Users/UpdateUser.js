import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Common/Loader";
// import "./User.css";

const UpdateUser = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        timeZone: "",
        isActive: false,
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); // Extract id from URL parameters

    // URL for fetching and updating the user
    const userApiUrl = `http://localhost:8080/api/user/${id}`;

    useEffect(() => {
        // Fetch user details when the component mounts
        getUser();
    }, [id]);

    const getUser = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(userApiUrl);
            setUser(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setUser({
            ...user,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsLoading(true);

            const response = await axios.put(userApiUrl, {
                firstName: user.firstName,
                lastName: user.lastName,
                timeZone: user.timeZone,
                isActive: user.isActive
                
            });

            if (response.status !== 200) {
                throw new Error("Network response was not ok");
            }
            console.log("updated successfully")

            navigate(`/users/${id}`); 
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="user-form">
            <div className="heading">
                {isLoading && <Loader />}
                {error && <p>Error: {error}</p>}
                <p>Edit User Form</p>
            </div>
            <form onSubmit={handleSubmit}>
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
                        {/* Add more time zones as needed */}
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
                <button type="submit" className="btn btn-primary submit-btn">
                    Update
                </button>
            </form>
        </div>
    );
};

export default UpdateUser;
