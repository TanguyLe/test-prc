const data = require("../src/data/questions.json");

const ALL_CATEGORIES = {
    "health": "Santé et Hygiène",
    "dumbness": "Stupidité",
    "rules": "Respect des règles",
    "moral": "Moralité",
    "productivity": "Productivité"
};

const objectCopy = (object) => JSON.parse(JSON.stringify(object));
const arraySum = (array) =>  array.reduce((a, b) => a + b, 0);

let categoriesNamesList = Object.keys(ALL_CATEGORIES);
categoriesNamesList.push("total");


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
        return arraySum(Object.values(scores));

    return scores[category];
};

const getScoresStats = () => {
    let scoresStats = {};

    for (const category of categoriesNamesList) {
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
                    possibleScoreValues.push(0);  // In case that answer doesn't change the category, it means a 0 is ok
            }

            scoresStats[category].min += Math.min(...possibleScoreValues);
            scoresStats[category].max += Math.max(...possibleScoreValues);
        }
    }

    return scoresStats;
};

module.exports = {
    ALL_CATEGORIES: ALL_CATEGORIES,
    objectCopy: objectCopy,
    arraySum: arraySum,
    getScoresStats: getScoresStats
};
