import React, { Component } from 'react'
import Adventures from './Adventures'
import Cookie from '../Assets/cookie.png'

export default class UserHome extends Component {

    state = {
        friend: null,
        instructions: false,
        showAdventures: false
    }

    confirmLogout = () => {
        if(window.confirm('Are you sure you want to logout?')){
            this.props.handleLogout()
        }
    }

    handleInstructions = () => {
        this.setState({
            instructions: true
        })
    }

    handleAdventures = () => {
        this.setState({
            showAdventures: true
        })
    }

    findAFriend = () => {
        console.log('this function will generate a friend for you')
    }

    endFriendship = () => {
        console.log('this function will end the friendship')
    }

    showFriendInfo = () => {
        if (this.state.friend){
            return(
                <div>
                    <p>you have a friend, and it's info will go here</p>
                    <button className='button' id='user-columns-button' onClick={this.handleAdventures}>GO ON AN ADVENTURE</button>
                    <button className='button' id='user-columns-button' onClick={this.endFriendship}>END FRIENDSHIP</button>
                </div>
            )
        }
        else if(this.state.friend === null && this.state.instructions === false){
            return (
                <div className='instructions'>
                    <h3 id='instructions-font'>You don't have a friend right now!</h3>
                    <button className='button' id='user-columns-button' onClick={this.findAFriend}>FIND A FRIEND</button>
                </div>
            )
        }
        else if(this.state.instructions){
            return(
                <div className='instructions'>
                    <h4 id="instructions-font">Click "FIND A FRIEND", to start a new friendship</h4>
                    <h4 id="instructions-font">Once you have a friend, you can go on adventures together</h4>
                    <h4 id="instructions-font">Choose from three types of adventures: "Workout", "Shopping", and "Food"</h4>
                    <h4 id="instructions-font">Your friend will enjoy one adventure from each category </h4>
                    <h4 id="instructions-font">Guess the right activity to increase your friendship rank</h4>
                    <h4 id="instructions-font">Guess wrong, and it will decrease</h4>
                    <h4 id="instructions-font">If your friendship rank reaches zero, your friend will leave!</h4>
                    <button className='button' id='user-columns-button' onClick={this.findAFriend}>FIND A FRIEND</button>
                </div>
            )
        }
        else if(this.state.showAdventures){
            return(
                <Adventures />
            )
        }
    }

    render() {
        return (
            <div className='user-background'>
                {/* <h1>Hey, this is the user page</h1>
                <p>It's gonna have three columns. 1st will be the cookie monster, and user name</p>
                <p>Second will have the friendship rank,  and button to see past friendships</p>
                <p>Third will have the most conditional rendering. Default will be buttons to find a friend</p>
                <p> if not viewing history, once you have a friend this will show current friend, their name, and buttons to leave or go on adventures </p>
                <p> if viewing history, it'll be listed here if there is one</p> 
                past friendships can be a history table that stores essential friendship info (user id buddy id and buddy info), and when pulled, finds the appropriate info by current user id
                The only catch is ending a friendship without deleting the record of it*/}
                <div className='user-columns-container'>
                    <div className='user-column'>
                        <div className='welcome-image' >
                            <img id='user-image' src={Cookie} alt='cookie monster logo'></img>
                        </div>
                        <button className='button' id='user-columns-button' onClick={this.confirmLogout}>LOGOUT</button>
                        <button className='button' id='user-columns-button' onClick={this.handleInstructions}>INSTRUCTIONS</button>
                    </div>
                    <div className='user-column'>
                        <h1 className='title' id='welcome-title'>Welcome, {this.props.currentUser.user_name}!</h1>
                    </div>
                    <div className='user-column'>
                        {this.showFriendInfo()}
                    </div>
                </div>
            </div>
        )
    }
}
