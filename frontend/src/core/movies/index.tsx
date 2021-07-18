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
            alert("Movies Not Found");
        });;
    }

    render(){
        return (
            <div>
                <div>
                    <h2>Movie List</h2>
                    <button onClick={() => { history.push('/createmovie') }}>Add a new Movie</button>
                    <button style={{float:"right"}} onClick={() => { this.logout() }}>Logout</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.movieList.map(movie => {
                            return (
                                <tr key={movie._id}>
                                    <td>{ movie.title }</td>
                                    <td>
                                        <button onClick={() => { history.push('/reviews/' + movie._id) }}>
                                            Read Reviews
                                        </button>
                                        <button onClick={() => { history.push('/createreview/' + movie._id) }}>
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

    logout(){
        localStorage.removeItem('jwt');
        history.push('/');
    }
}

export default MoviesPage;