import React, { Component } from 'react'

export default class Login extends Component {

    state = {
        user_name: '',
        password: '',
        password_confirmation: '',
        score: 0,
        errors: null
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleCreateAccount = (event) => {
        event.preventDefault()
        if(this.state.password === this.state.password_confirmation){
            fetch('http://localhost:3000/create',{
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Accept': "application/json"
                  },
                  body: JSON.stringify(this.state)
                })
                .then(resp => resp.json())
                .then(data => {
                  if (data.errors){
                      this.setState({
                          errors:data.errors
                      })
                  } else {
                      this.props.showLogin()
                }
            })
        } else {
            alert('Your passwords do not match')
        }
    }

    render() {
        return (
            <div className='login-background'>
                <div className='back-div'>
                    <button className='button' onClick={this.props.backToWelcome}>Go Back</button>
                </div>
                <div className='login' id='create-account'>
                    <form className="form" id='create-form' onSubmit={this.handleCreateAccount} >
                        <p className='error-message' style={{display: this.state.errors ? 'block' : 'none'}}>{this.state.errors}</p>
                        <input className="input" name="user_name" value={this.state.user_name} onChange={this.handleChange} placeholder="User name..." />
                        <input className="input" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password..." />
                        <input className='input' name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} placeholder='Confirm Password...' />
                        <button className='button' id='login-button' type="submit">Create That Account!</button>
                    </form>
                </div>
            </div>
        )
    }
}
