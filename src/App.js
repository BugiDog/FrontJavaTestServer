import React, { useState } from 'react';
import './style.css';
import AddUser from './Components/AddUser';
import UserList from './Components/UserList';
import AddNote from './Components/AddNote';

function App() {
  const [data,setData] = useState(null)
  const token = sessionStorage.getItem('token')

  return (
    <div className="App">
      {<AddUser />}
        { <UserList data={data} setData={setData}/>}
        {<AddNote  setData={setData}/>}
    </div>
  );
}

export default App;
