import React from "react";

function Question(props) {
    return (
        <div>
            <p>
                {props.question.question}
            </p>
            {
                Object.keys(props.question.answers).map(
                    (answer, value) => (
                        <button
                            onClick={() => props.onClickButton(value)}
                            key={value}>
                            {answer}
                        </button>
                    )
                )
            }
        </div>
    );
}

export default Question;
