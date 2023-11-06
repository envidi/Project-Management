import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from 'react-bootstrap/Button';
import LinkRouter from './LinkRouter';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import NoProjectSelected from './NoProjectSelected';



const Main = forwardRef(function Main({
    dataProject,
    handleDeleteProject,
    handleCreateTask,
    handleDeleteTask,
    handleEditTask
    },ref) {
    const [form,setForm] = useState()
    const [isEdit , setIsEdit] = useState(false)
    const inputRef = useRef()
    const getSingleProject = dataProject.find(project=>{
        return project.id === ref.current
      }) || dataProject[0] 
    //   console.log(getSingleProject)
    //   console.log(dataProject)
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
      const handleEdit = (id)=>{          
        if(!id && typeof id !== "string")return
                            
        const newArrs = [...getSingleProject.tasks.map(task=>task)]            
        const editObjectTask = newArrs.find(newArr=>{
            return newArr.id === id
        })
        setForm(editObjectTask)
        inputRef.current.value = editObjectTask.name
        
        // handleEditTask(form,id)
      }
      const handleSubmitTask = ()=>{
        if(isEdit){

            setForm({id:form.id , name:form.name})
            setIsEdit(false)
            handleEditTask(form)
        }
      }
     
    if(!getSingleProject){
        return (
           <NoProjectSelected/>
          )
    }
    return (
        <>
           
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{getSingleProject.title}</Card.Title>
                    <Card.Text>
                    {getSingleProject.description}
                    </Card.Text>
                    <Card.Link href="#">{getSingleProject.date}</Card.Link>
                    <Button onClick={()=>handleDeleteProject(getSingleProject.id)} className='ms-3' variant="danger">Delete</Button>
                    
                </Card.Body>
            </Card>
            <hr style={{width:"70%"}} />
            <h3>Tasks</h3>
            <Form >
                <Row className="align-items-center">
                    <Col sm={3} className="my-1">
                    
                    <Form.Control ref={inputRef} style={{width : "230px"}}  name='name' onChange={handleChange} placeholder="Jane Doe" />
                    </Col>
                    <Col sm={3} className="my-1">
                    <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                        Username
                    </Form.Label>
                    
                    </Col>
                
                    <Col xs="auto" className="my-1 ms-5">
                    <Button 
                    onClick={()=>
                    {isEdit ? handleSubmitTask(): handleCreateTask({id : uuidv4(),...form}) ;inputRef.current.value = '' }
                    } 
                    >
                     {isEdit ? "Edit task":"Add task"} 
                    </Button>
                    </Col>
                </Row>
            </Form>
            <Table striped bordered hover style={{width:"400px",marginTop:"20px",marginBottom:"130px"}}>
            <thead>
                <tr>
                <th>Id</th>
                <th>Task</th>
                <th colSpan={2}>Action</th>
                
                </tr>
            </thead>
            <tbody>
                {
                    getSingleProject.tasks.map((task,index)=>{
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td style={{width:"200px"}}>{task.name}</td>
                                <td onClick={()=>{
                                    setIsEdit(true)
                                   handleEdit(task.id)
                                }}>Edit</td>
                                <td onClick={()=>{handleDeleteTask(task.id);setIsEdit(false)}}>Delete</td>
                            </tr>
                        )
                    })
                }
               
            
            </tbody>
            </Table>
        </>
    )
  
})

export default Main