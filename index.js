//lets create a todo api
//mandatory codes of express
const express = require("express");
const app = express();
app.use(express.json());
const port = 1601;

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
    return res.json({
      msg: "Nothing to delete, the list is empty",
    });
  }

  const specificIdforDel = req.body?.specificIdforDel;
  console.log("Request Body:", req.body);

  // Case 1: No ID provided — delete last user
  if (!specificIdforDel) {
    const removedUser = users.pop(); // remove last item
    return res.json({
      msg: "Deleted last user",
      removed: removedUser,
      users,
    });
  }

  // Case 2: ID provided — handle specific delete
  const index = users.findIndex((user) => user.id === specificIdforDel);

  if (index === -1) {
    return res.json({
      msg: "User with provided ID not found",
    });
  }

  const deletedUser = users.splice(index, 1);

  res.json({
    msg: `Deleted user with ID ${specificIdforDel}`,
    deleted: deletedUser[0],
    users,
  });
});

//the app is running on the give port
app.listen(port, () => {
  console.log(`the app is running on http://localhost:${port}`);
});
