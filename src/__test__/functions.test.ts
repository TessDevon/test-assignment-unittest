/**
 * @jest-environment jsdom
 */
import { addTodo, changeTodo, removeAllTodos, sortByName } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

beforeEach(() => {
    document.body.innerHTML = "";
});

describe("addTodo", () => {
    test ("addTodoTrue", () => {
        //Arrage
        let todoExample = "baka"
        let todos: Todo[] = [];
        let length = todos.length;
    
        //Act
        addTodo(todoExample, todos);

        //Assert
        expect(todos.length).toBe(length+1);
        expect(todos[todos.length-1].text).toBe("baka")
    });

    test ("addTodoFalse", () => {
        //Arrage
        let todoExample = ""
        let todos: Todo[] = [];
        let length = todos.length;
    
        //Act
        addTodo(todoExample, todos);

        //Assert
        expect(todos.length).toBe(length);
    });
});

describe("changeTodo", () => {
    test ("changeTodoDoneToNotdone", () => {
        //Arrage
        let todoExampleTrue = ("baka");
        let changeToFalse = new Todo(todoExampleTrue, true);

        //Act 
        changeTodo(changeToFalse);

        //Assert 
        expect(changeToFalse.done).toBe(false);
    });

    test ("changeTodoNotdoneToDone", () => {
        //Arrage
        let todoExampleFalse = ("baka");
        let changeToTrue = new Todo(todoExampleFalse, false);

        //Act 
        changeTodo(changeToTrue);

        //Assert 
        expect(changeToTrue.done).toBe(true);
    });
});

test ("removeAllTodos",() => {
    //Arrage
    let todos: Todo[] = [new Todo("Baka", true), new Todo("Handla", true)];

    //Act 
    removeAllTodos(todos);

    //Assert
    expect(todos.length).toBe(0);
});

describe("changeTodo", () => {
    test ("sortByNameMixedTodos",() => {
        //Arrage
        let todos: Todo[] = [new Todo("Handla", true), new Todo("Baka", true)];

        //Act 
        sortByName(todos);

        //Assert
        expect(todos[1].text).toBe("Handla");
    });
    test ("sortByNameOrderedTodos",() => {
        //Arrage
        let todos: Todo[] = [new Todo("Baka", true), new Todo("Handla", true)];

        //Act 
        sortByName(todos);

        //Assert
        expect(todos[1].text).toBe("Handla");
    });
    test ("sortByNameSameTodos",() => {
        //Arrage
        let todos: Todo[] = [new Todo("Handla", true), new Todo("Handla", true)];

        //Act 
        sortByName(todos);

        //Assert
        expect(todos[1].text).toBe("Handla");
    });

});