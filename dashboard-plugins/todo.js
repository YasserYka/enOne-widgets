module.exports = class TODOs {
  
    constructor(){

      this.todogrid = new Muuri(".todogrid", {
        itemClass: 'todo-item',
        dragEnabled: true,
      });

    }
  
    async render() {
      return (
        <div id="todogrid">
        </div>
      );
    }
  
    async script() { 
        let todos = localStorage.getItem("lastname");

        if (todos){
            todos = JSON.parse(todos);
            
            todos.forEach(todo => this.addTodo(todo));
            this.todogrid.refreshItems().layout();
        }
            
    }

    addTodo(){

      
    }

    addTodo(todo){

        return this.todogrid.add(
          <div class="todo-item">
            <div class="item-content">
              {todo}
            </div>
          </div>
        );
    }

};