const storageVersion = '1.0';
const storeName = 'amusnet-prize-wheel';

/**
 * @typedef {import('./index').Settings} Settings
 */

/** @type {Settings} */
const defaultStore = {
    version: storageVersion,
    wheelSectors: [],
    prizes: {}
};

export function getWheelSectors() {
    return getStore().wheelSectors;
}

export function getPrizes() {
    return getStore().prizes;
}

/**
 * @param {Settings["wheelSectors"]} wheelSectors 
 */
export function setWheelSectors(wheelSectors) {
    setStore({ wheelSectors });
}

/**
 * @param {Settings["prizes"]} prizes 
 */
export function setPrizes(prizes) {
    setStore({ prizes });
}

function getStore() {
    /** @type {Settings} */
    let store = JSON.parse(JSON.stringify(defaultStore));

    try {
        store = JSON.parse(localStorage.getItem(storeName));

        if (store.version != storageVersion) {
            // TODO if the store format changes, add migration functions
            store = resetStore();
        }
    } catch (err) {
        console.error(err);

        store = resetStore();
    }

    return store;
}

function setStore(data) {
    const store = getStore();

    if (data.wheelSectors) {
        store.wheelSectors = data.wheelSectors;
    }

    if (data.prizes) {
        store.prizes = data.prizes;
    }

    localStorage.setItem(storeName, JSON.stringify(store));
}

/**
 * @returns {Settings}
 */
function resetStore() {
    localStorage.removeItem(storeName);

    return JSON.parse(JSON.stringify(defaultStore));
}