import axios from "axios";
import todoApi from "../todo-api";
import taskService from "../task-service";

axios.defaults.adapter = require("axios/lib/adapters/http");
axios.defaults.baseURL = "http://localhost:3001";

jest.mock("../task-service");

const testData = [
    { id: 1, title: "Les leksjon", done: 1 },
    { id: 2, title: "Møt opp på forelesning", done: 0 },
    { id: 3, title: "Gjør øving", done: 0 },
];

let webServer;
beforeAll(done => webServer = todoApi.listen(3001, () => done()));

afterAll(done => webServer.close(() => done()));


describe("Fetch tasks (GET)", () => {
    test("Fetch all tasks (200 OK)", async () => {
        taskService.getAll = jest.fn(() => Promise.resolve(testData));

        const response = await axios.get("/api/v1/tasks");
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testData);
    });

    test("Fetch task (200 OK)", async () => {
        taskService.get = jest.fn(() => Promise.resolve(testData[0]));

        const response = await axios.get("/api/v1/tasks/1");
        expect(response.status).toEqual(200);
        expect(response.data).toEqual(testData[0]);
    });

    test("Fetch all tasks (500 Internal Server Error)", async () => {
        // Reject the request, this should return an error with code 500
        taskService.getAll = jest.fn(() => Promise.reject());
        
        try {
            const response = await axios.get("/api/v1/tasks");
        } catch (error) {
            expect(error.response.status).toEqual(500);
        }
    });

    test("Fetch task (404 Not Found)", async () => {
        // Resolve with empty array, this should return 404 not found
        taskService.get = jest.fn(() => Promise.resolve([]));

        try {
            await axios.get("/api/v1/tasks/1");
        } catch (error) {
            expect(error.response.status).toEqual(404);
        }
    });

    test("Fetch task (500 Internal Server error)", async () => {
        // Reject promise, this should return an error with code 500
        taskService.get = jest.fn(() => Promise.reject());

        try {
            await axios.get("/api/v1/tasks/1");
        } catch (error) {
            expect(error.response.status).toEqual(500);
        }
    });
});

describe("Create new task (POST)", () => {
    test("Create new task (201 Created)", async () => {
        const newTask = { id: 4, title: "Ny oppgave", done: false };
        taskService.create = jest.fn(() => Promise.resolve(testData[3]));
        
        const response = await axios.post("/api/v1/tasks", newTask);
        expect(response.status).toEqual(201);
        expect(response.headers.location).toEqual("tasks/4");
    });

    test("Create new task (400 Bad Request)", async () => {
        // Pass task with missing id, this should return an error
        const newTask = { title: "Ny oppgave", done: false}; 
        taskService.create = jest.fn(() => Promise.resolve());
        
        try {
            await axios.post("/api/v1/tasks", newTask);
        } catch (error) {
            expect(error.response.status).toEqual(400);
        }
    });

    test("Create new task (500 Internal Server error)", async () => {
        const newTask = { id: 4, title: "Ny oppgave", done: false};
        // Reject the request (pretend there is an server error), this should return an error with code 500
        taskService.create = jest.fn(() => Promise.reject()); 
        
        try {
            await axios.post("/api/v1/tasks", newTask);
        } catch (error) {
            expect(error.response.status).toEqual(500);
        }
    });
});

describe("Delete task (DELETE)", () => {
    test("Delete task (200 OK)", async () => {
        taskService.delete = jest.fn(() => Promise.resolve(testData));
        const response = await axios.delete("/api/v1/tasks/4");
        expect(response.status).toEqual(200);
    });
});
