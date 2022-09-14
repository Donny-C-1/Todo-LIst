import { createItem, storeItem, getDb, clearDb } from "./db.mjs";

export function addTodo() {
    const input = document.getElementById('inputBar');
    return function(e) {
        e.preventDefault();
        const todo = createItem(input.value);
        storeItem(todo);
        updateList(todo.description);
        input.value = null;
    }
}

function updateList(text) {
    const template = document.querySelector("[data-name='list-item-template']");
    const element = template.content.cloneNode(true);
    element.querySelector("[data-name='list-item']").textContent = text;
    
    // element.children[0].addEventListener('click', complete);
    // element.querySelector("[data-func='delete-goal']").addEventListener('click', (e) => deleteElement(e, text));
    document.getElementById('list').appendChild(element);
}

function complete() {
    console.log('completed');
}

function deleteElement() {
    console.log('Element deleted');
}

export function displayList() {
    const todoList = getDb();
    todoList.forEach(obj => {
        updateList(obj.description);
    });
    console.log('List displayed');
}