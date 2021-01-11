import React, { useState } from 'react';

function AddNote({setData}) {

  const token = sessionStorage.getItem('token')
  const url =`http://localhost:8082/addNote`


  const [title,setTitle] = useState(null);
  const [description,setDescription] = useState(null);
  const [isPinned, setIsPinned] = useState(false)


  const hendlClick = () =>{
    const newNote={
      "userToken":token,
      title,
      description,
      "isPinned":isPinned
    }
    if (token!=null){
      fetch(url,{
      method: 'POST',
      body: JSON.stringify(newNote)
    })
    .then(res=>res.json())
    .then(item=>{
      console.log(item)
      setData(item)
    })
    }
  }


  const chengePinned = () =>{setIsPinned(prev => !prev)}
  const inputSetTitle = (event) => setTitle(event.target.value)
  const inputSetDescription = (event) => setDescription(event.target.value)

  return (
    <div className="App">
      <input onChange={inputSetTitle} placeholder="Введите название заметки"/>
      <input onChange={inputSetDescription} placeholder="Введите заметку"/>
      <input type="checkbox"  onChange={chengePinned}/>
      <button onClick={hendlClick}>
          Добавить заметку
      </button>

    </div>
  );
}

export default AddNote;
