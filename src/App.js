import React from "react";

import logo from './logo.svg';
import './App.css';

import Question from './Question';
import data from './data/questions.json'

const initialState = {
    score: 0,
    currentQuestionIndex: 0
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleAnswerClick = this.handleAnswerClick.bind(this);

        this.state = initialState;
    }

    handleAnswerClick(scoreChangeValue) {
        this.setState({
            score: this.state.score + scoreChangeValue,
            currentQuestionIndex: this.state.currentQuestionIndex + 1
        })
    }

    render() {
        let display = "";

        if (this.state.currentQuestionIndex === data.length)
            display = <div>C'est fini, ton score est {this.state.score} !
                <button className="link-button" onClick={() => {this.setState(initialState)}}>
                    <br/>
                    Le refaire.
                </button>
        </div>;
        else
            display = <Question question={data[this.state.currentQuestionIndex]}
                                onClickButton={this.handleAnswerClick}/>;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                        {display}
                </header>
            </div>
        );
    }
}

export default App;
