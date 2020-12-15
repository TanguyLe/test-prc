module.exports = {
    allCategories: {
        "health": "Santé et Hygiène",
        "dumbness": "Stupidité",
        "rules": "Respect des règles",
        "moral": "Moralité",
        "productivity": "Productivité"
    },
    objectCopy: (object) => JSON.parse(JSON.stringify(object)),
    arraySum: (array) =>  array.reduce((a, b) => a + b, 0)
};
