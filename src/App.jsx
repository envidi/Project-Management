import { useState,useRef  } from 'react'
import { Routes, Route, Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import './App.css'

import Main from './components/Main'
import HomeLayout from './layouts/HomeLayout';
import AddProject from './components/AddProject';


function App() {
  const idRef = useRef()
  const navigate = useNavigate()
  const [dataProject, setDataProject] = useState([])

  const handleProject = (data)=>{
    setDataProject(prev=>{
      return [...prev,{...data,tasks:[]}]
    })
    
  }
  const handleDeleteProject = (id)=>{    
    setDataProject(prev=>{
      const newArr = [...prev]
      const prevId = newArr[0].id         
      const newData = newArr.filter(singlePro=>singlePro.id !== (id ?? prevId)) 
      return newData
    })
  }
  const handleCreateTask = (data)=>{
    if(!data)return
    setDataProject(prev=>{
      const newArr = [...prev]
      const newData = newArr.map(singlePro=>{
        
        if(singlePro.id === (idRef.current ?? dataProject[0].id)){
          return {...singlePro,tasks:[...singlePro.tasks,data]}
        }
        return singlePro
      })
      return newData
     
    })
  }
  const handleEditTask = (data)=>{
    if(!data)return
    setDataProject(prev=>{
      const newArr = [...prev]
      const newData = newArr.map(singlePro=>{
        
        if(singlePro.id === (idRef.current ?? dataProject[0].id)){
          const newTasks = singlePro.tasks.map(task=>{
            
            if(task.id === data.id){              
              return {
                ...data
              }
            }          
            return task
          })
          
          return {...singlePro,tasks:newTasks}
        }
        return singlePro
      })
      return newData
     
    })
  }
  const handleDeleteTask = (id)=>{
    if(id && typeof id !== "string")return
    
    setDataProject(prev=>{
      const newArr = [...prev]
      const newData = newArr.map(singlePro=>{
        
        if(singlePro.id === (idRef.current ?? dataProject[0].id)){
          const newTask = singlePro.tasks.filter(task=>task.id !== id)
          return {...singlePro,tasks:[...newTask]}
        }
        return singlePro
      })
      return newData
    })
  }
  const getIdProject = (id)=>{
    if(!id )return   
    idRef.current = id
    navigate('/')
  }

  return (
    <Routes>
    <Route path="/" element={<HomeLayout getIdProject={getIdProject} dataProject={dataProject} />}>
      <Route index element={
      <Main 
      ref={idRef} 
      handleDeleteTask={handleDeleteTask} 
      handleCreateTask={handleCreateTask} 
      handleDeleteProject={handleDeleteProject} 
      handleEditTask={handleEditTask}  
      dataProject={dataProject} 
      />} 
      />
      <Route path='add-project' element={<AddProject  handleProject={handleProject}  />} />
      

   
    </Route>
  </Routes>
  )
}

export default App
