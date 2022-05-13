import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import './App.css';
import { useAuth } from './context/AuthContext';
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Login from './pages/Auth/Login';
import RecoverPassword from "./pages/Auth/RecoverPassword";
import Signup from "./pages/Auth/Signup";
import Products from './pages/Products/Products';

interface PrivateRouteProps {
    requiredRoles: any;
    loggedIn: boolean,
    exact: boolean,
    path: string,
}


function App() {

    const { isUserLoggedIn, currentUser } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <Routes>
                {isUserLoggedIn && currentUser !== null ?
                    <>
                        <Route path="/" element={<Products />} />
                    </>
                    :
                    <>
                        <Route path="/" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/forgotPassword" element={<ForgotPassword />} />
                    </>}
                    <Route path="/recoverPassword/:token" element={<RecoverPassword />} />
            </Routes>
        </div>
    );
}

export default App;
