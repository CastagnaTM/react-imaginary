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
            instructions: true
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

    // endFriendship = () => {
    //     fetch('http://localhost:3000/end_friendship',{
    //         method:'POST',
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             id: this.props.friendship.id
    //         })
    //     })
    //     .then(resp => resp.json())
    //     .then(data => {
    //         if(data.friendship === null){
    //             this.props.setFriend({buddy: null, friendship: null}) // this might need tweaking
    //         }
    //     })
    // }

    showFriendInfo = () => {
        if (this.props.friend){
            return(
                <div className='instructions'>
                    <p id='user-page-font'>Your Friend:</p>
                    <h2 id='user-page-font'>{this.props.friend.name}</h2>
                    <img className='buddy-img' src={this.getImg()} alt='imaginary friend'/>
                    <button className='button' id='user-columns-button' onClick={this.props.handleAdventures}>TO ADVENTURE!</button>
                    <button className='button' id='user-columns-button' onClick={this.props.endFriendship}>END FRIENDSHIP</button>
                </div>
            )
        }
        else if(!this.props.friend && this.state.instructions === false){
            return (
                <div className='instructions'>
                    <h3 id='user-page-font'>You don't have a friend right now!</h3>
                    <button className='button' id='user-columns-button' onClick={this.findAFriend}>FIND A FRIEND</button>
                </div>
            )
        }
        else if(this.state.instructions){
            return(
                <div className='instructions'>
                    <h4 id="user-page-font">Click "FIND A FRIEND", to start a new friendship</h4>
                    <h4 id="user-page-font">Once you have a friend, you can go on adventures together</h4>
                    <h4 id="user-page-font">Choose from three types of adventures: "Workout", "Shopping", and "Food"</h4>
                    <h4 id="user-page-font">Your friend will enjoy one adventure from each category </h4>
                    <h4 id="user-page-font">Guess the right activity to increase your friendship rank</h4>
                    <h4 id="user-page-font">Guess wrong, and it will decrease</h4>
                    <h4 id="user-page-font">If your friendship rank reaches zero, your friend will leave!</h4>
                    <button className='button' id='user-columns-button' onClick={this.findAFriend}>FIND A FRIEND</button>
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
                    </div>
                    <div className='user-column'>
                        {this.showFriendInfo()}
                    </div>
                </div>
            </div>
        )
    }
}
