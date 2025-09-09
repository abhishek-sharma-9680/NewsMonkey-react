import React from 'react'
import Ajax from './Ajax-loader.gif'
const Spinner=()=>{
 
    return (
      <div className='text-center'>
        <img src={Ajax} alt="loading" />
      </div>
    )
  
}

export default Spinner
