import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { getCollection, getAddable } from './../services';

import Record from '../components/Record';
import ArtistsList from '../components/ArtistsList';
import ArtistInfo from '../components/ArtistInfo';
import AddArtist from '../components/AddArtist';

class Collection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            ownerName: '',
            selected: null,
            error: null,
            addArtist: false,
            addRecordArtistId: null,
            addRecordArtist: {}
        }
    }

    componentDidMount = () => {
    }

    componentDidUpdate = async(prevProps, prevState) => {
        if (this.props.userCollection !== prevProps.userCollection) {
            await this.populate()
        }
        if (this.props.addArtistOn !== prevProps.addArtistOn) {
            this.setState({addArtist: this.props.addArtistOn})
        }
    }

    populate = async() => {
        const id = this.props.match.params.collectionId || this.props.userCollection
        if (id) {
            const resp = await getCollection(id)
            console.log(resp.data)
            this.setState({
                artists: resp.data.artists,
                ownerName: resp.data.owner
            })
        }
    }

    selectCollectionArtist = (index) => {
        this.setState({selected: index})
        this.props.toggleAddArtist('off')
    }

    selectNewArtist = async (id) => {
        const resp = await getAddable(id)
        console.log(resp)
        this.setState({
            addRecordArtistId: id,
            addArtist: false,
            addRecordArtist: resp.data
        })
    }

    render() {

        const records = 
            this.state.selected != null 
            && this.state.artists 
            && this.state.artists[this.state.selected].records.map(record => (<Record key={record.id} info={record} />))

        const artistInfo = this.state.addArtist ? 
            <AddArtist select={this.selectNewArtist}/> : 
            <ArtistInfo artist={this.state.artists[this.state.selected] || null} addRecordArtist={this.state.addRecordArtist} />

        return (
            <>
            <ArtistsList artists={this.state.artists || []} ownerName={this.state.ownerName} select={this.selectCollectionArtist} />
            <div className="artist">
                { artistInfo }
                { this.state.selected != null && !this.state.addArtist ? (<h3>In your collection:</h3>) : null }
                <div className="records">
                    { !this.state.addArtist && !this.state.addRecordArtist.name && records }
                </div>
            </div>
            </>
        )
    }
}

export default withRouter(Collection);
