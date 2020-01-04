import React, { Component } from 'react'

export default class AdventureButton extends Component {

    state = {
        neutral: true,
        correct: null,
        correctColor: '#00ff00',
        incorrectColor: '#ff0000'
    }
    
    handleChoice = (num) => {
        if(this.props.prefs.includes(num)){
            this.setState({
                neutral: false,
                correct: true
            })
            this.props.handleResult(true)
        }        
        else{
            this.setState({
                neutral: false,
                correct: false
            })
            this.props.handleResult(false)
        }
    }

    render() {
        return (
            <button className='button' id='user-columns-button' 
            style={{backgroundColor: this.state.neutral ? 
                null : this.state.correct ? 
                '#00ff00' : '#ff0000'}}
            onClick={() => this.handleChoice(this.props.id)}>{this.props.name}</button>
        )
    }
}
