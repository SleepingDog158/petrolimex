import React, {Component, useState} from 'react'

export const Search = ({onSearch}) => {
    const [search, setSearch] = useState('')
    
    const onInputChange=(value)=>{
        setSearch(value);
        onSearch(value)
    }

 
    return (
        <input
            type="text"
            className="form-control"
            style={{width:"300px"}}
            placeholder="Tìm kiếm ..."
            value={search}
            onChange={(e)=>onInputChange(e.target.value)}
        />
    )
}
