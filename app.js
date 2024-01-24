const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

const todosRouter = require("./todos/routes");
const port = 3000;

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://dattu:PTMWzvO2JMYeaEP2@cluster0.bjjvopu.mongodb.net/todos?retryWrites=true&w=majority"
  );
}

mongoose.connection.on("error", function (e) {
  console.log("db: mongodb error " + e);
});

mongoose.connection.on("connected", function (e) {
  console.log("db: mongodb is connected ");
});

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/todos", todosRouter);

try {
  connectDB();
} catch (error) {
  console.log("Error connecting db: " + error);
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
