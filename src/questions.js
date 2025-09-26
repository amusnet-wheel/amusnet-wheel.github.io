import { questions as common } from './questions/common.js';
import { questions as qa } from './questions/qa.js';

/**
 * @typedef {{ text: string; correct: boolean }} Answer
 * @typedef {{ question: string; answers: Answer[] }} Question
 */

/** @type {Question[]} */
export const questions = [
    ...common,
    ...qa
];
