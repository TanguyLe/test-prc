import React from "react";

import {Radar} from 'react-chartjs-2';

class EndDisplay extends React.Component {
    render() {
        return <div><br/>C'est fini, ton score est {this.props.scoreValues.reduce((a, b) => a + b, 0)} !
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
