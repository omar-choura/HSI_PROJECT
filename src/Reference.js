import  React,{useState,useEffect} from 'react'
import apiURL from './apiURL';
import axios from 'axios'
import ReferenceChild from './ReferenceChild';
const Reference=()=>{
      const [listReference,setListReference]=useState([])


    const getReferences=async()=>{
        
        try{
         const result = await axios.get(`${apiURL}/reference/getAllReferences`)
         setListReference(result.data.list)
        }catch(err){
            console.log("Errreur get reférences is  ",err)
            alert("Erreur serveur")
        }
    }
   
    useEffect(()=>{
       getReferences()
    },[])

    return(
        <div>
            
            <h1>La liste des références </h1>
            
          {listReference.map((ele,index)=>(
            <div><ReferenceChild data={ele}/></div>
          ))}
            <button>Ajouter reference</button>
        </div>
    )
}

export default Reference;