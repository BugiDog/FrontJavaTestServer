import React, { useState, useEffect } from 'react';

function AddNote({ setData, tagsArr }) {

  const token = sessionStorage.getItem('token')
  const url = `http://localhost:8082/addNote`


  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [isPinned, setIsPinned] = useState(false)
  const [activTagsArray, setXui] = useState(null)

  useEffect(()=>{
    const govno = tagsArr.map((item) => {
      return {
        ...item,
        isActive: false
      }
    })
    
    console.log('rez',govno);
    setXui(govno)
  },[tagsArr])



  // useEffect(() => {
  //   const url = `http://localhost:8082/loadTagList?token=${token}`
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(item => {
  //       const rez = item.map(element => {
  //         element.isActive = false
  //         return element
  //       })
  //       setXui(rez)
  //     })
  // }, [tagsArr])


  const handlClick = () => {
 
    const newNote = {
      userToken: token,
      title,
      description,
      isPinned,
      activeTagsArray: activTagsArray.filter(item =>item.isActive).map(item=>item.id)
    }
    console.log("newNote",newNote);
    console.log("newNoteJSON",JSON.stringify(newNote));
    if (token != null) {
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
    setDescription("")
    setTitle("")
  }

  const changeAddNoteTag = (item) => {
    const rez = activTagsArray.map(i=>{
      if(i.id === item.id ){
        i.isActive=!i.isActive
      }
      return i
    })
    console.log('rez',rez);
    setXui(rez)
  }


  const chengePinned = () => { setIsPinned(prev => !prev) }
  const inputSetTitle = (event) => setTitle(event.target.value)
  const inputSetDescription = (event) => setDescription(event.target.value)

  return (
    <div className="App">
      <input onChange={inputSetTitle} placeholder="Введите название заметки" value={title} />
      <input onChange={inputSetDescription} placeholder="Введите заметку" value={description} />
      <input type="checkbox" onChange={chengePinned} />
      <div className='flex'>
        {activTagsArray && activTagsArray.map((item) => {
          return (
            <div key={item.id} className={ item.isActive ? 'activ_tag' : 'not_activ_tag' } onClick={()=>{changeAddNoteTag(item)}} >
              {item.name}
            </div>

          )
        })}
      </div>
      <button onClick={handlClick}>
        Добавить заметку
      </button>

    </div>
  );
}

export default AddNote;
