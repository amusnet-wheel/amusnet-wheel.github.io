import { html } from '@lit';
import { getPrizes, getWheelSectors, setPrizes, setWheelSectors } from '../utils.js';

const prizes = [];
let stores = {}; // storeName -> { name, sectors[] }
let currentStore = '';
let updateCallback = () => { };

function renderApp(update) {
    updateCallback = update;

    const handleStoreChange = (e) => {
        currentStore = e.target.value;
        update();
    };

    const renameStore = (newName) => {
        if (!currentStore || !stores[currentStore] || newName.trim() === '' || newName === currentStore || stores[newName]) { return; }

        // // Avoid name collision
        // if (stores[newName]) {
        //     alert('A store with that name already exists.');
        //     return;
        // }

        stores[newName] = {
            ...stores[currentStore],
            name: newName
        };

        delete stores[currentStore];
        currentStore = newName;
        update();
    };
    const addNewStore = () => {
        const name = `Store ${Object.keys(stores).length + 1}`;
        stores[name] = { name, sectors: [] };
        currentStore = name;
        update();
    };

    const saveStore = () => {
        alert(`Store "${currentStore}" saved.`);
    };

    const deleteStore = () => {
        if (currentStore) {
            delete stores[currentStore];
            currentStore = '';
            update();
        }
    };

    const addSector = () => {
        if (!currentStore) { return; }
        stores[currentStore].sectors.push({ sector: '', prize: prizes[0] });
        update();
    };

    const updateSector = (i, key, value) => {
        stores[currentStore].sectors[i][key] = value;
    };

    const deleteSector = (i) => {
        stores[currentStore].sectors.splice(i, 1);
        update();
    };

    return html`

    <!-- Section 1: Store Controls -->
    <section>
      <h2>Wheel Settings</h2>
      <input
        id="store-name"
        placeholder="Enter store name"
        .value=${currentStore}
        @input=${(e) => renameStore(e.target.value)}
        />
      <button @click=${saveStore}>💾 Save</button>
      <button @click=${deleteStore}>🗑️ Delete</button>
      <button @click=${addNewStore}>➕ New</button>

      <br />
      <label>Select Store:</label>
      <select @change=${handleStoreChange}>
        <option value="">-- Select a store --</option>
        ${Object.keys(stores).map(
        name => html`<option value=${name} ?selected=${name === currentStore}>${name}</option>`
    )}
      </select>
    </section>

    <!-- Section 2: Sector Controls -->
    ${currentStore
            ? html`
          <section>
            <h2>Wheel Sectors for "${currentStore}"</h2>
            <button @click=${addSector}>➕ Add Sector</button>

            <table>
              <thead>
                <tr>
                  <th>Sector</th>
                  <th>Prize</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${stores[currentStore].sectors.map((row, i) => html`
                  <tr>
                    <td>
                      <input
                        .value=${row.sector}
                        @input=${(e) => updateSector(i, 'sector', e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        .value=${row.prize}
                        @change=${(e) => updateSector(i, 'prize', e.target.value)}
                      >
                        ${prizes.map(prize => html`
                          <option value=${prize}>${prize}</option>
                        `)}
                      </select>
                    </td>
                    <td>
                      <button @click=${() => deleteSector(i)}>🗑️ Delete</button>
                    </td>
                  </tr>
                `)}
              </tbody>
            </table>
          </section>
        `
            : html`<p>Select a store to manage its sectors.</p>`
        }
  `;
}

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
export function showStores(ctx) {
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