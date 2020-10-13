import React from 'react';
import ArtistButton from './ArtistButton';

const ArtistsList = ({artists, select, ownerName}) => {
    return (
        <div className="artistsList">
            <h3>{ownerName}'s collection</h3>
            {artists.map((artist, i) => <ArtistButton artist={artist} select={() => select(i)} key={i} />)}
        </div>
    )
}

export default ArtistsList;