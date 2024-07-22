import *as React from 'react'
import logo from "./imageErr.png"
const ReferenceChild=({data,onDelete})=>{
 
console.log()
  const handleDelete = () => {
    onDelete(data.name);
  };
    return(
        <div className="ChildRef">

            <h1>{data.name}  ---  {data.site}</h1>
            <h2>{data.image}</h2>
            <img 
          
        src={`http://localhost:5555/photos/${data.image}`} />
          
            <button onClick={handleDelete}>Supprimer</button>
            
        </div>
    )
}

export default ReferenceChild;