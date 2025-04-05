//lets create a todo api
//mandatory codes of express
const express = require("express");
const app = express();
const port = 2000;

app.use(express.json());

//states
let counter = 0;
let users = [];

//getting todos
app.get("/", function (req, res) {
  res.json({
    todos: users,
    numberOfTodos: users.length,
  });
});

//posting request to add todos
app.post("/", function (req, res) {
  const list = req.body.list;
  counter++;
  users.push({
    id: counter,
    title: list,
  });
  res.json({
    msg: "added one todo",
    users,
  });
});

//sending a put request we will make sure that a task is completed or not
app.put("/", function (req, res) {
  if (users.length === 0) {
    res.json({
      error: "nothing to change",
    });
  } else {
    const { id, completed } = req.body;
    const todoid = users.find((updatedtodo) => updatedtodo.id === id);
    if (!todoid) {
      res.json({
        error: "you havent enterd correct id",
      });
    }

    todoid.completed = completed;

    res.json({ message: "updated successfully", users });
  }
});

//deleting todos
app.delete("/", function (req, res) {
  if (users.length === 0) {
    res.sendStatus(411).send("nothing to delete");
  } else {
    let newList = [];
    for (let i = 0; i < users.length; i++) {
      let removedlist = users.splice(users.length - 1, 1);
      removedlist.push(newList);
    }
    newList = users;
    res.json({
      msg: "the list have been deleted",
      users,
    });
  }
});

//the app is running on the give port
app.listen(port, () => {
  console.log(`the app is running on http://localhost:${port}`);
});
