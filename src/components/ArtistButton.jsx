import React from 'react';

const ArtistButton = ({artist, select}) => {
    return (
        <div className="artistSelector" id={artist.id} onClick={select}>
            {artist.name}
        </div> 
    )
}

export default ArtistButton;