import React from 'react';

const Record = ({info}) => {
    return (
        <div className="record">
            <img src={info.cover_image} alt={info.artist + ' :: ' + info.title} />
            <h3>{info.title}</h3>
            <p>Release Year: {info.release_year}</p>
        </div>
    )
}

export default Record;