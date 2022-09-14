import goal from './goal.mjs';
const database = 'todoList';

function createItem(text) {
    const item = new goal(text);
    return item;
}

function createDb() {
    localStorage.setItem(database, JSON.stringify([]));
}

function checkForDb() {
    return localStorage.getItem(database) ? true : false;
}

function storeItem(item) {
    if (!checkForDb()) {
        createDb();
    }
    const todoList = JSON.parse(localStorage.getItem(database));
    todoList.push(item);
    const JsonItem = JSON.stringify(todoList);
    localStorage.setItem('todoList', JsonItem);
}

function deleteItem(text) {
    const db = getDb();
    if (db.length < 1) return;
    const jsonItem = JSON.stringify(db.filter(obj => obj.goal !== text));
    localStorage.setItem(database, jsonItem);
}

function updateItem() {
    //
}

function getItem() {
    // Check local db or other and retrieve data
}

function getDb() {
    // console.log(localStorage.getItem(database));
    return checkForDb() ? JSON.parse(localStorage.getItem(database)) : [];
}

function clearDb() {
    checkForDb() ? localStorage.setItem(database, JSON.stringify([])) : "";
}

export { createItem, storeItem, deleteItem, updateItem, getItem, getDb, clearDb };