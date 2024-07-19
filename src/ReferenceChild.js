import *as React from 'react'

const ReferenceChild=({data,onDelete})=>{
  console.log('data chiuld is ' ,data)

  const handleDelete = () => {
    onDelete(data.name);
  };
    return(
        <div className="ChildRef">

            <h1>{data.name}  ---  {data.site}</h1>
            <button onClick={handleDelete}>Supprimer</button>
            
        </div>
    )
}

export default ReferenceChild;