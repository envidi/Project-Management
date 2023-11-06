import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LinkRouter from './LinkRouter'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AddProject({handleProject}) {
    const [form,setForm] = useState({
        id:'',title:"",description:""
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(form.title === "" && form.description === "")return
        handleProject(form)
        setForm({id:'',title:"", description: ""})
        handleShow()
    }    

    const handleChange = (e)=>{
        const target = e.target  
        const value = target.value
        const name = target.name
        setForm(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
  return (
    <>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Successfull</Modal.Title>
        </Modal.Header>
        <Modal.Body>Add project successfull!</Modal.Body>
        <Modal.Footer>
        
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label  className="form-label">Id</label>
            <input name="id"  type="text" value={form.id} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
            <label  className="form-label">Title</label>
            <input name="title" style={{width : "260px"}} type="text" value={form.title} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
            <label  className="form-label">Description</label>
            <textarea name="description" className="form-control" value={form.description} onChange={handleChange}  rows="3"></textarea>
        </div>
        <div className="mb-3">
            <label  className="form-label">Due Date</label>
            <input name="date" type="date" className="form-control"  onChange={handleChange} />
        </div>
       
        <button type="submit" className="btn btn-primary">Submit</button>
        <button  type="submit" className="btn btn-primary ms-3">
            <LinkRouter to='/'>
                Home
            </LinkRouter>
        </button>
    </form>
   
    </>
  )
}

export default AddProject