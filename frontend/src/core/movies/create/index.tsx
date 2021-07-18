import React from 'react'
import MovieService from '../../../services/movieService';
import './style.css'
import history from '../../../utils/history';

class CreateMoviePage extends React.Component {
    movieService: MovieService;
    state:any;
    handleInputChangeValues: any;

    constructor(props:any) {
        super(props);
        this.movieService = new MovieService();
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            title: ""
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
                    <h2>Submit a Movie</h2>
                </div>

                <label>Title</label>
                <br/>
                <input type="text" name="title" onChange={this.handleInputChange} value={this.state.title}></input>
                <br/>
                <br/>
                <button  onClick={() => { this.create() }}>Create Movie</button>
            </div>
        );
    };

    create(){
        if(!this.validateMovie()){
            alert("Please verify all input data in the movie form");
            return;
        }

        this.movieService.create(this.state.title).then(response => {
            alert("Movie created!");
            history.push('/movies');
        }).catch(error => {
            alert("Not able to register the movie");
        });;
    }

    validateMovie():boolean{
        if(this.state.title.length == 0){
            return false;
        }

        return true;
    }

}
export default CreateMoviePage;