import React, { useState } from 'react';
import NoteItem from './NoteItem';

function UserList({data,setData}) {
    const token = sessionStorage.getItem('token')
    const url = `http://localhost:8082/loadNoteList?token=${token}`
    console.log(url);


    const hendlClick = () => {
        if (token!=null){
                  fetch(url)
            .then(res =>res.json())
            .then(item =>{
                setData(item)
                console.log(item);
            })  
        }

    }

    const hendlClick2 = () =>{
        sessionStorage.removeItem('token')
    }

    return (
        <div className="App">
            <button onClick={hendlClick}>
                Показать лист
            </button>
            <button onClick={hendlClick2}>
                Удалить token
            </button>
        {   !!data && data.map(dataItem=><NoteItem key={dataItem.id} data={dataItem} setData={setData}/>)

        }
        </div>
    );
}

export default UserList;
