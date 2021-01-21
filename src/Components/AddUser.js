import React from 'react';

function AddUser({setTokenIsHere}) {
  const url ='http://localhost:8082/addUser'
  const handlClick = () =>{
    fetch(url)
    .then(res=>res.json())
    .then(item=>{
      console.log(item)
      sessionStorage.setItem('token',item.token)
      setTokenIsHere(item.token)
    })

  }

  return (
    <div className="App">
      <button onClick={handlClick}>
          Добавить пользователя 
      </button>
    </div>
  );
}

export default AddUser;
