import { html } from '@lit';

const prizes = [ 'Quiz', 'Water Bottle', 'Shirt'];
let stores = {}; // storeName -> { name, sectors[] }
let currentStore = '';
let updateCallback = () => {};

function renderApp(update) {
    updateCallback = update;

    const handleStoreChange = (e) => {
        currentStore = e.target.value;
        update();
    };

    const renameStore = (newName) => {
        if (!currentStore || !stores[currentStore] || newName.trim() === '' || newName === currentStore || stores[newName] ) {return;}
      
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
        if (!currentStore) {return;}
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

/** @type {import('../index').ViewController} */
export function showStores(ctx) {
    const update = () => ctx.render(renderApp(update));
    update();
}