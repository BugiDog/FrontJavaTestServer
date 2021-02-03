import React, { useState, useEffect } from 'react';
import NoteItem from './NoteItem';

function UserList({ data, setData, searchQuery }) {
    console.log("data", data);


    const [inputTocken, setInputTocken] = useState('')



    const handlClick2 = () => {
        sessionStorage.removeItem('token')
    }

    const handlClick3 = () => {
        sessionStorage.setItem('token', inputTocken)
    }

    const inputChange = (event) => {
        setInputTocken(event.target.value)
    }

    return (
        <div className="App">

            {/* <button onClick={handlClick2}>
                Удалить token
            </button>
            <button onClick={handlClick3}>
                Войти
            </button>
            <input onChange={inputChange} /> */}

            {   !!data && data.map(dataItem => <NoteItem key={dataItem.id}
                data={dataItem}
                setData={setData}
                searchQuery={searchQuery}
            />)

            }
        </div>
    );
}

export default UserList;
