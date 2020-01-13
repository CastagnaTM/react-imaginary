import React, { Component } from 'react'
import Cookie from '../Assets/cookie.png'

export default class UserHome extends Component {

    state = {
        instructions: false,
        logout: false
    }

    // generate  new friend
    findAFriend = () => { 
        fetch('http://localhost:3000/find_a_friend',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                id: this.props.currentUser.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            this.props.setFriend(data)
        })
    }

    showLogout = () => {
        this.setState({
            logout: true
        })
    }

    confirmLogout = () => {
        this.props.handleLogout()
    }

    cancelLogout = () => {
        this.setState({
            logout: false
        })
    }

    // display functions

    showInstructions = () => {
        this.setState({
            instructions: 'A'
        })
    }

    moreInstructions = () => {
        this.setState({
            instructions: 'B'
        })
    }

    closeInstructions = () => {
        this.setState({
            instructions: false
        })
    }

    getImg = () => {
        let friendImg = require(`../Assets/buddies_imgs/${this.props.friend.img_num}.png`)
        return friendImg
    }

    showFriendInfo = () => {
        if (this.props.friend && !this.state.instructions){
            return(
                <div className='instructions'>
                    <p id='user-page-font'>Your Friend:</p>
                    <h2 id='user-page-font'>{this.props.friend.name}</h2>
                    <img className='buddy-img' src={this.getImg()} alt='imaginary friend'/>
                    <button className='button' id='user-columns-button' onClick={this.props.handleAdventures}>Hangout!</button>
                    <button className='button' id='user-columns-button' onClick={this.props.handleLoss}>End Friendship</button>
                </div>
            )
        }
        else if(!this.props.friend && !this.state.instructions){
            return (
                <div className='instructions'>
                    <h3 id='user-page-font'>You don't have a friend right now!</h3>
                    <button className='button' id='user-columns-button' onClick={this.findAFriend}>Find A Friend</button>
                </div>
            )
        }
        if(this.state.instructions === 'A'){
            return(
                <div className='instructions'>
                    <h4 id="user-page-font">Welcome to Imaginary Friend Simulator! Your Goal is to make as many friendships in a row as you can</h4>
                    <h4 id="user-page-font">Click "FIND A FRIEND" to start a new friendship</h4>
                    <h4 id="user-page-font">Click "HANGOUT" to choose from three types of activities to do together: "Workout", "Go Shopping", and "Get Food"</h4>
                    <h4 id="user-page-font">Your friend will like one activity in each category</h4>
                    <h4 id="user-page-font">Guess the right activities to win over your friend!</h4>
                    <button className='button' id='user-columns-button' onClick={this.moreInstructions}>More Instructions</button>
                </div>
            )
        }
        if(this.state.instructions === 'B'){
            return(
                <div className='instructions'>
                    <h4 id="user-page-font">Each friend you win over will increase the number of guesses you can make in the next round by two</h4>
                    <h4 id="user-page-font">If you run out of guesses before you find all three of the correct activities, your friend will leave!</h4>
                    <h4 id="user-page-font">Your current score on the left shows the number of friends you've made without losing, and your high score shows the most friends you've ever made in a row</h4>
                    <button className='button' id='user-columns-button' onClick={this.closeInstructions}>Close Instructions</button>
                </div>
            )
        }
    }

    render() {
        return (
            <div className='user-background'>
                <div className='overlay' style={{display: this.state.logout ? 'block' : 'none'}}>
                    <div className='overlay-info'>
                        <h4 id='overlay-font'>Are you sure you want to logout? This will reset your current score and end your friendship</h4>
                    </div>
                    <button className='button' id='overlay-button' onClick={this.confirmLogout}>LOGOUT</button>
                    <button className='button' id='overlay-button' onClick={this.cancelLogout}>CANCEL</button>
                </div>
                <div className='user-columns-container'>
                    <div className='user-column'>
                        <div className='welcome-image' >
                            <img id='user-image' src={Cookie} alt='cookie monster logo'></img>
                        </div>
                        <button className='button' id='user-columns-button' onClick={this.showLogout}>Logout</button>
                        <button className='button' id='user-columns-button' onClick={this.showInstructions}>Show Instructions</button>
                    </div>
                    <div className='user-column'>
                        <h1 className='title' id='welcome-title'>Welcome, {this.props.currentUser.user_name}!</h1>
                        <div className='highScore'>
                            <h2 className='title' id='user-page-font' style={{marginTop: '40%'}}>Your High Score: {this.props.currentUser.score}</h2>
                        </div>
                        <div className='currentScore'>
                            <h4 className='title' id='user-page-font' style={{marginTop: '20%'}}>Your Current Score: {this.props.currentScore}</h4>
                        </div>
                    </div>
                    <div className='user-column'>
                        {this.showFriendInfo()}
                    </div>
                </div>
            </div>
        )
    }
}
