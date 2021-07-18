import React from 'react'
import ReviewService from '../../../services/reviewService';
import './style.css'
import history from '../../../utils/history';

class CreateReviewPage extends React.Component {
    reviewService: ReviewService;
    state:any;
    handleInputChangeValues: any;

    constructor(props:any) {
        super(props);
        this.reviewService = new ReviewService();
        this.handleInputChange = this.handleInputChange.bind(this);
        let urlElements = window.location.href.split('/');
        
        this.state = {
            user: "",
            rating: 0.0,
            review: "",
            movieId: urlElements[4]
        }
    }

    handleInputChange(event:any) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    render(){
        return (
            <div>
                <div>
                    <h2>Submit a Review</h2>
                </div>

                <label>User</label>
                <br/>
                <input type="text" name="user" onChange={this.handleInputChange} value={this.state.user}></input>
                <br/>
                <label>Rating</label>
                <br/>
                <input type="text" name="rating" onChange={this.handleInputChange} value={this.state.rating}></input>
                <br/>
                <label>Review</label>
                <br/>
                <textarea name="review" onChange={this.handleInputChange} value={this.state.review}></textarea>
                <br/>
                <br/>
                <button  onClick={() => { this.create() }}>Create Review</button>
                <button onClick={() => { history.push('/movies') }}>Cancel</button>
            </div>
        );
    };

    create(){
        if(!this.validateReview()){
            alert("Please verify all input data in the review form");
            return;
        }

        this.reviewService.create(this.state.user, this.state.rating, this.state.review, this.state.movieId).then(response => {
            alert("Review created!");
            history.push('/movies');
        }).catch(error => {
            alert("Not able to register the review");
        });;
    }

    validateReview():boolean{
        if(this.state.user.length == 0 || this.state.rating.length == 0 || this.state.review.length == 0){
            return false;
        }

        return true;
    }

}
export default CreateReviewPage;