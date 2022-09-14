export default function goal(todo = "", status = 'incomplete') {
    this.description = todo;
    this.status = status;
}