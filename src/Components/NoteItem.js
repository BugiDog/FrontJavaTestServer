import React from 'react';

function NoteItem({data, setData}) {
    const token = sessionStorage.getItem('token')
  const hendlClick = () =>{
    const url ='http://localhost:8082/addUser'
    fetch(url)
    .then(res=>res.json())
    .then(item=>{
      console.log(item.token)
      sessionStorage.setItem('token',item.token)
    })

  }

  const chengePinned =() =>{
    const url =`http://localhost:8082/pinNote?id=${data.id}&token=${token}`
    fetch(url)
    .then(res=>res.json())
    .then(item=>{
      console.log(item)
      setData(item)
    })
  }

  return (
    <div>
     <div>{`ID: ${data.id}`}</div>
     <div>{`title: ${data.title}`}</div>
     <div>{`description: ${data.description}`}</div>
     <input type="radio" checked={data.isPinned} onClick={chengePinned}/>
    </div>
  );
}

export default NoteItem;