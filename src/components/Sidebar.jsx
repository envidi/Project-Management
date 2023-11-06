import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import LinkRouter from './LinkRouter';


function Sidebar({show,handleClose,dataProject,getIdProject}) {
  const [active,setActive] = useState(undefined)
  return (
    <Offcanvas show={show} onHide={handleClose}>
       
    <Offcanvas.Header closeButton>
      
      <Offcanvas.Title>Sidebar</Offcanvas.Title>
    </Offcanvas.Header>
    <Button style={{width:"150px",marginLeft:'15px'}}  variant="secondary">           
          <LinkRouter to='/add-project'>
              Create project
          </LinkRouter>
        </Button>
    <Offcanvas.Body>
   
    <ListGroup as="ul">
    
        {
            dataProject.map((data,index)=>{
                return (
                    <ListGroup.Item active={(active ?? dataProject[0].id) === data.id} onClick={()=>{getIdProject(data.id),setActive(data.id)}} key={index} data-id={index} as="li">{data.title}</ListGroup.Item>    
                )
            })
        }
      
      
    </ListGroup>
    </Offcanvas.Body>
  </Offcanvas>
  )
}

export default Sidebar