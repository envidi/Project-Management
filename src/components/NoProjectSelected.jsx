import React from 'react'
import Button from 'react-bootstrap/Button';
import LinkRouter from './LinkRouter';

function NoProjectSelected() {
  return (
    <>
        <h2>
            No  Project selected
        </h2>
        <span>Select a project or get started with a new one </span>
        <Button className='mt-4' variant="secondary">           
            <LinkRouter to='/add-project'>
                Create project
            </LinkRouter>
        </Button>
   
    </>
  )
}

export default NoProjectSelected