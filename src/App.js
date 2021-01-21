import React, { useEffect, useState } from 'react';
import './style.css';
import AddUser from './Components/AddUser';
import UserList from './Components/UserList';
import AddNote from './Components/AddNote';
import AddTags from './Components/AddTags';

function App() {
  const [data, setData] = useState(null)
  const [tagsArr, setTagsArr] = useState(null);
  const [tokenIsHere, setTokenIsHere] = useState(null);
  const token = sessionStorage.getItem('token')
  useEffect(() => {
    if (token != null) {
      const url = `http://localhost:8082/loadTagList?token=${token}`
      fetch(url)
        .then(res => res.json())
        .then(item => {
          console.log("loadTagList");
          console.log(item);
          setTagsArr(item)
           
        })
    }

    if (token != null) {
      const url = `http://localhost:8082/loadNoteList?token=${token}`
      fetch(url)
        .then(res => res.json())
        .then(item => {
          console.log("loadNoteList");
          console.log(item);
          setData(item)
          
        })
    } 
  }, [tokenIsHere])




  return (
    <div className="App">
      {<AddUser setTokenIsHere={setTokenIsHere} />}
      {!!tagsArr && <AddTags tagsArr={tagsArr} setTagsArr={setTagsArr} />}
      {!!data && <UserList data={data} setData={setData} />}
      { !!tagsArr && <AddNote setData={setData} tagsArr={tagsArr}/>}
    </div>
  );
}

export default App;
