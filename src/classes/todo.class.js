export class Todo {

  //Para transformar el objeto que se guarda en localstorage, en una instancia de la clase Todo
  static fromJson ( {id,tarea,completado,creado} ){

    const tempTodo =new Todo(tarea);
    tempTodo.id=id;
    tempTodo.completado=completado;
    tempTodo.creado=creado;

    return tempTodo;
  }

  constructor(tarea) {
    this.tarea = tarea;
    this.id = new Date().getTime(); //123342423 //truco para que el id no se repita
    this.completado = false;
    this.creado = new Date();
  }
  
  
}
