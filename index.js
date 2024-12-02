const express = require("express");

const app = express();
const apirouter = require("./router");

// api middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/user", apirouter);

app.listen(3000, () => console.log("running on 3000 port"));
