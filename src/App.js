import React from "react";

import {Radar} from 'react-chartjs-2';

import logo from './logo.svg';
import './App.css';

import Question from './Question';
import data from './data/questions.json'

// Preparing the categories
let categories = data.map(
    (question) => Object.keys(question.answers).map(
        (key) => Object.keys(question.answers[key])
    )
);
categories = [].concat.apply([], categories);
categories = [].concat.apply([], categories);
const allCategories = [...new Set(categories)];

function objectValuesSum(obj) {
    return Object.keys(obj).reduce(
        (sum, key) => sum + parseFloat(obj[key] || 0),
        0
    );
}

const initialState = {
    score: allCategories.reduce((o, key) => ({...o, [key]: 0}), {}),
    currentQuestionIndex: 0
};

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleAnswerClick = this.handleAnswerClick.bind(this);

        this.state = initialState;
    }

    handleAnswerClick(scoreChanges) {
        let newScore = JSON.parse(JSON.stringify(this.state.score));
        for (const category of Object.keys(scoreChanges))
            newScore[category] += scoreChanges[category];

        this.setState({
            score: newScore,
            currentQuestionIndex: this.state.currentQuestionIndex + 1
        })
    }

    render() {
        let display = "";

        if (this.state.currentQuestionIndex === data.length) {
            let scoreValues = allCategories.map((category) => this.state.score[category]);

            display = <div><br/>C'est fini, ton score est {objectValuesSum(this.state.score)} !
                <Radar
                    data={{
                        labels: allCategories,
                        datasets: [{
                            data: scoreValues,
                            backgroundColor: "red",
                            fill: false,
                            borderColor: "red"
                        }]
                    }}
                    width={500} height={500}
                    options={
                        {
                            "legend": {"display": false},
                            "scale": {"ticks": {"display": true, "min": -20}}
                        }
                    }
                />
                <button className="link-button" onClick={() => {
                    this.setState(initialState)
                }}>
                    Le refaire.
                </button>
            </div>;
        } else
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
