import React from "react";

import { Button, ButtonToolbar } from "react-bootstrap";

const ANSWERS_TO_COLORS = {
    Oui: "primary",
    Non: "danger",
    default: "warning"
};

function Question(props) {
    const answers = props.question.answers;
    return [
            <p key="questionLabel" style={{"marginTop": "20px"}}>
                {props.question.question}
            </p>,
            <ButtonToolbar key="answersButtonBar">
                {
                    Object.keys(props.question.answers).map(
                        (answer, index) => (
                            <Button
                                className="mx-1 shadow-none"
                                variant={ANSWERS_TO_COLORS[answer] || ANSWERS_TO_COLORS.default}
                                onClick={() => props.onClickButton(answer, answers[answer])}
                                active={false}
                                key={index}>
                                {answer}
                            </Button>
                        )
                    )
                }
            </ButtonToolbar>
        ];
}

export default Question;
