/**
 * @jest-environment jsdom
 */

import * as main from '../ts/main'
import { createNewTodo } from "../ts/main";
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
        createNewTodo(todoExample, todos);

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
        createNewTodo(todoExample, todos);

        //Assert
        expect(todos.length).toBe(length);

        spy.mockRestore();
    });
});

describe("createHml", () => {
    test ("createHml,done", () => {

        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `
        let todoExampleCreate = ("baka");
        let todos: Todo[] = [];
        todos.push(new Todo(todoExampleCreate, true));

        main.createHtml(todos);    

        let runTodo = document.querySelector("#todos");

        expect(runTodo?.children.length).toBe(todos.length);
        expect(runTodo?.children[runTodo?.children.length-1].classList[0]).toBe("todo__text--done")
    });

    test ("createHml,done", () => {

        document.body.innerHTML = `
        <ul id="todos" class="todo"></ul>
        `
        let todoExampleCreate = ("middag");
        let todos: Todo[] = [];
        todos.push(new Todo(todoExampleCreate, false));

        main.createHtml(todos);    

        let runTodo = document.querySelector("#todos");

        expect(runTodo?.children.length).toBe(todos.length);
        expect(runTodo?.children[runTodo?.children.length-1].classList[0]).toBe("todo__text")
    });
});