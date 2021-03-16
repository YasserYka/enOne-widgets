module.exports = class TODOs {
  async initialize(config) {

    this.renderTodos = this.renderTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  async render() {
    return (
      <div class="card mt-2 shadow text-center">
        <div class="card-header">TODO</div>
        <div class="card-body">
          <input id="todo-input" type="text" placeholder="Enter your task" />
          <ul id="todolist" class="list-group mt-1"></ul>
        </div>
      </div>
    );
  }

  async script() {
    this.renderTodos();

    document.getElementById("todo-input").addEventListener("keypress", this.addTodo);
  }

  getTodos() {
    
    return JSON.parse(localStorage.getItem("todo-list")) || [];
  }

  addTodo(event) {
    if (event.key === "Enter") {
      let input = document.getElementById("todo-input");
      let todos = this.getTodos();

      if (input.value) {
        todos.push(input.value);

        localStorage.setItem("todo-list", JSON.stringify(todos));
      }

      input.value = "";
    }

    this.renderTodos();
  }

  renderTodos() {

    const todoListElement = document.getElementById("todolist");

    todoListElement.innerHTML = "";

    this.getTodos().forEach((todo, index) =>
      todoListElement.appendChild(
        <li data-id={index} class="list-group-item todo d-flex justify-content-between align-items-center">
          {todo}
          <span class="badge deletetodo badge-secondary badge-pill" style="cursor:pointer;">
            X
          </span>
        </li>
      ));

    document.querySelectorAll(".todo").forEach((element) => {
      element.addEventListener("click", (event) => {
        let id = parseInt(event.currentTarget.dataset.id);
        let todos = this.getTodos();
    
        localStorage.setItem("todo-list", JSON.stringify(todos.filter((_, index) => index !== id)));
    
        this.renderTodos();
      });
    });
  }

};
