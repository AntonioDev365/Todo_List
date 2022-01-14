import { Todo } from './todo.class'
export class TodoList{

    constructor(){
        // this.todos=[];
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ){
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){

        this.todos.filter( todo => todo.id != id ); //Toda esta expresion va a devolver un nuevo arreglo evitando el arreglo que coincide con el id, sobreescribiendo sus valores
        this.guardarLocalStorage();

    }

    marcarCompletado( id ){

      for( const todo of this.todos ){

        if(todo.id == id){ //Doble igual porque puede que sea un stringa numero
            
            todo.completado = !todo.completado; //Si esto es true la negacion de true es false;
            break; //Como ya no va a ver otro todo con el mismo id me salgo del ciclo

        }

      }  

    }

    eliminarCompletados(){

        this.todos.filter( todo => !todo.completado ); //Necesito todos los que NO estan completados
        this.guardarLocalStorage(); //Al eliminar elementos me los debe guardar los actuales en el localStorage
    }
    guardarLocalStorage(){

        localStorage.setItem('todo', JSON.stringify(this.todos)); //Json.stringify que me convierta mi arreglo de todos a un JSON

    }
    //Me los pasa del local storage a mi arreglo de todos, esdecir mi lista de todos
    cargarLocalStorage(){

        this.todos= (localStorage.getItem('todo')) 
        ? JSON.parse(localStorage.getItem('todo')) 
        : [] ;
                             
        //El método map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos.
        this.todos=this.todos.map( obj => Todo.fromJson(obj) )//EN mayuscula porque es una propiedad estatica, llama a la destructuracion de arreglos y lo que recibe es un objeto
        // if( localStorage.getItem('todo') ){ //Condicion de seguridad por si existe el todo

        //     this.todos =JSON.parse(localStorage.getItem('todo')) ; //Si no que me obtenga los todos del local storage y me los cargue en el arreglo
        //     //JSON.parse me hace el proceso inverso al JSON.stringify y me lo devuelve a su objeto original
        //     console.log('cargarLocal',this.todos);

        // }else{
        //     this.todos=[]; //Si no existen todos que me cargue el arreglo vacio
        // }

    }

}