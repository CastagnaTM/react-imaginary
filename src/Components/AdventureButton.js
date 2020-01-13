import React, { Component } from 'react'

export default class AdventureButton extends Component {

    state = {
        neutral: true,
        correct: null,
        available: true
    }
    
    handleChoice = (num) => {
        this.setState({
            available: false
        })
        if(this.props.prefs.includes(num)){
            this.setState({
                neutral: false,
                correct: true
            })
            this.handleUpdate(true)
        }        
        else{
            this.setState({
                neutral: false,
                correct: false
            })
            this.handleUpdate(false)
        }
        
    }

    handleUpdate = (result) => {
        if(result){
            this.props.handleResult(true)
        }
        else{
            this.props.handleResult(false)
        }
    }

    render() {
        return (
            <button className='button' id='user-columns-button' 
            style={{backgroundColor: this.state.neutral ? 
                null : this.state.correct ? 
                '#00ff00' : '#ff0000'}}
            onClick={() => this.state.available ? this.handleChoice(this.props.id) : null}>{this.props.name}</button>
        )
    }
}
