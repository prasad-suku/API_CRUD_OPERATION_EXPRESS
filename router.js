const express = require("express");
const router = express.Router();

const users = [
  { id: 1, name: "arun", age: 20 },
  { id: 2, name: "kamesh kumar", age: 24 },
  { id: 3, name: "prasad", age: 21 },
  { id: 4, name: "suresh", age: 22 },
  { id: 5, name: "kamalesh", age: 20 },
];
// crud api operation

//  get method to serve all user data
router.get("/", (req, res) => {
  res.json(users);
});

// get method to serve specific value, based on params id
router.get("/:id", (req, res) => {
  // the params id we pass in url is string that must be parsed into int
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "id must be number!" });
  }

  let user = users.filter((u) => u.id == id);

  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
  res.status(200).json(user);
});

// post method to create an value to an extisting users array

router.post("/post", (req, res) => {
  let data = req.body;
  console.log(data);

  if (!data) {
    return res
      .status(400)
      .json({ error: "It seem you does not provide values " });
  }
  users.push(data);
  return res.status(201).json(data);
});

// delete method to delete

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "Id must be a number" });
  }

  const deletedId = users.findIndex((u) => u.id === id);

  //   if id not match it returns -> -1
  if (deletedId == -1) {
    return res.status(404).json({ error: "User not found" });
  }

  //   slice user from users array using splice method

  const deleted = users.splice(deletedId, 1);

  res
    .status(200)
    .json({ message: "User delete succesfully", deleted: deleted });
});

// put method to perform update operation

router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id); // Extract ID from URL
  const { name, age } = req.body; // Extract new data from the request body

  // Find the user by ID
  const user = users.find((u) => u.id === userId);
  console.log(user);

  if (!user) {
    return res.status(404).json({ message: "User not found" }); // User not found
  }

  // Updated array is reference type so it will update to users array
  if (name) user.name = name;
  if (age) user.age = age;

  res.json({ message: "User updated successfully", user });
});

module.exports = router;
