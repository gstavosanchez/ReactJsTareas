import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'//npm install timeago.js
import { Link } from 'react-router-dom'

export default class NotesList extends Component {
    state = {
        notes:[]
    }

    componentDidMount() {
       this.getNotes();
        
    }

    async getNotes(){
        const res  = await axios.get('http://localhost:4000/api/notes/')
        this.setState({notes:res.data})
    }

    styleDate(){
        return{
            color:'#C3BFBE '
        }
    }


    deteNote = async (id) =>{
        await axios.delete(`http://localhost:4000/api/notes/${id}`);
        this.getNotes();
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>
                                    <Link className="btn btn-outline-dark" to={`/edit/${note._id}`}>
                                        Editar
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>{note.content}</p>
                                    <p><strong>{note.author}</strong> </p>
                                    <p style={this.styleDate()}>{format(note.date)}</p>
                                    
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={()=> this.deteNote(note._id)}>
                                        Eliminar
                                    </button>                                    
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
