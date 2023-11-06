import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'
import { Outlet } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
function HomeLayout({dataProject,getIdProject}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div style={{marginTop:'60px'}} className='d-flex flex-column align-items-center '> 
        <Button className='mb-3' variant="primary" onClick={handleShow}>
            Open Side Bar
        </Button> 
        <Sidebar getIdProject={getIdProject} dataProject={dataProject} show={show} handleClose={handleClose}/>
        <Outlet />
    </div>
  )
}

export default HomeLayout