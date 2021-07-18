import React from 'react'
import ReviewService from '../../services/reviewService';
import './style.css'
import history from '../../utils/history';

class ReviewsPage extends React.Component {
    reviewService: ReviewService;
    state:any;

    constructor(props:any) {
        super(props);
        this.reviewService = new ReviewService();
        let urlElements = window.location.href.split('/');
        this.getReviewsList(urlElements[4]);

        this.state = {
            reviewList: [],
            movieId: urlElements[4]
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
                    <button style={{float:'right'}} onClick={() => { history.push('/movies') }}>Back</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Reviewer</th>
                            <th>Rating</th>
                            <th>Review</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.reviewList.map(review => {
                            return (
                                <tr key={review._id}>
                                    <td>{ review.user }</td>
                                    <td>{ review.rating }</td>
                                    <td>{ review.review }</td>
                                    <td>
                                        <button onClick={() => { this.delete(review._id) }}>
                                            Delete Review
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            );
    }

    delete(reviewId:String){
        this.reviewService.delete(reviewId).then(response => {
            alert("Review Deleted!");
            this.getReviewsList(this.state.movieId);
        }).catch(error => {
            alert("Review Not Found");
        });;
    }
}

export default ReviewsPage;