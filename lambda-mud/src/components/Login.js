// This file renders the login form for existing users

import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            username: '',
            password: '',
        }
    }
    // Update state values with form input values:  
    handleInputChange = event => {
        console.log('handleInputChange called');
        this.setState({ [event.target.name]: event.target.value });
    };
    
    // Upon submission of user credentials, make a post request to the server to add the new user:
    // Request should include username, password, and valid auth token
    handleSubmit = event => {
        event.preventDefault();
        const username = this.state.username;
        const password = this.state.password;
        
        const user = {
            username,
            password,
        };
        
        axios
            .post('http://lambdamud-by-cameronsray.herokuapp.com/api/login/',  user, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                console.log('Login response: ', response);
                localStorage.setItem('token', response.data.key);
                // console.log('token in localStorage: ', localStorage.getItem("token")); // localStorage.getItem("token") same as localStorage['token']
                this.props.history.push('/api/adv/init');
            })
            .catch(err => console.log(err.response))

        this.setState({
            username: '',
            password: '',
        });
    }

    render() {
        return (
            <div>
                {/* <Route
                    exact
                    path='/api/adv/init'
                    component={Adv}
                /> */}
                <form>
                    <input 
                        name='username'
                        type='text'
                        placeholder='username'
                        value={this.state.username}
                        onChange={this.handleInputChange}
                    />

                    <input 
                        name='password'
                        type='text'
                        placeholder='password'
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />

                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Login;