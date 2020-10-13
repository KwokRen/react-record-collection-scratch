import React from 'react';
import AddButton from './AddButton'

const ArtistInfo = ({artist, addRecordArtist}) => {
    let info;
    if (artist) {
        info = (
            <div className="info">
                <h2>{addRecordArtist.name ? addRecordArtist.name : artist.name}</h2>
                <p>Number of Hot 100 Hits: {addRecordArtist.hot_100_hits ? addRecordArtist.hot_100_hits : artist.hot_100_hits}</p>
                { addRecordArtist.records && addRecordArtist.records[0] ? 
                    addRecordArtist.records.map(record => <AddButton title={record.title} key={record.id} image={record.cover_image} />)
                    : null
                }
            </div>
        )
    } else {
        info = (
            <h2>Please select an artist at left!</h2>
        )
    }

    return info
}

export default ArtistInfo;