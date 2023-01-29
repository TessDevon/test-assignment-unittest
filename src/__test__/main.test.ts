/**
 * @jest-environment jsdom
 */

import { changeTodo } from '../ts/functions';
import * as main from '../ts/main'
import { Todo } from "../ts/models/Todo";

beforeEach(() => {
    document.body.innerHTML = "";
});

describe("createNewTodo", () => {
    test ("createNewTodoSuccesfulAdd", () => {
        //Arrage
        let spy = jest.spyOn(main, "createHtml").mockReturnValue();
        let todoExample = "baka"
        let todos: Todo[] = [];
        let length = todos.length;

        //Act
        main.createNewTodo(todoExample, todos);

        //Assert
        expect(todos.length).toBe(length+1);
        expect(todos[todos.length-1].text).toBe("baka")
        spy.mockRestore();
    });

    test ("createNewTodoNotSuccesfulAdd", () => {
        //Arrage
        let spy = jest.spyOn(main, "displayError").mockReturnValue();
        let todoExample = "by"
        let todos: Todo[] = [];
        let length = todos.length;

        //Act
        main.createNewTodo(todoExample, todos);

        //Assert
        expect(todos.length).toBe(length);
        spy.mockRestore();
    });
});

describe("createHml", () => {
    test ("createHml,done", () => {
        //Arrage
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `
        let todoExampleCreate = ("baka");
        let todos: Todo[] = [];
        todos.push(new Todo(todoExampleCreate, true));

        //Act
        main.createHtml(todos);    
        let runTodo = document.querySelector("#todos");

        //Assert
        expect(runTodo?.children.length).toBe(todos.length);
        expect(runTodo?.children[runTodo?.children.length-1].classList[0]).toBe("todo__text--done")
    });

    test ("createHml,done", () => {
        //Arrage
        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `
        let todoExampleCreate = ("middag");
        let todos: Todo[] = [];
        todos.push(new Todo(todoExampleCreate, false));

        //Act
        main.createHtml(todos);    
        let runTodo = document.querySelector("#todos");

        //Assert
        expect(runTodo?.children.length).toBe(todos.length);
        expect(runTodo?.children[runTodo?.children.length-1].classList[0]).toBe("todo__text")
    });
});
/*
test ("toggleTodoStartChangeTodoAndCreateHtml", () => {
    //Arrage
    let todoExampleTrue = ("baka");
    let testTodo = new Todo(todoExampleTrue, true);
    let spyOnChangeTodo = jest.spyOn(main, "changeTodo").mockReturnValue();
    let spyOncreateHtml = jest.spyOn(main, "createHtml").mockReturnValue();
    
    //Act
    main.toggleTodo(testTodo);
    
    //Assert
    expect(spyOnChangeTodo).toHaveBeenCalled();
    expect(spyOncreateHtml).toHaveBeenCalled();
    spyOnChangeTodo.mockRestore();
    spyOncreateHtml.mockRestore();
});*/

describe("displayError", () => {
    test("displayErrorTrue", () => {
        //Arrage
        document.body.innerHTML = `
        <div id="error" class="error"></div>
        `
        let errorContainer: HTMLDivElement = document.getElementById(
            "error") as HTMLDivElement;
    
        //Act
        main.displayError("error", true);
    
        //Assert
        expect(errorContainer.classList[0]).toBe("error");
        expect(errorContainer.classList[1]).toBe("show");
    });

    test("displayErrorFalse", () => {
        //Arrage
        document.body.innerHTML = `
        <div id="error" class="error"></div>
        `
        let errorContainer: HTMLDivElement = document.getElementById(
            "error") as HTMLDivElement;
    
        //Act
        main.displayError("error", false);
    
        //Assert
        expect(errorContainer.classList[0]).toBe("error");
        expect(errorContainer.classList[1]).toBe(undefined);
    });
});

test ("spyOnCreateHtmlInFunctionClearTodos", () => {
    //Arrage
    let todos: Todo[] = [new Todo("Baka", true), new Todo("Handla", true)];
    let spy = jest.spyOn(main, "createHtml").mockReturnValue();
    //Act
    main.clearTodos(todos);
    
    //Assert
    expect(todos.length).toBe(0);
    spy.mockRestore();

});
