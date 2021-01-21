import React from 'react';


function TagItem({item,setTagsArr }) {
  
  
  const handlClick = () =>{
    const url =`http://localhost:8082/deleteTag?id=${item.id}`
    fetch(url)
    .then(res=>res.json())
    .then(item=>{
      console.log(item)
      setTagsArr(item)
    })

  }

  const changaisActive = () =>{
    const url =`http://localhost:8082/changeTagStatus?id=${item.id}`
    fetch(url)
    .then(res=>res.json())
    .then(item=>{
      console.log(item)
      setTagsArr(item)
    })
  }

  return (
    <div className={ item.isActive ? 'activ_tag' : 'not_activ_tag' } >
        <label onClick={changaisActive}>
        {item.name}
        </label>
      <button onClick={handlClick} className="del_butt">
          
      </button>
    </div>
  );
}

export default TagItem;
