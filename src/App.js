import React from "react";

import logo from './logo.svg';
import './App.css';

import Question from './components/Question';
import EndDisplay from "./components/EndDisplay";
import Footer from "./components/Footer";
import data from './data/questions.json'
import {allCategories, objectCopy} from "./constants";


const initialState = {
    score: Object.keys(allCategories).reduce((o, key) => ({...o, [key]: 0}), {}),
    currentQuestionIndex: 0,
    currentConditionalDisplayed: false
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleAnswerClick = this.handleAnswerClick.bind(this);
        this.getNextQuestionIndex = this.getNextQuestionIndex.bind(this);
        this.reset = this.reset.bind(this);

        this.state = objectCopy(initialState);
    }

    getNextQuestionIndex(answer) {
        let nextQuestionIndex = this.state.currentQuestionIndex + 1;
        while (true) {
            if (nextQuestionIndex === data.length)
                return nextQuestionIndex;

            const nextQuestionCondition = data[nextQuestionIndex].condition;
            if (
                (nextQuestionCondition === undefined)
                ||
                ((answer === nextQuestionCondition) && !this.state.currentConditionalDisplayed)
            )
                return nextQuestionIndex;

            nextQuestionIndex += 1;
        }

    }

    handleAnswerClick(answer, scoreChanges) {
        let newScore = objectCopy(this.state.score);
        for (const category of Object.keys(scoreChanges))
            newScore[category] = newScore[category] + scoreChanges[category];

        const nextQuestionIndex = this.getNextQuestionIndex(answer);

        this.setState({
            score: newScore,
            currentQuestionIndex: nextQuestionIndex,
            currentConditionalDisplayed:
                nextQuestionIndex === data.length ? false : (data[nextQuestionIndex].condition !== undefined)
        })
    }

    reset() {
        this.setState(objectCopy(initialState));
    }

    render() {
        let display = "";

        if (this.state.currentQuestionIndex === data.length) {
            let scoreValues = Object.keys(allCategories).map(
                (category) => Math.max(0, this.state.score[category])
            );

            display = <EndDisplay scoreValues={scoreValues} allCategories={allCategories} reset={this.reset}/>
        } else
            display = <Question question={data[this.state.currentQuestionIndex]}
                                onClickButton={this.handleAnswerClick}/>;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    {display}
                </header>
                <Footer/>
            </div>
        );
    }
}

export default App;
