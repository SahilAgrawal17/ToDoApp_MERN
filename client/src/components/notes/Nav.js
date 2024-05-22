import React from "react";
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Nav(setIsLogin) {

    const logoutSubmit = () => {
        localStorage.clear()
        setIsLogin(false)
    }

    const refreshPage = () => {
        window.refreshPage()
    }

    return (
        <header className="navbar">
            <div className="logo">
                <h1><Link to="/" onClick={refreshPage}>To Do App</Link></h1>
            </div>
            <ButtonGroup variant="text" aria-label="text button group" className="navbuttons">
                <Button><Link to="/" onClick={refreshPage}>Home</Link></Button>
                <Button><Link to="/create">Add a new Note</Link></Button>
                <Button><Link onClick={logoutSubmit} to="/">Logout</Link></Button>
            </ButtonGroup>
        </header>
    )
}