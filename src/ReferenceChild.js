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
            <img 
            src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
         // src={require(`${data.image}`)}
            //src={require(`C:/Users/User/Desktop.download.jpg`)}
          //alt={logo} 
          />;
            <button onClick={handleDelete}>Supprimer</button>
            
        </div>
    )
}

export default ReferenceChild;