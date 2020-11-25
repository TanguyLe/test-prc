import React from "react";

import {Radar} from 'react-chartjs-2';

import logo from './logo.svg';
import './App.css';

import Question from './Question';
import data from './data/questions.json'
import {objectValuesSum} from "./utils";

const allCategories = {
    "health": "Santé et Hygiène",
    "dumbness": "Stupidité",
    "rules": "Respect des règles",
    "moral": "Moralité",
    "productivity": "Productivité"
};

const initialState = {
    score: Object.keys(allCategories).reduce((o, key) => ({...o, [key]: 0}), {}),
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
            newScore[category] = Math.max(0, newScore[category] + scoreChanges[category]);

        this.setState({
            score: newScore,
            currentQuestionIndex: this.state.currentQuestionIndex + 1
        })
    }

    render() {
        let display = "";

        if (this.state.currentQuestionIndex === data.length) {
            let scoreValues = Object.keys(allCategories).map(
                (category) => this.state.score[category]
            );

            display = <div><br/>C'est fini, ton score est {objectValuesSum(this.state.score)} !
                <Radar
                    data={{
                        labels: Object.values(allCategories),
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
                            "scale": {"ticks": {"display": true}}
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
