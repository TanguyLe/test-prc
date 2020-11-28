import React from "react";

import { Button } from "react-bootstrap";

const ANSWERS_TO_COLORS = {
    Oui: "primary",
    Non: "danger",
    default: "warning"
};

function Question(props) {
    const answers = props.question.answers;
    return (
        <div>
            <p>
                {props.question.question}
            </p>
            {
                Object.keys(props.question.answers).map(
                    (answer, index) => (
                        <Button
                            variant={ANSWERS_TO_COLORS[answer] || ANSWERS_TO_COLORS.default}
                            onClick={() => props.onClickButton(answer, answers[answer])}
                            key={index}>
                            {answer}
                        </Button>
                    )
                )
            }
        </div>
    );
}

export default Question;
