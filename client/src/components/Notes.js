import React from "react";
import NavBar from './notes/Nav';
import Home from "./notes/Home";
import CreateNote from "./notes/CreateNote";
import EditNote from "./notes/EditNote";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

export default function Notes(setIsLogin){
    return (
        <div className="notes-page"> 
            <Router>
                <NavBar setIsLogin={setIsLogin}/> 
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/create" element={<CreateNote/>}/>
                    <Route path="/edit/:id" element={<EditNote match={'/:id'}/>}/>
                </Routes>
            </Router>
        </div>
    )
}