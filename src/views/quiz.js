// @ts-nocheck
import { html } from '@lit';
import { getPrizes, setPrizes } from '../utils.js';
import { showPopup } from './popup.js';

/**
 * Main template for questions & score.
 * @returns {import('lit-html').TemplateResult}
 */
const quizTemplate = (data, onSelect) => html`
<section>
    <div class="quizApp">
        <div class="quiz">
            <h1 id="question">${data.question}</h1>
            <ol id="answerButtons">
                ${data.answers.map((ans, i) => html`
                <button class="btn" @click=${(event) => onSelect(i, event)}>
                    <li>
                        ${ans.text}
                    </li>
                </button>`)}
            </ol>
        </div>
    </div>
</section>
`;

/** @type {ViewController} */
export function showQuiz(ctx) {
    const questionIndex = Math.floor(Math.random() * questions.length);
    const question = questions[questionIndex];
    ctx.render(quizTemplate(question, selectAnswer));

    /**
     * Handle choosing an answer
     * @param {number} answerIndex
     * @param {MouseEvent} event
     */
    function selectAnswer(answerIndex, event) {
        document.querySelectorAll('button').forEach(b => b.disabled = true);
        const { correct } = question.answers[answerIndex];
        const className = correct ? 'correct' : 'incorrect';

        event.target.parentElement.classList.add(className);

        const prizes = getPrizes();
        const stockedPrizes = Object.entries(prizes).filter(([p, qty]) => Number(qty) > 0);
        const prize = stockedPrizes[Math.floor(Math.random() * stockedPrizes.length)][0];

        setTimeout(() => {
            showPopup(ctx, prize, true, correct);

            if (correct) {
                prizes[prize]--;
                setPrizes(prizes);
            }
        }, 1000);
    }
}

/**
 * @typedef {import('../index').ViewController} ViewController
 * @typedef {{ text: string; correct: boolean }} Answer
 * @typedef {{ question: string; answers: Answer[] }} Question
 */

/** @type {Question[]} */
const questions = [
    {
        question: 'Which is the largest animal in the world?',
        answers: [
            { text: 'Shark', correct: false },
            { text: 'Blue whale', correct: true },
            { text: 'Elephant', correct: false },
            { text: 'Giraffe', correct: false },
        ],
    },
    {
        question: 'Which is the largest desert in the world?',
        answers: [
            { text: 'Kalahari', correct: false },
            { text: 'Gobi', correct: false },
            { text: 'Sahara', correct: false },
            { text: 'Antarctica', correct: true },
        ],
    },
    {
        question: 'Which is the smallest continent in the world?',
        answers: [
            { text: 'Asia', correct: false },
            { text: 'Australia', correct: true },
            { text: 'Arctic', correct: false },
            { text: 'Africa', correct: false },
        ]
    },
    {
        question: 'Which is the smallest country in the world?',
        answers: [
            { text: 'Vatican City', correct: true },
            { text: 'Bhutan', correct: false },
            { text: 'Nepal', correct: false },
            { text: 'Shri Lanka', correct: false },
        ]
    }
    // …other questions…
];