import React from "react";

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
                            onClick={() => props.onClickButton(answers[answer])}
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
