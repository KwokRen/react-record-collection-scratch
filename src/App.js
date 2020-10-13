import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import { autologin } from './services/';
import { JwtToken } from './services/apiConfig'
// import Register from './screens/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './screens/Login';
import Collection from './screens/Collection';

import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      userId: null,
      collectionId: null,
      addArtist: false,
    }
  }

  componentDidMount = async () => {
    if (!this.state.username && JwtToken()) {
      this.JwtLogin()
    }
  }

  setUser = (user) => {
    this.setState({
      username: user.username,
      userId: user.userId,
      collectionId: user.collectionId
    })
  }

  JwtLogin = async() => {
    const resp = await autologin()
    this.setUser({username: resp.data.username, userId: resp.data.user_id, collectionId: resp.data.collection_id})
  }

  newArtist = (force) => {
    this.setState(prevState => (
      { addArtist: force === 'off' ? false : !prevState.addArtist }
      ))
  }

  render() {

    // const account = this.state.userId ? (<Account userId={this.state.userId} />) : (<Login setUser={this.setUser} />)

    return (
      <div className="App">
        <Header addArtist={this.newArtist} />
        <div className="main">
          <BrowserRouter>
            <Switch>
              <Route path="/register">
                {/* <Register setUser={this.setUser} /> */}
              </Route>
              <Route path="/collection/:collectionId">
                <Collection userCollection={this.state.collectionId} addArtistOn={this.state.addArtist} toggleAddArtist={this.newArtist} />
              </Route>
              <Route path="/collection">
                <Collection userCollection={this.state.collectionId} addArtistOn={this.state.addArtist} toggleAddArtist={this.newArtist} />
              </Route>
              <Route path="/login">
                <Login setUser={this.setUser} />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
