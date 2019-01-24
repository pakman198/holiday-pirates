import './hotel.css'
import React from 'react';
import axios from 'axios';

import ReviewsList from '../ReviewsList';

class Hotel extends React.Component {

    state = {
        requestedReviews: false,
        reviews: [],
        reviewsVisible: false
    }

    renderStars = (count) => {
        const max_stars = 5;
        const star_arr = []

        for(let i = 1; i <= max_stars; ++i) {

            const star_element = <span key={i} className={ i<count ? 'star': ''}>&#9733;</span>;
            star_arr.push(star_element);
        }

        return star_arr;
    }

    clickHandler = (hotel) => {
        const { requestedReviews, reviewsVisible } = this.state;
        
        if(!requestedReviews) {
            this.fetchReviews(hotel);
            return;
        }

        if(reviewsVisible) {
            this.setState({ reviewsVisible: false });
        }else {
            this.setState({ reviewsVisible: true });
        }
    }

    fetchReviews = (hotel) => {
        const url = `http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id=${hotel}`;
        axios.get(url)
            .then(({data}) => {
                this.setState({
                    reviews: [...data],
                    requestedReviews: true,
                    reviewsVisible: true
                });
            })
            .catch(error => {
                console.log('error');
            });
    }

    render() {
        const { reviewsVisible, reviews } = this.state;
        const { data: hotel, data: { date_start, date_end }} = this.props;
        const start = new Date(date_start);
        const end = new Date(date_end);

        return (
            <div className="hotel-container">
                <div className={ reviewsVisible ? 'hotel reviews-display' : 'hotel' }>
                    <div className="photo" style={{ backgroundImage: `url(${hotel.images[0]})` }}></div>
                    <div className="data">
                        <div className="title">
                            <div className="name">
                                <h2>{hotel.name}</h2>
                                <p>
                                    <span className="country">{ hotel.country }</span>
                                    - 
                                    <span className="city">{ hotel.city }</span>
                                </p>
                            </div>
                            <div className="stars">
                                { this.renderStars(hotel.stars) }
                            </div>
                        </div>
                        <div className="description">
                            { hotel.description}
                        </div>
                        <div className="footer">
                            <div className="action">
                                <button 
                                    className="btn btn-lg btn-primary" 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.clickHandler(hotel.id)
                                    }}
                                >
                                    Show reviews
                                </button>
                            </div>
                            <div className="price">
                                <p className="value mb-1">{hotel.price} &euro;</p>
                                <p>
                                    {start.toLocaleDateString('de-DE')} 
                                    - 
                                    {end.toLocaleDateString('de-DE')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                { reviewsVisible ? <ReviewsList reviews={reviews} /> : null}
            </div>
        )
    }
}

export default Hotel;