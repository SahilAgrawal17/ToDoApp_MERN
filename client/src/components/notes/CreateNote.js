import React, {useState} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function CreateNote() {
    const [note, setNote] = useState({title: '', content: '', date:''})
    const [err, setErr] = useState('')

    const onChangeInput = e => {
        const { name, value } = e.target;
        setNote({...note, [name]:value})
    }

    const CreateNote = async e => {
        e.preventDefault()
        const token = localStorage.getItem('tokenStore')
        try {
            const res = await axios.post('http://localhost:5000/api/notes', {
                title: note.title,
                content: note.content,
                date: note.date
            }, {
                headers: {Authorization:token}
            })
            setErr(res.data.message)
            setTimeout(()=>{
                window.location.replace('/'); 
            },1500)
        } catch (err) {
            err.response.data.message && setErr(err.response.data.message)
        }
    }


    return (
        <div className="createnote-background">
           <Card className="createnote-cardcontainer">
                <CardContent >
                    <h1>Create a new Note</h1>
                    <form onSubmit={CreateNote} className="createnote-container">
                    <input type="text" name="title" id="title" placeholder="Note Title"
                    required value={note.title} onChange={onChangeInput}/>

                    <textarea className="content" name="content" rows="10" columns="50" placeholder="Write here..."
                    required value={note.content} onChange={onChangeInput}></textarea>
                    
                    <input type="date" name="date" id="date"
                    required value={note.date} onChange={onChangeInput}/>
                    <h1>{err}</h1>
                    
                    <button type="submit" className="clicker1">Create Note</button>
                    
                    <button><Link to="/">Cancel</Link></button>
                    </form>                   
                </CardContent>
           </Card>
        </div>
    )
}