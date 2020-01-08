import React, { Component } from 'react'
import Login from './Login'
import CreateAccount from './CreateAccount'
import UserHome from './UserHome'
import Adventures from './Adventures'
import Cookie from '../Assets/cookie.png'


export default class Welcome extends Component {

    state = {
        loginScreen: false,
        createAccount: false,
        welcome: true,
        currentUser: null,
        currentScore: 0,
        friend: null,
        friendship: null,
        adventuresScreen: false
    }
    showLogin = () => {
        this.setState({
            loginScreen: true,
            welcome: false
        })
    }

    showCreate = () => {
        this.setState({
            createAccount: true,
            welcome: false
        })
    }

    backToWelcome = () => {
        this.setState({
            loginScreen: false,
            createAccount: false,
            welcome: true
        })
    }

    setUser = (user) => {
        this.backToWelcome()
        console.log(user)
        this.setState({
            currentUser: user,
            welcome: false
        })
    }

    setFriend = (data) => {
        this.setState({
            friend: data.buddy,
            friendship: data.friendship
        })
    }

    handleAdventures = () => {
        this.setState({
            adventuresScreen: true
        })
    }

    backToUser = () => {
        this.setState({
            adventuresScreen: false
        })
    }

    endFriendship = () => {
        fetch('http://localhost:3000/end_friendship',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.friendship.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.friendship === null){
                this.setFriend({buddy: null, friendship: null}) // this might need tweaking
            }
        })
    }

    saveScore = () => {
        console.log(this.state.currentUser.id)
        console.log(this.state.currentScore+1)
        fetch('http://localhost:3000/save_score',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.currentUser.id,
                score: this.state.currentScore+1
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
        })
    }

    updateScore = () => {
        this.setState({
            currentScore: this.state.currentScore+1
        })
        console.log(this.state.currentScore+1)
    }

    handleLogout = () => {
        this.backToWelcome()
        this.setState({
            currentUser: null
        })
    }

    render() {
        if(this.state.welcome){
            return (
                <div className='welcome-background'>
                    <div className='welcome-row'>
                        <div className='welcome-info'>
                            <h1 id='title'>Imaginary Friends</h1>
                            <p id='quote'>"Stranger just friend me have not shared cookie with yet."</p>
                            <div className='welcome-nav'>
                                <button className='button' onClick={this.showLogin}>LOGIN</button> 
                                <button className='button' onClick={this.showCreate}>NEW ACCOUNT</button>   
                            </div>
                        </div>
                        <div className='welcome-image'>
                            <img src={Cookie} alt='cookie monster logo'></img>
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.loginScreen){
            return (
                <Login 
                setUser={this.setUser}
                backToWelcome={this.backToWelcome}
                />
            )
        }
        else if(this.state.createAccount){
            return(
                <CreateAccount
                backToWelcome={this.backToWelcome}
                showLogin={this.showLogin} />
            )
        }
        else if(this.state.currentUser && !this.state.adventuresScreen){
            return(
                <UserHome
                handleLogout={this.handleLogout}
                currentUser={this.state.currentUser}
                currentScore={this.state.currentScore}
                setFriend={this.setFriend}
                friend={this.state.friend}
                friendship={this.state.friendship}
                handleAdventures={this.handleAdventures}
                endFriendship={this.endFriendship}
                />
            )
        }
        else if(this.state.currentUser && this.state.adventuresScreen){
            return(
                <Adventures 
                backToUser={this.backToUser}
                updateScore={this.updateScore}
                saveScore={this.saveScore}
                friend={this.state.friend}
                endFriendship={this.endFriendship}
                />
            )
        }
    }
}
