import React from "react";

const ANSWERS_TO_COLORS = {
    Oui: "btn btn-primary",
    Non: "btn btn-danger",
    default: "btn btn-warning"
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
                        <button
                            className={ANSWERS_TO_COLORS[answer] || ANSWERS_TO_COLORS.default}
                            onClick={() => props.onClickButton(answer, answers[answer])}
                            key={index}>
                            {answer}
                        </button>
                    )
                )
            }
        </div>
    );
}

export default Question;
