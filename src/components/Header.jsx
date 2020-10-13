import React from 'react'

const Header = (props) => {
    return (
        <header>
            <h1><span>|||| </span>Record Collection <span>||| ||  |</span></h1>
            <div className="artistControls">
                <button type="button" onClick={props.addArtist}>Add Artist to Collection</button>
            </div>
        </header>
    )
}

export default Header;