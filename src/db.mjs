import goal from './goal.mjs';
const database = 'todoList';

const db = {
    createItem(text) {
        const item = new goal(text);
        return item;
    },

    getItem(text) {
        const db = this.fetch();
        return db.length < 1 ? "" : db.find(item => item.description === text);
    },

    update(item) {
        const db = this.fetch();
        db.splice(db.findIndex(obj => obj.index === item.index), 1, item)
        localStorage.setItem(database, JSON.stringify(db));
    },

    fetch() {
        return JSON.parse(localStorage.getItem(database)) || [];
    },

    add(item) {
        const db = this.fetch();
        db.push(item);
        localStorage.setItem(database, JSON.stringify(db));
    },

    delete(item) {
        const db = this.fetch();
        if (db.length < 1) return;

        const itemIndex = db.indexOf(item);
        db.splice(itemIndex, 1);

        localStorage.setItem(database, JSON.stringify(db));
    }, 

    clear() {
        localStorage.removeItem(database);
    }
}

export default db;