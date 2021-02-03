import React from 'react';


function TagItem({item,setTagsArr, setData, searchQuery }) {
  
  //console.log("item:",item.id,"=====", item);
  const handlClick = () =>{
    const url =`http://localhost:8082/deleteTag?id=${item.id}&searchQuery=${searchQuery}`
    fetch(url)
    .then(res=>res.json())
    .then(item=>{
      console.log(item)
      setData(item.noteList)
      setTagsArr(item.tagList)
    })

  }

  const changaisActive = () =>{
    const url =`http://localhost:8082/changeTagStatus?id=${item.id}&searchQuery=${searchQuery}`
    fetch(url)
    .then(res=>res.json())
    .then(item=>{
      console.log(item)
      setData(item.noteList)
      setTagsArr(item.tagList)
    })
  }

  return (
    <div className={ item.active ? 'activ_tag' : 'not_activ_tag' } >
        <label onClick={changaisActive}>
        {item.name}
        </label>
      <button onClick={handlClick} className="del_butt">
          
      </button>
    </div>
  );
}

export default TagItem;
