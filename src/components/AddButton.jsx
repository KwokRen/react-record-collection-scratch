import React from 'react'

const addButton = ({title, image, onClick}) => {
    return (
        <button type="button" onClick={onClick}>
            {image ? (<img src={image} alt={title} />) : null}
            {title}
        </button>
    )
}

export default addButton