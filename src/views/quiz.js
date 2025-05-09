// @ts-nocheck
import { html } from '@lit';

/**
 * @typedef {import('../index').ViewController} ViewController
 * @typedef {{ text: string; correct: boolean }} Answer
 * @typedef {{ question: string; answers: Answer[] }} Question
 */

/** @type {ViewController} */
export function showQuiz(ctx) {
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
                { text: 'Kalahari', correct: false},
                { text: 'Gobi', correct: false},
                { text: 'Sahara', correct: false},
                { text: 'Antarctica', correct: true},
            ],
        },
        {
            question: 'Which is the smallest continent in the world?',
            answers: [
                { text: 'Asia', correct: false},
                { text: 'Australia', correct: true},
                { text: 'Arctic', correct: false},
                { text: 'Africa', correct: false},
            ]
        },
        {
            question: 'Which is the smallest country in the world?',
            answers: [
                { text: 'Vatican City', correct: true},
                { text: 'Bhutan', correct: false},
                { text: 'Nepal', correct: false},
                { text: 'Shri Lanka', correct: false},
            ]
        }
        // …other questions…
    ];

    let currentQuestionIndex = Math.floor(Math.random() * questions.length);
    let answered = false;
    let correctAnswer = false; // Variable to track whether the answer was correct

    /**
     * Handle choosing an answer.
     * @param {boolean} correct
     */
    function selectAnswer(correct) {
        if (answered) {
            return;
        }
        answered = true;
        correctAnswer = correct; // Set the correctAnswer flag based on the user's choice
        // immediate re-render
        ctx.render(quizTemplate());
    }

    /**
     * Main template for questions & score.
     * @returns {import('lit-html').TemplateResult}
     */
    function quizTemplate() {
        const q = questions[currentQuestionIndex];
        const num = currentQuestionIndex + 1;

        // If answered, show the result message (Congrats or Sorry)
        if (answered) {
            return html`
                <section>
                    <div class="quizApp">
                        <div class="quiz">
                            <h1>${correctAnswer ? 'Congrats!' : 'Sorry!'}</h1>
                            <p>${correctAnswer ? 'You answered correctly.' : 'Try again next time.'}</p>
                        </div>
                    </div>
                </section>
            `;
        }

        // Otherwise, show the question and answers
        return html`
            <section>
                <div class="quizApp">
                    <div class="quiz">
                        <h1 id="question">${num}. ${q.question}</h1>
                        <div id="answerButtons">
                            ${q.answers.map(
                                (ans) => html`
                                    <button class="btn ${answered ? ans.correct ? 'correct' : 'incorrect' : ''}"
                                        @click=${() => selectAnswer(ans.correct)} ?disabled=${answered}>
                                        ${ans.text}
                                    </button>
                                `
                            )}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // Initial render
    ctx.render(quizTemplate());
}
