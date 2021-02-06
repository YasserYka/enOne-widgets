module.exports = class TODOs {
  async initialize() {

    this.renderTodos = this.renderTodos.bind(this);
  }

  async render() {
    return (
      <div class="card mt-2 shadow bg-dark text-center">
        <input id="todo-list" type="text" placeholder="Press Enter" />
        <ul id="todolist" class="list-group">

        </ul>
      </div>
    );
  }

  async script() {
    this.renderTodos();

    document.getElementById("todo-list").addEventListener("keypress", this.addTodo.bind(this));
  }

  addTodo(event) {

    if (event.key === "Enter") {
      let todoInputElement = document.getElementById("todo-list");

      let todos = JSON.parse(localStorage.getItem("todo-list")) || [];

      if (todoInputElement.value) {
        todos.push(todoInputElement.value);

        localStorage.setItem("todo-list", JSON.stringify(todos));
      }

      todoInputElement.value = "";
    }

    this.renderTodos();
  }

  renderTodos() {
    let todos = localStorage.getItem("todo-list");

    if (todos) {
      todos = JSON.parse(todos);

      document.getElementById("todolist").innerHTML = todos
        .map((todo, index) => (
          <li data-id={index} class="list-group-item todo d-flex justify-content-between align-items-center">
            {todo}
            <span class="deletetodo" class="badge badge-primary badge-pill">
              X
            </span>
          </li>
        ))
        .join(" ");
     
      document.querySelectorAll('.todo ').forEach(element => {

        element.addEventListener('click', this.removeTodo.bind(this));
      });
        
    }
  }

  removeTodo(event) {
    let id = event.currentTarget.dataset.id;

    let todos = localStorage.getItem("todo-list");

    if (todos) {
      todos = JSON.parse(todos);

      localStorage.setItem('todo-list' , JSON.stringify(todos.filter((_, index) => !index == id)));
    }  

    this.renderTodos();
  }
};
