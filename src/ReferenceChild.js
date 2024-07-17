import *as React from 'react'
import './App.css';

const ReferenceChild=({data})=>{
  console.log('data chiuld is ' ,data)
    return(
        <div className="ChildRef">

            <h1>{data.name}</h1>
            <h2>{data.site}</h2>
            <button>Supprimer</button>
            
        </div>
    )
}

export default ReferenceChild;