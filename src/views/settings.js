import { html } from '@lit';
import { getPrizes, getQuizPrizes, getWheelSectors, setPrizes, setQuizPrizes, setWheelSectors } from '../utils.js';

const prizeEditor = (prizes, onSave, onDelete, onAdd, onChange) => html`
<section id="prize-editor">
    ${Object.entries(prizes).map(([name, qty]) => prizeRow(name, qty, onSave, onDelete, onChange))}
    <button @click=${onAdd}>Add New Prize</button>
</section>
`;

const prizeRow = (name, qty, onSave, onDelete, onChange) => html`
<article>
    <input @change=${onChange} type="text" name="name" .value=${name} />
    <input @change=${onChange} type="number" name="qty" .value=${qty || 0} />
    <button @click=${(event) => onSave(name, event)}>Save</button>
    <button @click=${(event) => onDelete(name, event)}>Delete</button>
</article>`;

const sectorEditor = (sectors, prizeNames, onChange, onDelete, onAdd) => html`
<section id="sector-editor">
    ${sectors.map((name, index) => sectorRow(index, name, prizeNames, onChange, onDelete))}
    <button @click=${onAdd}>Add Sector</button>
</section>
`;

const sectorRow = (index, name, sectors, onChange, onDelete) => html`
<div>
    <select @change=${(event) => onChange(index, event)} .value=${name}>
        ${sectors.map(s => html`<option value=${s} ?selected=${s == name}>${s}</option>`)}
    </select>
    <button @click=${() => onDelete(index)}>Delete Sector</button>
</div>`;

const settingsView = (prizeOptions, quizPrizeOptions, sectorOptions) => html`
<div id="settings">
    <h1>Settigns</h1>
    <h2>Wheel prize Inventory</h2>
    ${prizeEditor(...prizeOptions)}
    <h2>Quiz prize Inventory</h2>
    ${prizeEditor(...quizPrizeOptions)}
    <h2>Wheel Sectors</h2>
    ${sectorEditor(...sectorOptions)}
</div>
`;

/** @type {import('../index').ViewController} */
export function showSettings(ctx) {
    let sectors = getWheelSectors();
    const [getQuizPrizesFn, quizHandlers] = definePrizeHandlers(getQuizPrizes, setQuizPrizes, update);
    const [getWheelPrizes, wheelHandlers] = definePrizeHandlers(getPrizes, setPrizes, update);

    function addSector() {
        sectors.push('Quiz')
        setWheelSectors(sectors);

        update();
    }

    function deleteSector(index) {
        sectors.splice(index, 1);
        setWheelSectors(sectors);

        update();
    }

    function changeSector(index, event) {
        sectors[index] = event.target.value;
        setWheelSectors(sectors);

        update();
    }

    function update() {
        const prizes = getWheelPrizes();
        const quizPrizes = getQuizPrizesFn();
        const prizeNames = ['Quiz', 'Almost there!', ...Object.keys(prizes)];

        ctx.render(settingsView(
            [prizes, wheelHandlers.onSave, wheelHandlers.onDelete, wheelHandlers.onAdd, wheelHandlers.onPendingChange],
            [quizPrizes, quizHandlers.onSave, quizHandlers.onDelete, quizHandlers.onAdd, quizHandlers.onPendingChange],
            [sectors, prizeNames, changeSector, deleteSector, addSector]
        ));
    }

    update();
}

function definePrizeHandlers(getPrizes, setPrizes, update) {
    let prizes = getPrizes();

    function onSave(originalName, event) {
        const parent = event.target.parentElement;
        const nameInput = parent.querySelector('[name="name"]');
        const qtyInput = parent.querySelector('[name="qty"]');
        const name = nameInput.value;
        const qty = qtyInput.value;

        const newPrizes = {};
        for (let [prizeName, prizeQty] of Object.entries(prizes)) {
            if (prizeName == originalName) {
                newPrizes[name] = Number(qty);
            } else {
                newPrizes[prizeName] = prizeQty;
            }
        }

        prizes = newPrizes;
        setPrizes(prizes);

        nameInput.classList.remove('pending');
        qtyInput.classList.remove('pending');

        update();
    }

    function onDelete(originalName) {
        const newPrizes = {};
        for (let [prizeName, prizeQty] of Object.entries(prizes)) {
            if (prizeName !== originalName) {
                newPrizes[prizeName] = prizeQty;
            }
        }
        prizes = newPrizes;
        setPrizes(prizes);
        update();
    }

    function onAdd() {
        prizes['PrizeName'] = 0;
        setPrizes(prizes);
        update();
    }

    function onPendingChange(event) {
        event.target.classList.add('pending');
    }

    return [() => prizes, { onSave, onDelete, onAdd, onPendingChange }];
}