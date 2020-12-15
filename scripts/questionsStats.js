import {getScoresStats} from "../src/utils"
import data from "../src/data/questions.json"

console.log(`There are ${data.length} questions.`);
console.log(getScoresStats());
