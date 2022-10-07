import db from "./db.mjs";
import history from "./history.mjs";

export default function setupTasks() {
    // setupTabs();
    const addBtn = document.getElementById('addBtn');
    addBtn.addEventListener('click', addTodo());
    displayList();
    // displayHistory();
    // console.log('Application Started Successfully');
}

// *Functions Arranged By Aphabetical Order

function addTodo() {
    const input = document.getElementById('Utask');
    return function (e) {
        e.preventDefault();
        const text = input.value;
        input.value = null;
        if (!validateString(text)) return;

        const todo = db.createItem(text);
        db.add(todo);
        updateList(todo);
    }
}

function complete(task) {
    if (task.status === "complete") {
        task.status = "incomplete";
    } else {
        task.status = "complete";
        task.dueDate = (new Date()).toDateString();
    }
    db.update(task);
    console.log(task.status);
    return;
}

function deleteElement(e, text) {
    const index = e.currentTarget.dataset.link;
    document.querySelector(`[data-index='${index}']`).remove();
    const item = db.getItem(text);
    db.delete(item);
    history.add(item);
    updateHistory(item);
    console.log('Element deleted');
}

function displayHistory() {
    const hist = history.fetch();
    hist.forEach(obj => {
        updateHistory(obj);
    })
}

function displayList() {
    const todoList = db.fetch();
    let index = 0;
    todoList.forEach(obj => {
        obj.index = index;
        updateList(obj);
        index++;
    });
    console.log('List displayed');
    console.table(todoList);
}

function displayTab(id, e, ...args) {
    document.querySelectorAll('.tab').forEach(Element => Element.style.display = "none");
    document.getElementById(id).style.display = "block";
    document.querySelectorAll('.tabBtn').forEach(Element => Element.classList.remove('active'));
    e.target.classList.add('active');
}

function setupTabs() {
    const linkAll = document.querySelector("[data-link='all']");
    const linkActive = document.querySelector("[data-link='active']");
    const linkCompleted = document.querySelector("[data-link='completed']");

    linkAll.addEventListener('click', e => displayTab("tasks-container", e));
    linkActive.addEventListener('click', e => displayTab("active-container", e));
    linkCompleted.addEventListener('click', e => displayTab("completed-container", e));

    linkAll.click();
}

function updateHistory(obj) {
    const template = document.querySelector("[data-name='history-template']");
    const element = template.content.cloneNode(true);
    
    element.querySelectorAll('td')[0].textContent = obj.description;
    element.querySelectorAll('td')[1].textContent = obj.status;
    element.querySelectorAll('td')[2].textContent = obj.startDate;
    element.querySelectorAll('td')[3].textContent = obj.dueDate;

    document.querySelector('table').appendChild(element);
}

function updateList(task) {
    const template = document.querySelector("[data-name='task-template']");
    const element = template.content.cloneNode(true);
    const deleteBtn = element.querySelector("[data-func='delete-goal']");
    const checkBox = element.querySelector("input");

    // *Set Attributes
    element.children[0].setAttribute('data-index', task.index);
    element.querySelector("[data-name='task']").textContent = task.description;
    deleteBtn.setAttribute('data-link', task.index)

    // *Add Events
    // element.children[0].addEventListener('click', complete);
    deleteBtn.addEventListener('click', (e) => deleteElement(e, task.description));
    checkBox.addEventListener('click', e => complete(task));

    document.getElementById('list').appendChild(element);
}

function validateString(str) {
    return str == null || undefined || str.length <= 0 ? false : true;
}