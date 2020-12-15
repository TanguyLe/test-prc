const data = require("../src/data/questions.json");
const cst = require("../src/constants");

let categories = Object.keys(cst.allCategories);
categories.push("total");

let scoresStats = {};


const getConditional = (data, questionIndex, answerLabel) => {
    // Let's look for a conditional for this answer
    let searchIndex = questionIndex + 1;

    while (data[searchIndex] && data[searchIndex].condition) {
        if (data[searchIndex].condition === answerLabel) {
            return data[searchIndex];
        }
        searchIndex += 1;
    }
    return null;
};

const getCategoryScore = (category, scores) => {
    if (category === "total")
        return cst.arraySum(Object.values(scores));

    return scores[category];
};


for (const category of categories) {
    scoresStats[category] = {"min": 0, "max": 0};

    for (const [index, question] of data.entries()) {
        if (question.condition)
            continue;

        let possibleScoreValues = [];

        for (const [answerLabel, answerScores] of Object.entries(question.answers)) {
            const currentAnswerCategoryScore = getCategoryScore(category, answerScores);

            if (currentAnswerCategoryScore) {
                let answerConditionalQuestion = getConditional(data, index, answerLabel);

                if (answerConditionalQuestion) {
                    // Same as global, but for the conditional
                    for (const conditionalQuestionAnswers of Object.values(answerConditionalQuestion.answers)) {
                        const conditionalQuestionAnswerCategoryScore = getCategoryScore(
                            category, conditionalQuestionAnswers
                        );

                        if (conditionalQuestionAnswerCategoryScore)
                            possibleScoreValues.push(
                                currentAnswerCategoryScore + conditionalQuestionAnswerCategoryScore
                            );
                    }
                }
                else
                    possibleScoreValues.push(currentAnswerCategoryScore);
            }
            else
                possibleScoreValues.push(0);  // In case that answer doesn't change the category, it means a 0 is okay
        }

        scoresStats[category].min += Math.min(...possibleScoreValues);
        scoresStats[category].max += Math.max(...possibleScoreValues);
    }
}

console.log(scoresStats);
