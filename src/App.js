import React from "react";
import { Route, Routes } from "react-router-dom";
import UpdateUser from './components/Users/UpdateUser';
import CreateUser from "./components/User/CreateUser";
import ShowUser from "./components/User/ShowUser";
import EditUser from "./components/User/EditUser";
import User from "./components/User/User";
import Header from "./components/Common/Header";
import Home from "./components/Layout/Home";
import EditTask from './components/User/EditUser'
import ShowUsers from "./components/Users/ShowUsers";
import 'bootstrap/dist/css/bootstrap.min.css'
function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/create-user" element={<CreateUser />} />
            <Route path="/show-user" element={<ShowUser />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
            <Route path="/update-user/:id" element={<UpdateUser />} />
            <Route path="/users/:id" element={<UpdateUser />} />
            <Route path="/users/:userId" element={<Header />} />
            <Route path="/show-users" element={<ShowUsers />} />








          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
