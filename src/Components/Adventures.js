import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap'
import AdventureButton from './AdventureButton'
import Workout from '../Assets/activity_imgs/workingout.png'
import Eating from '../Assets/activity_imgs/eating.png'
import Shopping from '../Assets/activity_imgs/shopping.png'

export default class Adventures extends Component {

    state = {
        adventures: [{name: 'Yoga', id: 0}, {name:'Lift Weights', id: 1}, {name:'Go Running', id: 2}, {name:'Abercrombie', id: 3}, 
        {name:'H&M', id: 4}, {name:'Hot Topic', id: 5}, {name:'Pizza', id: 6}, {name:'Mexican', id: 7}, {name:'Cafe', id: 8}],
        correctCount: 0,
        availableGuesses: null        
    }

    componentDidMount = () => {
        this.setState({
            availableGuesses: this.props.availableGuesses
        })
    }

    handleResult = (result) => {
        if(result === true){
            this.setState({
                correctCount: this.state.correctCount+1,
            })
            this.checkWinProgress()
        }
        else{
            this.setState({
                availableGuesses: this.state.availableGuesses-1,
            })
            this.checkLoseProgress()
        }
    }

    checkLoseProgress = () => {
        if(this.state.availableGuesses === 0){
            alert("Oh no, you've run out of guesses! Try a new friend...")
            this.props.handleLoss()
        }
    }

    checkWinProgress = () => {
        if(this.state.correctCount === 2){
            alert("Good Job!")
            this.props.updateGuesses(this.state.availableGuesses)
            this.props.handleWin()
        }
    }

    render() {
        return (
            <div className='user-background'>
                <div className='adventure-progress'>
                    <h2 id='adventure-progress-font'>Guesses Available: {this.state.availableGuesses+1}</h2>
                </div>
                <div className='user-columns-container' id='adventure-columns-container'>
                    <div className='user-column'>
                        <h1 id='user-page-font'>Workout</h1>
                        <img id='workout-image' src={Workout} alt='cookie monster logo'></img>
                        <div className='button-div'>
                            {this.state.adventures.slice(0,3).map(item => <AdventureButton key={item.id}{...item}
                            prefs={this.props.friend.prefs}
                            handleResult={this.handleResult}
                            />) }
                        </div>
                    </div>
                    <div className='user-column'>
                        <h1 id='user-page-font'>Go Shopping</h1>
                        <img id='shopping-image' src={Shopping} alt='cookie monster logo'></img>
                        <div className='button-div'>
                        {this.state.adventures.slice(3,6).map(item => <AdventureButton key={item.id}{...item}
                            prefs={this.props.friend.prefs}
                            handleResult={this.handleResult}
                            />) }
                        </div>
                    </div>
                    <div className='user-column'>
                        <h1 id='user-page-font'>Get Food</h1>
                        <img id='eating-image' src={Eating} alt='cookie monster logo'></img>
                        <div className='button-div'>
                        {this.state.adventures.slice(6).map(item => <AdventureButton key={item.id}{...item}
                            prefs={this.props.friend.prefs}
                            handleResult={this.handleResult}
                            />) }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
