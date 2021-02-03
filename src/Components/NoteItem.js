import React, { useState, useEffect } from 'react';


function NoteItem({ data, setData,searchQuery}) {
  console.log(data);
  const [change, setChenge] = useState(false)
  const [Pinned2, setPinned2] = useState(data.isPinned)
  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)
  const [tagsArray, setTagsArray] = useState(null)

  useEffect(()=>{
    const newTagsArr = data.tagsArray.map((item) => {
      return {
        ...item
      }
    })
    
    //console.log('rez',newTagsArr);
    setTagsArray(newTagsArr)
  },[data])

  const handlClick = () => {
    const url = `http://localhost:8082/deleteNote?id=${data.id}&searchQuery=${searchQuery}`
    fetch(url)
      .then(res => res.json())
      .then(item => {
        console.log(item.token)
        setData(item)
      })

  }

  const handlClick2 = () => {
    setChenge(true)
  }

  const changePinned = () => {
    const url = `http://localhost:8082/pinNote?id=${data.id}&searchQuery=${searchQuery}`
    fetch(url)
      .then(res => res.json())
      .then(item => {
        console.log(item)
        setData(item)
      })
  }
  const changePinned2 = () => {
    setPinned2(!data.isPinned)
  }

  const titleChange = (event) => {
    setTitle(event.target.value)
  }
  const descriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const handlClick3 = () => {
    const url = `http://localhost:8082/editNote?searchQuery=${searchQuery}`
    const newNote = {
      "id": data.id,
      "userToken": sessionStorage.getItem('token'),
      title,
      description,
      "isPinned": Pinned2,
      activeTagsArray: tagsArray.filter(item =>item.isActive).map(item=>item.id)

    }
    if (sessionStorage.getItem('token') != null) {
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(newNote)
      })
        .then(res => res.json())
        .then(item => {
          console.log(item)
          setData(item)
        })
    }
    setChenge(false)
  }

  const changeAddNoteTag = (item) => {
    const rez = tagsArray.map(item2=>{
     // console.log("item2.id",item2);
      //console.log("item.id",item.id);
      console.log("-------------------");
      if(item2.id === item.id ){
        item2.isActive=!item2.isActive
      }
      return item2
    })
   // console.log('rez',rez);
    setTagsArray(rez)
  }

 

 

  return (
    <div className="note">
      {change && <div>
        <div>title</div>
        <input value={title} onChange={titleChange} />
        <div>description</div>
        <input value={description} onChange={descriptionChange} />
        <input type="radio" checked={Pinned2} onClick={changePinned2} />
        { tagsArray && tagsArray.map(item=>{
         // console.log("item2.id",item);
            return (
              <div key={item.id} className={ item.isActive ? 'activ_tag' : 'not_activ_tag' } onClick={()=>{changeAddNoteTag(item)}} >
                {item.name}
              </div>)
   
        }) 
        } 
        <button onClick={handlClick3}>
          Сохранить
        </button>
      </div>}
      {!change && <div >
        <div>{`ID: ${data.id}`}</div>
        <div>{`title: ${data.title}`}</div>
        <div>{`description: ${data.description}`}</div>
        <input type="radio" checked={data.isPinned} onClick={changePinned} />
        
        { tagsArray && tagsArray.map(item=>{
          //console.log("item2.id",item);
          if(item.isActive){
            return (
              <div key={item.id} className='activ_tag' >
                {item.name}
              </div>)
          }
             
        }) 
        }     
          
        
      
        
      </div>}

      <button onClick={handlClick}>
        Удалить заметку
      </button>
      <button onClick={handlClick2}>
        Изменить заметку
      </button>
    </div>
  );
}

export default NoteItem;