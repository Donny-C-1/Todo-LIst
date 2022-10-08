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
    },

    updateDom(obj) {
        const template = document.querySelector('[data-name=\'history-template\']');
        const element = template.content.cloneNode(true);

        element.querySelectorAll('td')[0].textContent = obj.description;
        element.querySelectorAll('td')[1].textContent = obj.status;
        element.querySelectorAll('td')[2].textContent = obj.startDate;
        element.querySelectorAll('td')[3].textContent = obj.dueDate;

        document.querySelector('#history table').appendChild(element);
        
    },

    setup() {
        const list = this.fetch();
        list.forEach(item => {
            this.updateDom(item);
        });
    }
}

export default history;