import { useState, useEffect, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import axios from "axios";
axios.defaults.baseURL = "https://todo-back-3ptp.onrender.com"

import Index from "./routes/Index";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Error404 from "./routes/Error404";

export const Source = createContext({})
function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={<Error404 />} />
            </Routes>
        </>
    );
}

export default App;
