import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Common.css";

export default function Header() {
    const navigate = useNavigate();

    const handleDeleteUser = async () => {
        const userId = 3; // Set this to the ID of the user you want to delete

        try {
            await axios.delete(`http://localhost:8080/api/user/${userId}`);
            // Optionally, redirect or update UI after successful deletion
            navigate("/show-user"); // Redirect to a page that shows the list of users or home
        } catch (error) {
            console.error("Error deleting user:", error);
            // Optionally, handle the error (e.g., show an error message)
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" href="#">
                        <span className="navbar-text">React CRUD</span>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mynavbar"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create-user">
                                    Create Task
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/show-user">
                                    Show Task&User
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/users/3">
                                    Update User
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDeleteUser}
                                >
                                    Delete User
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
