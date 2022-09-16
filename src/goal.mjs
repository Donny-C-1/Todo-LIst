export default function goal(todo = "", status = 'incomplete') {
    this.description = todo;
    this.status = status;
    this.startDate = (new Date()).toDateString();
    this.dueDate = '';
    this.endDate = '';
}