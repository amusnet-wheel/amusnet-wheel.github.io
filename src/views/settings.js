import { html } from '@lit';
import { getPrizes, getWheelSectors, setPrizes, setWheelSectors } from '../utils.js';

const prizeEditor = (prizes, onSave, onDelete, onAdd) => html`
<section id="prize-editor">
    ${Object.entries(prizes).map(([name, qty]) => prizeRow(name, qty, onSave, onDelete))}
    <button @click=${onAdd}>Add New Prize</button>
</section>
`;

const prizeRow = (name, qty, onSave, onDelete) => html`
<article>
    <input type="text" name="name" .value=${name} />
    <input type="number" name="qty" .value=${qty || 0} />
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

const settingsView = (prizeOptions, sectorOptions) => html`
    ${prizeEditor(...prizeOptions)}
    ${sectorEditor(...sectorOptions)}
`;

/** @type {import('../index').ViewController} */
export function showSettings(ctx) {
    // const update = () => ctx.render(renderApp(update));
    // update();

    let sectors = getWheelSectors();
    let prizes = getPrizes();

    update();

    function onSave(originalName, event) {
        const parent = event.target.parentElement;
        const name = parent.querySelector('[name="name"]').value;
        const qty = parent.querySelector('[name="qty"]').value;

        /** @type {import('../index').Settings["prizes"]} */
        let newPrizes = {};

        for (let [prizeName, prizeQty] of Object.entries(prizes)) {
            if (prizeName == originalName) {
                newPrizes[name] = qty;
            } else {
                newPrizes[prizeName] = prizeQty;
            }
        }

        prizes = newPrizes;

        setPrizes(prizes);

        update();
    }

    function onDelete(originalName) {
        /** @type {import('../index').Settings["prizes"]} */
        let newPrizes = {};

        for (let [prizeName, prizeQty] of Object.entries(prizes)) {
            if (prizeName == originalName) {
                continue;
            } else {
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

    function addSector() {
        sectors.push('Quiz');
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
        // ctx.render(prizeEditor(prizes, onSave, onDelete, onAdd));
        const prizeNames = ['Quiz', ...Object.keys(prizes)];
        ctx.render(settingsView([prizes, onSave, onDelete, onAdd], [sectors, prizeNames, changeSector, deleteSector, addSector]));
    }
}