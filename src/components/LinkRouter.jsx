import React from 'react'
import { Link } from 'react-router-dom'
function LinkRouter({children,to}) {
  return (
    <Link style={{textDecoration:'none',color:'white'}} to={to}>
        {children}
    </Link>
  )
}

export default LinkRouter