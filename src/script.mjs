import setupTasks from "./tasks.mjs";
import history from "./history.mjs";

export default function setup() {
    setupTabs();
    setupTasks();
    history.setup();
}

function setupTabs() {
    try {
        const links = document.querySelectorAll("#sidenav a");
        if (links.length < 1) throw new Error("Element (#sidenav a) does not exist");

        links.forEach(element => {
            element.addEventListener('click', displayTab);
        })
        links[0].click();
    } catch (err) {
        console.log(err);
    }
}

function displayTab(e) {
    try {
        if (!e) throw new SyntaxError("Function displayTab() called outside of an element event");
        e.preventDefault();

        document.querySelectorAll("main > .tab").forEach(element => element.classList.remove("visible"));
        document.getElementById(this.getAttribute("href")).classList.add("visible");
    }
    catch (err) {
        const style = `
            color: red;
            background-color: black;
            padding: 10px;
            letter-spacing: 16px`;
        console.log(`%c${err.name}\n${err.message}`, style);
    }
}