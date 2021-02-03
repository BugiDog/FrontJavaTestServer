import React, { useEffect, useState } from 'react';
import TagItem from './TagItem';


function AddTags({ tagsArr, setTagsArr, setData, searchQuery }) {

  const token = sessionStorage.getItem('token')
  const [tagName, setTagName] = useState(null);

  const handlClick = () => {
    const url = `http://localhost:8082/addTag?searchQuery=${searchQuery}`
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
          setData(item.noteList)
          setTagsArr(item.tagList)
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
        <input onChange={inputCange} value={tagName} />
        <button onClick={handlClick}>
          Добавить тэг
      </button>
      </div>
      <div>
        {tagsArr && tagsArr.map(item => <TagItem key={item.id} item={item}
          setTagsArr={setTagsArr}
          setData={setData}
          searchQuery={searchQuery}
        />)}
      </div>

    </div>
  );
}

export default AddTags;
