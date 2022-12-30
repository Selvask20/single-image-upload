import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const[filename,setfilename]=useState('')
  const[getdata,setgetdata]=useState([])
  const[up,setup]=useState()
  const changefile=(e)=>{
    setfilename(e.target.files[0])
  }
  const clk=(e)=>{
    e.preventDefault()
   if(filename.length===0){
    alert("Input file then Upload")
   }else{
    const formdata= new FormData();
    formdata.append('file',filename);

    axios.post('http://localhost:7000/',formdata).then(()=>alert("uploaded"))
    // 
    setfilename('')
   }}

  useEffect(()=>{
    axios.get('http://localhost:7000/').then((res)=>{
     setgetdata(res.data)
    },[getdata])
  })
  const update=(e)=>{
    setup(e.target.files[0])

  }
  const clk1=(id)=>{
     const formdata= new FormData();
    formdata.append('file',up);
   axios.post(`http://localhost:7000/${id}`,formdata).then(()=>alert("updated"))
  }

  const del=(id)=>{
    axios.delete(`http://localhost:7000/${id}`).then(()=>alert("deleted"))
  }
  

  const serverhost='http://localhost:7000/'
  
  return (
    <div>
      <h1>Upload Image</h1>
      <form onSubmit={clk}>
      <input type='file'  onChange={changefile} ></input>
      <button type='submit'>Submit</button>
      <input type='reset'></input>
      </form>

       {getdata.map((file,index)=>
       <figure key={index}>
        <img src={serverhost+file.filename} style={{width:"10em",height:"10em"}} alt='getimages' /> 
       <input type="file" onChange={update}></input>
       <button onClick={()=>clk1(file._id)}>submit</button>
       <button onClick={()=>del(file._id)}>delete</button>
       </figure>)}
    </div>
  )
}

export default App
