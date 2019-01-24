import './reviews-list.css';
import React from 'react';

import Review from '../Review';

class ReviewsList extends React.Component {

    render() {
        console.log(this.props)
        const { reviews } =  this.props;
        const review_blocks = reviews.map((review, i) => <Review key={i} data={review} /> );
        let display_block;

        if(reviews.length !== 0) {
            display_block = review_blocks;
        } else {
            display_block = <div>This hotel has no reviews yet!</div>
        }

        return (
            <div className="reviews-list">
                { display_block }
            </div>
        );
    }
}

export default ReviewsList;