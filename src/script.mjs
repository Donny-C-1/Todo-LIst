import { displayList, addTodo } from "./dom.mjs";
// import goal from './goal.js';
// import addTodo from './dom.mjs';


export default function setup() {
    console.log('Application Started Successfully');
    const addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', addTodo());
    displayList();
}