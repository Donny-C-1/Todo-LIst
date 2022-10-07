const database = 'history';

const history = {
    fetch() {
        return JSON.parse(localStorage.getItem(database)) || [];
    },

    add(item) {
        const todoList = this.fetch();
        todoList.push(item);
        const jsonItem = JSON.stringify(todoList);
        localStorage.setItem(database, jsonItem);
        console.table(todoList);
    },

    clear() {
        localStorage.removeItem(database);
    }
}

export default history;