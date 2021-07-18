import React from 'react'
import ReviewService from '../../services/reviewService';
import './style.css'

class ReviewsPage extends React.Component {
    reviewService: ReviewService;
    state:any;

    constructor(props:any) {
        super(props);
        this.reviewService = new ReviewService();
        let urlElements = window.location.href.split('/');
        this.getReviewsList(urlElements[4]);

        this.state = {
            reviewList: []
        }
    }

    getReviewsList(movieId: String){
        this.reviewService.list(movieId).then(response => {
            this.setState({
                reviewList: response
            });
        }).catch(error => {
            alert("Reviews Not Found");
        });;
    }

    render(){
        return (
            <div>
                <div>
                    <h2>Review List</h2>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Reviewer</th>
                            <th>Rating</th>
                            <th>Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reviewList.map(review => {
                            return (
                                <tr key={review._id}>
                                    <td>{ review.user }</td>
                                    <td>{ review.rating }</td>
                                    <td>{ review.review }</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            );
    }
}

export default ReviewsPage;