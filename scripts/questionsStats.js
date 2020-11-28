const data = require("../src/data/questions.json");
const cst = require("../src/constants");

const categories = Object.keys(cst.allCategories);

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

for (const category of categories) {
    scoresStats[category] = {"min": 0, "max": 0};

    for (const [index, question] of data.entries()) {
        if (question.condition)
            continue;

        let possibleScoreValues = [];

        for (const [answerLabel, answerScores] of Object.entries(question.answers)) {
            const categoryScore = answerScores[category];
            if (categoryScore) {
                let conditionalQuestion = getConditional(data, index, answerLabel);

                if (conditionalQuestion) {
                    var scoreValuesConditional = [];

                    // Same as global, but for the conditional
                    for (const conditionalAnswerScores of Object.values(conditionalQuestion.answers)) {
                        const conditionalCategoryScore = conditionalAnswerScores[category];
                        if (conditionalCategoryScore)
                            scoreValuesConditional.push(conditionalCategoryScore);
                        else
                            scoreValuesConditional.push(0);
                    }

                    possibleScoreValues.push(categoryScore + Math.min(...scoreValuesConditional));
                    possibleScoreValues.push(categoryScore + Math.max(...scoreValuesConditional));
                }
                else
                    possibleScoreValues.push(categoryScore);
            }
            else
                possibleScoreValues.push(0);
        }
        scoresStats[category].min += Math.min(...possibleScoreValues);
        scoresStats[category].max += Math.max(...possibleScoreValues);
    }
}

console.log(scoresStats);
