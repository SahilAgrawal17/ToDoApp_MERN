import React, {useState, useEffect} from "react";
import axios from 'axios';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';

export default function Home() {
    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('');

    const getNotes = async (token) =>{
        const res = await axios.get('http://localhost:5000/api/notes', {
            headers: {Authorization: token}
        })
        console.log(res)
        setNotes(res.data)
    }

    useEffect(()=>{
        const token = localStorage.getItem('tokenStore')
        setToken(token)
        if(token){
            getNotes(token)
        }
    }, [])

    const deleteNote = async (noteid) => {
        try {
            if (token){
                await axios.delete(`http://localhost:5000/api/notes/${noteid}`, {
                    headers: {Authorization: token}
                })
                getNotes(token)
            }
        } catch (error) {
            window.location.href = "/";
        }
    }

    return (
        <div className="homepage-container">
            {
                notes.map((note)=>(
                    <div className="card-wrapper" key={note._id}>
                    <div className="card-title">{note.title}</div>
                    <div className="card-content">{note.content}</div>
                    <div className="card-date">{new Date(note.date).toLocaleString().split(',')[0]}</div>
                    <div className="card-buttons">
                        <ButtonGroup variant="outlined">
                        <Button onClick={() => deleteNote(note._id)}>Delete Note</Button>
                        <Button><Link to={`edit/${note._id}`}>Edit</Link></Button>
                        </ButtonGroup>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}