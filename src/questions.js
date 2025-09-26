import { questions as common } from './questions/common.js';
import { questions as java } from './questions/java.js';
import { questions as qa } from './questions/qa.js';

/**
 * @typedef {{ text: string; correct: boolean }} Answer
 * @typedef {{ question: string; answers: Answer[] }} Question
 */


const additional = (new Date()).getDate() >= 28 ? java : qa;

/** @type {Question[]} */
export const questions = [
    ...common,
    ...additional
];
