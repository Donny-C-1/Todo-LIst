import { createItem, storeItem, getDb, clearDb, deleteItem } from "./db.mjs";

export default function setup() {
    const addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', addTodo());
    displayList();
    console.log('Application Started Successfully');
}

/* *Functions Arranged By Aphabetical Order* */

function addTodo() {
    const input = document.getElementById('inputBar');
    return function (e) {
        e.preventDefault();
        const text = input.value;
        input.value = null;
        if (!validateString(text)) return;
        const todo = createItem(text);
        storeItem(todo);
        updateList(todo.description);
    }
}

function complete() {
    console.log('completed');
}

function deleteElement(e, text) {
    const index = e.target.dataset.link;
    document.querySelector(`[data-index='${index}']`).remove();
    deleteItem(text);
    console.log('Element deleted');
}

function displayList() {
    const todoList = getDb();
    let index = 0;
    todoList.forEach(obj => {
        obj.index = index;
        updateList(obj.description, index);
        index++;
    });
    console.log('List displayed');
    console.table(todoList);
    // clearDb();
}

function updateList(text, itemIndex) {
    const template = document.querySelector("[data-name='list-item-template']");
    const element = template.content.cloneNode(true);
    const deleteBtn = element.querySelector("[data-func='delete-goal']");

    element.children[0].setAttribute('data-index', itemIndex);
    element.querySelector("[data-name='list-item']").textContent = text;
    
    // element.children[0].addEventListener('click', complete);
    deleteBtn.setAttribute('data-link', itemIndex)
    deleteBtn.addEventListener('click', (e) => deleteElement(e, text));
    document.getElementById('list').appendChild(element);
}

function validateString(str) {
    return str == null || undefined || str.length <= 0 ? false : true;
}