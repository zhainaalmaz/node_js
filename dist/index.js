"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const db = {
    courses: [
        {
            id: 1,
            title: "javascript",
        },
        {
            id: 2,
            title: "java",
        },
        {
            id: 3,
            title: "python",
        },
    ],
};
app.get("/", (req, res) => {
    res.send({ message: "Hello World!" });
});
app.get("/courses", (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        foundCourses = db.courses.filter((c) => c.title.indexOf(req.query.title) > -1);
    }
    res.json(foundCourses);
});
app.get("/courses/:id", (req, res) => {
    const foundedCourses = db.courses.find((c) => c.id === +req.params.id);
    if (!foundedCourses) {
        res.sendStatus(404);
        return;
    }
    res.json(foundedCourses);
});
app.post("/courses", (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const newCourse = {
        id: +new Date(),
        title: req.body.title,
    };
    db.courses.push(newCourse);
    res.status(201);
    res.json(newCourse);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
