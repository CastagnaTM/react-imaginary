import React, { Component } from 'react'
import Cookie from '../Assets/cookie.png'

export default class UserHome extends Component {
    // move friend and friendship up to welcome, load adventures from there
    // also have to update checks from state.friend(ship) to props.friend(ship)
    // make functions that set state for friend(ship) in welcome, and call those in place of setState in functions on this page
    // move handle adventures to welcome, change calls to this.props

    state = {
        instructions: false
    }

    componentDidMount = () => {
        this.checkFriendship()
    }

    getImg = () => {
        let friendImg = require(`../Assets/buddies_imgs/${this.props.friend.img_num}.png`)
        return friendImg
    }

    confirmLogout = () => {
        if(window.confirm('Are you sure you want to logout?')){
            this.props.handleLogout()
        }
    }

    handleInstructions = () => {
        this.setState({
            instructions: !this.state.instructions
        })
    }

    checkFriendship = () => {
        fetch('http://localhost:3000/check_friendship',{
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

    showFriendInfo = () => {
        if (this.props.friend && !this.state.instructions){
            return(
                <div className='instructions'>
                    <p id='user-page-font'>Your Friend:</p>
                    <h2 id='user-page-font'>{this.props.friend.name}</h2>
                    <img className='buddy-img' src={this.getImg()} alt='imaginary friend'/>
                    <button className='button' id='user-columns-button' onClick={this.props.handleAdventures}>HANGOUT!</button>
                    <button className='button' id='user-columns-button' onClick={this.props.endFriendship}>END FRIENDSHIP</button>
                </div>
            )
        }
        else if(!this.props.friend && !this.state.instructions){
            return (
                <div className='instructions'>
                    <h3 id='user-page-font'>You don't have a friend right now!</h3>
                    <button className='button' id='user-columns-button' onClick={this.findAFriend}>FIND A FRIEND</button>
                </div>
            )
        }
        if(this.state.instructions){
            return(
                <div className='instructions'>
                    <h4 id="user-page-font">Welcome to Imaginary Friends! Your Goal is to make as many friendships as you can without losing any friends</h4>
                    <h4 id="user-page-font">Click "FIND A FRIEND", to start a new friendship</h4>
                    <h4 id="user-page-font">Once you have a friend, you can hang out together</h4>
                    <h4 id="user-page-font">Choose from three types of activities: "Workout", "Go Shopping", and "Get Food"</h4>
                    <h4 id="user-page-font">Your friend will have one preference in each category</h4>
                    <h4 id="user-page-font">Guess the right activities to win over your friend!</h4>
                    <h4 id="user-page-font">Each correct guess will increase the number of guesses you can make</h4>
                    <h4 id="user-page-font">If you run out of guesses before you find all three of the correct activities, your friend will leave!</h4>
                    <button className='button' id='user-columns-button' onClick={this.handleInstructions}>GO BACK</button>
                </div>
            )
        }
    }

    render() {
        return (
            <div className='user-background'>
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
                        <h2 className='title' id='user-page-font' style={{marginTop: '40%'}}>Your High Score: {this.props.currentUser.score}</h2>
                        <h4 className='title' id='user-page-font' style={{marginTop: '20%'}}>Your Current Score: {this.props.currentScore}</h4>
                    </div>
                    <div className='user-column'>
                        {this.showFriendInfo()}
                    </div>
                </div>
            </div>
        )
    }
}
