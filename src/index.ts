import express from "express";

const app = express();
const port = 3000;

const jsonBodyMiddleware = express.json();

app.use(jsonBodyMiddleware);

const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,
  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

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
    foundCourses = db.courses.filter(
      (c) => c.title.indexOf(req.query.title as string) > -1
    );
  }

  res.json(foundCourses);
});

app.get("/courses/:id", (req, res) => {
  const foundedCourses = db.courses.find((c) => c.id === +req.params.id);

  if (!foundedCourses) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }
  res.json(foundedCourses);
});

app.post("/courses", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const newCourse = {
    id: +new Date(),
    title: req.body.title,
  };

  db.courses.push(newCourse);
  res.status(HTTP_STATUSES.CREATED_201);
  res.json(newCourse);
});

app.delete("/courses/:id", (req, res) => {
  db.courses = db.courses.filter((c) => c.id !== +req.params.id);
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.put("/courses/:id", (req, res) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }

  const foundedCourses = db.courses.find((c) => c.id === +req.params.id);

  if (!foundedCourses) {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    return;
  }

  foundedCourses.title = req.body.title;
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
