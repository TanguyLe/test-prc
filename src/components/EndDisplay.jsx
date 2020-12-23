import React from "react";

import {Button, ButtonToolbar} from "react-bootstrap";
import {Radar} from 'react-chartjs-2';
import Rainbow from 'rainbowvis.js';

import {arraySum, getScoresStats} from "../utils";


const SENTENCES_SCORE = {
    1: "Tu as fait un score très, très bas, tu es es sûr d'être vivant ?",
    10: "Ah ouais quand même, t'as vraiment fait gaffe. Félicitations je suppose.",
    25: "T'as plutôt fait attention, continue comme ça bravo !",
    50: "T'as un peu cherché les problèmes quand même, ça commence.",
    75: "Ouais, pas trop respectueux quand même. Tu y penses à la sensibilité du covid ?",
    90: "Ah là, t'as carrément abusé. Tu as activement contribué à la propagation du virus.",
    99: "Soit t'as fait exprès, soit le respect tu le cherche encore."
};

const FONT_SIZE = "calc(10px + 2vmin)";
const uriUrl = encodeURIComponent("http://www.test-prc.fr/");

const getWhatsAppShareButton = (text) => {
    return <a href={"https://api.whatsapp.com/send?&text=" + text}
              className="mx-1 App-column-container" target="_blank" rel="noreferrer">
        <img src="whatsapp-logo.png" alt="WhatsApp" style={{width: "38px", height: "38px"}}/>
    </a>
};
const getTwitterShareButton = (text) => {
    const uriText = encodeURIComponent(text.replace(" sur http://www.test-prc.fr/", ''));

    const linkHref = (
        "https://twitter.com/intent/tweet?hashtags=testprc&ref_src=twsrc%5Etfw&text="
        + uriText + "&tw_p=tweetbutton&url=" + uriUrl
    );
    return <a href={linkHref} className="m-1 App-column-container" target="_blank" rel="noreferrer">
        <img src="twitter-logo.png" alt="Tweet" style={{width: "39px", height: "39px"}}/>
    </a>
};
const getFacebookShareButton = () => {
    return <a href={"https://www.facebook.com/sharer/sharer.php?src=sdkpreparse&u=" + uriUrl}
              className="m-1 App-column-container" target="_blank" rel="noreferrer">
        <img src="facebook-logo.png" alt="Facebook" style={{width: "35px", height: "35px"}}/>
    </a>
};


class EndDisplay extends React.Component {
    constructor() {
        super();
        const scoresStats = getScoresStats();
        this.maxScore = scoresStats["total"]["max"];

        this.rainbow = new Rainbow();
        this.rainbow.setNumberRange(scoresStats["total"]["min"], this.maxScore);
        this.rainbow.setSpectrum("#5cb85c", "#dc3545");
    }
    render() {
        const totalScore = arraySum(this.props.scoreValues);
        const scores = Object.values(this.props.scoreValues);
        const scoreMin = Math.min(0, ...scores);
        const scoreMax = Math.max(...scores);

        const scorePercent = totalScore / this.maxScore * 100;
        let currentSentenceIndex = 1;
        while (Object.keys(SENTENCES_SCORE)[currentSentenceIndex] < scorePercent)
            currentSentenceIndex += 1;
        currentSentenceIndex = Object.keys(SENTENCES_SCORE)[currentSentenceIndex - 1];

        const shareText = (
            `Je viens de finir mon test PRC sur https://www.test-prc.fr avec un score de ${totalScore}, `
            + "à ton tour de voir si tu as été(e) respectueux(se) du Covid !"
        );
        const width = window.innerWidth|| document.documentElement.clientWidth||
            document.body.clientWidth;

        let labelSizes = width < 500 ? 10 : 20;

        const scoreDiv = (
            <div style={{"color":  '#' + this.rainbow.colourAt(totalScore), "display": "inline"}}>
                {totalScore}
            </div>
        );

        return <div className={"App-column-container"}>
                <div>C'est fini, ton score est {scoreDiv} !</div>
                <div>{SENTENCES_SCORE[currentSentenceIndex]}</div>
                <div style={{fontSize: "calc(10px + 1.5vmin)", paddingBottom: "10px"}}>
                    Au cas où tu te demanderais, plus ton score est élevé et plus tu as fait de la merde.
                    Et c'est aussi valable pour les catégories :
                </div>

                <div className="App-graph-container">
                    <Radar
                        data={{
                            labels: Object.values(this.props.allCategories),
                            datasets: [{
                                data: this.props.scoreValues,
                                backgroundColor: "#dc3545",
                                fill: false,
                                borderColor: "#dc3545"
                            }]
                        }}
                        options={
                            {
                                tooltips: {
                                    callbacks: {
                                        title: (
                                            (tooltipItems, data) =>
                                                Object.values(this.props.allCategories)[tooltipItems[0].index]
                                        )

                                    }
                                },
                                responsive: true,
                                maintainAspectRatio: false,
                                legend: {display: false},
                                scale: {
                                    pointLabels: {fontColor: "white", fontSize: labelSizes},
                                    ticks: {display: true, min: scoreMin, max: scoreMax, size: FONT_SIZE},
                                    gridLines: {color: "white"},
                                    angleLines: {color: "white"}
                                }
                            }
                        }
                    />
                </div>
                <ButtonToolbar id={"button-toolbar"}>
                    {getWhatsAppShareButton(shareText)}
                    {getTwitterShareButton(shareText)}
                    {getFacebookShareButton()}
                </ButtonToolbar>
                <Button className="m-1 btn-sm" onClick={this.props.reset}>
                    Encore !
                </Button>
            </div>;
    }
}

export default EndDisplay;
