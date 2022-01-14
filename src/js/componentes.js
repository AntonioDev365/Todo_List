import { Todo } from "../classes";
import { todoList } from '../index';

//Referencias en el HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      =document.querySelector('.new-todo');
const btnBorrar     =document.querySelector('.clear-completed');
const ulFiltros     =document.querySelector('.filters'); 
const anchorFiltros =document.querySelectorAll('.filtro'); 

export const crearTodoHtml = (todo) => {    //Estoe s posible gracias a la interpolacion de varticks
  const htmlTodo = `<li class="${ (todo.completado) ? 'completed' : '' }" data-id="${todo.id}"> 
    <div class="view">
        <input class="toggle" type="checkbox" ${(todo.completado)? `checked`: ''}>
        <label>${ todo.tarea }</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
    </li>`;
    
    const div=document.createElement('div'); //Solo he creado el div para que me permita crear todo ese elemento, pero luego no me interesa crear el div si no que solo el elemento div
    div.innerHTML=htmlTodo;

    divTodoList.append( div.firstElementChild ); //Para insertar solo a partir del li y no el div que he creado como truco

};

//Eventos
//El evento keyup salta cuando la tecla es soltada
//Agregacion de un TODO
txtInput.addEventListener('keyup',(event)=>{

    if(event.keyCode === 13 && txtInput.value.length > 0 ){ //El keycode 13 es cuando el usuario pulsa enter, la segunda condicion es para evitar que se inserten todosvacios

        const nuevoTodo=new Todo(txtInput.value);  //Con txtInput.value obtengo el valor de lo que el usuario haya insertado en el input
        todoList.nuevoTodo( nuevoTodo ); //Me agrega el nuevo todo que el usuario ha insertado en el arreglo
    
        crearTodoHtml( nuevoTodo );
        txtInput.value=''; //Para borrar el valor del input una vez que se haya terminado de escribir el todo
    }

});
//Completacion de un todo y eliminacion de un todo
divTodoList.addEventListener('click',(event)=>{

    const nombreElemento=event.target.localName;//En el target te indica a lo que haces click, ya sea label boton etc
    const todoElemento=event.target.parentElement.parentElement; //Para acceder a la referencia del li que es el elemento que quiero borrar del html
    const todoId      = todoElemento.getAttribute('data-id'); //Para obtener el  id del elemento indicado
    
    if(nombreElemento.includes('input')){ //comprobar que el usuario hizo click en el check
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed'); //Me permite agregar de todas las clases la completed que es la que me permite realizar el tachado
    }else if (nombreElemento.includes('button')){ //En este caso hay que borrar el todo
        todoList.eliminarTodo( todoId); //Me lo borra del arreglo
        divTodoList.removeChild( todoElemento ); //Para eliminarlo del HTML
    }
});

//Borrar todos los TODOS completados
btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados(); //Esto es para eliminar solo en el arreglo
    
    for( let i =divTodoList.children.length-1; i>=0; i-- ){//Voy eliminando los todos de forma inversa es decir de abajo hacia arriba para evitar posibles errores de regneracion de indices
        
        const elemento=divTodoList.children[i]; //Saber si el elemento actual que estoy recorriendo en el for esta completado o no
        
        if(elemento.classList.contains('completed')){ //Compruebo si el elemento contiene la clase completeted y si dicho elemento esta ya completado
             divTodoList.removeChild(elemento); //Me elimina del html el elemento                  
        }
    } 
});

ulFiltros.addEventListener('click',(event)=>{
    
    const filtro=event.target.text; //Para saber que elementos de los filtros estoy seleccionando
    if(! filtro ) return; //Si no existe el filtro que me haga un return, por si pulsa en una zona que es undefined.

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    
    event.target.classList.add('selected');

    for( const elemento of divTodoList.children ){
        elemento.classList.remove('hidden'); //Para borrar la clase hidden
        const completado =elemento.classList.contains('completed');

        switch(filtro){

            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if( !completado){
                    elemento.classList.add('hidden');
                }
                break;
            }
        }

});

