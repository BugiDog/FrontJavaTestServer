import React from 'react';

function AddUser() {
  const url ='http://localhost:8082/addUser'
  const hendlClick = () =>{
    fetch(url)
    .then(res=>res.json())
    .then(item=>{
      console.log(item.token)
      sessionStorage.setItem('token',item.token)
    })

  }

  return (
    <div className="App">
      <button onClick={hendlClick}>
          Добавить пользователя 
      </button>
    </div>
  );
}

export default AddUser;
