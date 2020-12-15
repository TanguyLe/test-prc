import React from "react";

import {Radar} from 'react-chartjs-2';
import {arraySum, getScoresStats} from "../utils";

const Rainbow = require('rainbowvis.js');

const SENTENCES_SCORE = {
    1: "Tu as fait un score très, très bas, tu es es sûr d'être vivant ?",
    10: "Ah ouais quand même, t'as vraiment fait gaffe. Félicitations je suppose.",
    25: "T'as plutôt fait attention, bravo !",
    50: "T'as un peu cherché la merde quand même, ça commence.",
    75: "Ouais, pas trop respectueux quand même. Tu y penses à la sensibilité du covid ?",
    90: "Ah là, t'as carrément abusé. Tu as activement contribué à la propagation du virus.",
    99: "Soit t'as fait exprès, soit le respect tu le cherche encore."
};


class EndDisplay extends React.Component {
    constructor() {
        super();
        const scoresStats = getScoresStats();
        this.rainbow = new Rainbow();
        this.minScore = scoresStats["total"]["min"];
        this.maxScore = scoresStats["total"]["max"];
        this.rainbow.setNumberRange(this.minScore, this.maxScore);
        this.rainbow.setSpectrum("#5cb85c", "#dc3545");
    }
    render() {
        const score = arraySum(this.props.scoreValues);

        const scorePercent = score / this.maxScore * 100;
        let currentSentenceIndex = 1;
        while (Object.keys(SENTENCES_SCORE)[currentSentenceIndex] < scorePercent)
            currentSentenceIndex += 1;
        currentSentenceIndex = Object.keys(SENTENCES_SCORE)[currentSentenceIndex - 1];

        const scoreDiv = <div style={{"color":  '#' + this.rainbow.colourAt(score), "display": "inline"}}>{score}</div>;
        return <div>
                <br/>
                C'est fini, ton score est {scoreDiv} !
                <div>{SENTENCES_SCORE[currentSentenceIndex]}</div>
                <Radar
                    data={{
                        labels: Object.values(this.props.allCategories),
                        datasets: [{
                            data: this.props.scoreValues,
                            backgroundColor: "red",
                            fill: false,
                            borderColor: "red"
                        }]
                    }}
                    // width={500} height={500}
                    options={
                        {
                            legend: {display: false},
                            scale: {ticks: {display: true}, gridLines: {color: "white"}, angleLines: {color: "white"}}
                        }
                    }
                />
                <button className="link-button" onClick={this.props.reset}>
                    Le refaire.
                </button>
            </div>;
    }
}

export default EndDisplay;
