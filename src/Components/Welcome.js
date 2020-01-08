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
        availableGuesses: 4,
        currentScore: 0,
        friend: null,
        friendship: null,
        adventuresScreen: false
    }
    // functions for changing components
    showLogin = () => {
        this.setState({
            loginScreen: true,
            welcome: false
        })
    }

    handleLogout = () => {
        this.handleLoss()
        this.backToWelcome()
        this.setState({
            currentUser: null
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

    setUser = (user) => {
        this.backToWelcome()
        this.setState({
            currentUser: user,
            welcome: false
        })
    }

    // Friendship related functions

    setFriend = (data) => {
        this.setState({
            friend: data.buddy,
            friendship: data.friendship
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

    updateGuesses = (remainingGuesses) => {
        this.setState({
            availableGuesses: remainingGuesses+2
        })
    }

    resetScore = () => {
        this.setState({
            currentScore: 0
        })
    }

    resetGuesses = () => {
        this.setState({
            availableGuesses: 4
        })
    }

    handleWin = () => {
        this.endFriendship()
        this.updateScore()
        this.backToUser()
    }
 
    handleLoss = () => {
        if(this.state.friendship){
            this.endFriendship()
        }
        this.saveScore()
        this.resetScore()
        this.resetGuesses()
        this.backToUser()
    }

    handleQuit = () => {
       if(window.confirm('Are you sure you want to end this friendship? This will reset your current score')){
           this.endFriendship()
           this.resetScore()
       }
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
                handleLoss={this.handleLoss}
                />
            )
        }
        else if(this.state.currentUser && this.state.adventuresScreen){
            return(
                <Adventures 
                availableGuesses={this.state.availableGuesses}
                updateGuesses={this.updateGuesses}
                handleLoss={this.handleLoss}
                handleWin={this.handleWin}
                friend={this.state.friend}
                endFriendship={this.endFriendship}
                />
            )
        }
    }
}
