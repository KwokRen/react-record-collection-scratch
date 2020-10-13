import React from 'react'
import AddButton from './AddButton'

import { artistSearch } from '../services/'

class AddArtist extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nameInput: '',
            hot100HitsInput: '',
            addable: []
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleNameSearch = async e => {
        await this.handleChange(e)
        if (this.state.nameInput.length > 2){
            const resp = await artistSearch(this.state.nameInput)
            this.setState({addable: resp.data})
        } else if (this.state.nameInput.length === 0) {
            this.setState({addable: []})
        }
    }

    render () {

        const addable = this.state.addable.map(artist => <AddButton title={artist.name} key={artist.id} onClick={() => this.props.select(artist.id)} />)

        return ( 
            <div className="info">
                <h2>Add an artist to your collection!</h2>
                <div>
                    <label htmlFor="nameInput">Artist Name:</label>
                    <input type="text" name="nameInput" value={this.state.nameInput} onChange={this.handleNameSearch}/>
                    {addable[0] && (<p style={{fontSize: '10px'}}>Click a button below to select an existing artist, or press Enter to add a new artist</p>)}
                </div>

                {addable}

                {!addable[0] ? (
                    <>
                    <div>
                        <label htmlFor="hot100HitsInput">Number of Hot 100 Hits:</label>
                        <input type="text" name="hot100HitsInput" value={this.state.hot100HitsInput} onChange={this.handleChange} />
                    </div>
                    <button type="button" >Submit</button>
                    </>
                ) : null }

            </div>
        )
    }
}

export default AddArtist