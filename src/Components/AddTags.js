import React, { useEffect, useState } from 'react';
import TagItem from './TagItem';


function AddTags({tagsArr, setTagsArr}) {

  const token = sessionStorage.getItem('token')
  const [tagName, setTagName] = useState(null);

  const handlClick = () => {
    const url = 'http://localhost:8082/addTag'
    const newNote = {
      "userToken": token,
      "name": tagName,
      "isActive": false
    }
    if (token != null) {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(newNote)
      })
        .then(res => res.json())
        .then(item => {
          console.log(item)
          setTagsArr(item)
        })
    }
    setTagName("")
  }



  const inputCange = (event) => {
    setTagName(event.target.value)
  }



  return (
    <div className="App">
      <div>
        <input onChange={inputCange} value={tagName}/>
        <button onClick={handlClick}>
          Добавить тэг
      </button>
      </div>
      <div>
        {tagsArr && tagsArr.map(item => <TagItem key={item.id} item={item} setTagsArr={setTagsArr} />)}
      </div>

    </div>
  );
}

export default AddTags;
