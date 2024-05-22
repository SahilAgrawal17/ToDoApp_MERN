import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default function EditNote() {
    const [note, setNote] = useState({title: '', content:'', date:'', id:''})
    const [err, setErr] = useState('')
    const url = window.location.href;
    const id = url.split('/')[4]

    useEffect(()=> {
        const getNote = async ()=> {
            const token = localStorage.getItem('tokenStore')
            if(id){
                const res = await axios.get(`http://localhost:5000/api/notes/${id}`, {
                    headers:{Authorization: token}
                })
                setNote({
                    title: res.data.note.title,
                    content: res.data.note.content,
                    date: res.data.note.date,
                    id:res.data.note._id
                })
            }
        }
        getNote();
    }, [url,id])

    const onChangeInput = e => {
        const { name, value } = e.target;
        setNote({...note, [name]:value})
    }

    const clearData = () =>{
        setNote({title: '', content:'', date:'', id:''})
    }

    const updateNote = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('tokenStore')
        try {
            if(!note.content || !note.title || !note.date){
                setErr('Fill out all details')
            }
            else{
            const res = await axios.put(`http://localhost:5000/api/notes/${id}`, {
                title: note.title,
                content: note.content,
                date: note.date,
            }, {
                headers: {Authorization:token}
            })
            setErr(res.data.message)
            setTimeout(()=>{
                window.location.replace('/'); 
            },1500)
        }
        } catch (err) {
            err.response.data.message && setErr(err.response.data.message)
        }
    }

    return (
        <div className="editnote-background">
            <Card className="editnote-cardcontainer">
                <CardContent >
                <h1 className="heading">Edit Note</h1>
                    <form  className="editnote-container">
                        <input type="text" name="title" id="title" placeholder="Note Title"
                            required value={note.title} onChange={onChangeInput} />

                        <textarea className="content" name="content" rows="10" columns="50" placeholder="Write here..."
                            required value={note.content} onChange={onChangeInput}></textarea>

                        <input type="date" name="date" id="date"
                            required value={note.date} onChange={onChangeInput} />
                        <h1>{err}</h1>

                        <button type="submit" className="clicker1" onClick={updateNote}>Update Note</button>
                        <button onClick={clearData} className="clicker2">Clear Note</button>
                        <button><Link to="/">Cancel</Link></button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}