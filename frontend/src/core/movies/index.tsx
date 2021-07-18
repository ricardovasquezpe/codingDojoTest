import React from 'react'
import MovieService from '../../services/movieService';
import './style.css'
import history from '../../utils/history';


class MoviesPage extends React.Component {
    movieService: MovieService;
    state:any;

    constructor(props:any) {
        super(props);
        this.movieService = new MovieService();
        this.getMoviesList();

        this.state = {
            movieList: []
        }
    }

    getMoviesList(){
        this.movieService.list().then(response => {
            this.setState({
                movieList: response
            });
        }).catch(error => {
            alert("User Not Found");
        });;
    }

    render(){
        return (
            <div>
                <div>
                    <h2>Movie List</h2>
                    <button style={{float:"right"}} onClick={() => { history.push('/createmovie') }}>Add a new Movie</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Avg Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movieList.map(movie => {
                            return (
                                <tr key={movie._id}>
                                    <td>{ movie.title }</td>
                                    <td>10.23</td>
                                    <td>
                                        <button>
                                            Read Reviews
                                        </button>
                                        <button>
                                            Write a Review
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MoviesPage;