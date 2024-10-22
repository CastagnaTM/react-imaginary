import React, { Component } from 'react'

export default class Login extends Component {

    state = {
        user_name: '',
        password: '',
        errors: null
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = (event) => {
        event.preventDefault()
        fetch('https://imaginary-friend-api.herokuapp.com/login',{
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
                  this.props.setUser(data.user)
            }
        })
    }

    render() {
        return (
            <div className='login-background'>
                <div className='back-div'>
                    <button className='button' onClick={this.props.backToWelcome}>Go Back</button>
                </div>
                <div className='login'>
                    <form className="form" onSubmit={this.handleLogin} >
                        <p className='error-message' style={{display: this.state.errors ? 'block' : 'none'}}>{this.state.errors}</p>
                        <input className="input" name="user_name" value={this.state.user_name} onChange={this.handleChange} placeholder="User name..." />
                        <input className="input" type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password..." />
                        <button className='button' id='login-button' type="submit">Login, friend!</button>
                    </form>
                </div>
            </div>
        )
    }
}
