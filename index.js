//lets create a todo api
//mandatory codes of express
const express = require("express");
const app = express();
app.use(express.json());
const port = 2601;

//states
let counter = 0;
let todos = [];

//getting todos
app.get("/", function (req, res) {
  res.json({
    todos: todos,
    numberOfTodos: todos.length,
  });
});

//posting request to add todos
app.post("/", function (req, res) {
  const { todoTitle } = req.body;
  console.log("Request Body:", req.body);

  if (!todoTitle) {
    res.json({
      msg: `provide a todoTitle that needs to be added`,
      todos,
    });
    return;
  }

  counter++;
  todos.push({
    id: counter,
    title: todoTitle,
  });
  res.json({
    msg: `added one todo of title ${todoTitle}`,
    todos,
  });
});

//sending a put request we will make sure that a task is completed or not
app.put("/", function (req, res) {
  if (todos.length === 0) {
    res.json({
      error: "nothing to change",
    });
  } else {
    const { id, completed } = req.body;
    const updatedId = todos.find((updatedtodo) => updatedtodo.id === id);
    if (!updatedId) {
      res.json({
        error: "you havent enterd correct id", //the user havent provided the correct id for updation
      });
    }

    updatedId.completed = completed;

    res.json({ message: "updated successfully", todos });
  }
});

//deleting todos
app.delete("/", function (req, res) {
  if (todos.length === 0) {
    return res.json({
      msg: "Nothing to delete, the list is empty",
    });
  }

  const specificIdforDel = req.body?.specificIdforDel;
  console.log("Request Body:", req.body);

  // Case 1: No ID provided — delete last user
  if (!specificIdforDel) {
    const removedUser = todos.pop(); // remove last item
    return res.json({
      msg: "Deleted last user",
      removed: removedUser,
      todos,
    });
  }

  // Case 2: ID provided — handle specific delete
  const index = todos.findIndex((user) => user.id === specificIdforDel);

  if (index === -1) {
    return res.json({
      msg: "User with provided ID not found",
    });
  }

  const deletedUser = todos.splice(index, 1);

  res.json({
    msg: `Deleted user with ID ${specificIdforDel}`,
    deleted: deletedUser[0],
    todos,
  });
});

//the app is running on the give port
app.listen(port, () => {
  console.log(`the app is running on http://localhost:${port}`);
});
