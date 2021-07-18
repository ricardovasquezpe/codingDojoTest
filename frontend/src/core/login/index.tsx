import React from 'react'
import './style.css'
import { useHistory } from 'react-router-dom';

export const LoginPage = () => {

    const history = useHistory();
    const handleClick = () => history.push('/movies');

    return (
        <div>
            Login Page
            <button type="button" onClick={handleClick}>
                Goodbye
            </button>
        </div>
    )
}
