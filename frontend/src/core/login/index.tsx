import React, { Component } from 'react'
import './style.css'
import { useHistory } from 'react-router-dom';
import AuthService from '../../services/authService';
import Validators from '../../utils/validators';

class LoginPage extends React.Component {
    authService: AuthService;
    handleInputChangeValues: any;
    state:any;
    validators: Validators;
    /*const history = useHistory();
    const handleClick = () => history.push('/movies');*/

    constructor(props:any) {
        super(props);
        this.authService = new AuthService();
        this.validators = new Validators();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        };
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
                    <label>First Name</label>
                    <br/>
                    <input type="text" name="firstName" onChange={this.handleInputChange} value={this.state.firstName}></input>
                    <br/>
                    <label>Last Name</label>
                    <br/>
                    <input type="text" name="lastName" onChange={this.handleInputChange} value={this.state.lastName}></input>
                    <br/>
                    <label>Email</label>
                    <br/>
                    <input type="email" name="email" onChange={this.handleInputChange} value={this.state.email}></input>
                    <br/>
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password" onChange={this.handleInputChange} value={this.state.password}></input>
                    <br/>
                    <label>Confirm Password</label>
                    <br/>
                    <input type="password" name="confirmPassword" onChange={this.handleInputChange} value={this.state.confirmPassword}></input>
    
                    <br/>
                    <br/>
                    <button type="button" onClick={() => this.register()}>Register</button>
                </div>
            </div>
        )
    }

    login(){
        this.authService.login("rica3r5g5d41o@test.com", "ricardo").then(response => {
            console.log(response);
        });
    }

    register(){
        if(!this.validateRegister()){
            alert("Please verify all input data in the register form");
            return;
        }

        this.authService.register(this.state.firstName, this.state.lastName, this.state.email, this.state.password).then(response => {
            console.log(response);
        });
    }

    validateRegister():boolean{
        if(this.state.firstName.length == 0 || this.state.lastName.length == 0 || this.state.email.length == 0 || this.state.password.length == 0 || this.state.confirmPassword.length == 0){
            return false;
        }

        if(!this.validators.validateEmail(this.state.email)){
            return false;
        }

        if(this.state.password.length != this.state.confirmPassword.length){
            return false;
        }

        return true;
    }
}

export default LoginPage;