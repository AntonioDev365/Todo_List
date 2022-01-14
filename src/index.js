
import './styles.css';

import {Todo, TodoList} from './classes'; //Al no especificar me busca el index por defecto
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();
todoList.todos.forEach (todo => crearTodoHtml(todo)); //Que me recorra todo los todos guardados y me los anyada al html

// const newTodo=new Todo('Aprender Javascript');
// todoList.nuevoTodo(newTodo);

console.log('todos',todoList.todos);