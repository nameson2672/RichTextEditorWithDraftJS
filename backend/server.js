import express from "express";

const app = express();

app.use(express.json());

const Port = 5000;
app.listen(Port, console.log(`Server is running on port ${Port}`));