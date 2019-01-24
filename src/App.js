import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

import Button from './components/Button';
import HotelsList from './components/HotelsList';

require('es6-promise').polyfill();

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      hotels: [],
      hotelsError: false,
    }
  }

  fetchHotels = () => {
    axios.get('http://fake-hotel-api.herokuapp.com/api/hotels?count=5')
      .then(({data}) => {
        console.log({data});
        const {hotels} = this.state;

        this.setState({
          hotelsError: false,
          hotels: [...hotels, ...data]
        })
      })
      .catch(error => {
        console.log(error);
        this.setState({
          hotelsError: true
        })
      });
  }

  errorMessage =  (
    <div className="alert alert-secondary">
      An error occurred
    </div>
  )

  render() {
    const { hotelsError, hotels } = this.state;

    return (
      <div className="App container">
        <div className="row">
          <div className="col-12">
            <Button fetchHotels={this.fetchHotels} />

            { hotelsError ? this.errorMessage : null }
            { hotels.length > 0 ? <HotelsList hotels={hotels} /> : null }  
          </div>
        </div>
        
      </div>
    );
  }
}

export default App;
