import express from "express";
import path from 'path'
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

import uploadeImage from './uplodeIMG.js';

// api routes
app.use("/uploadImage", uploadeImage);


//To send static image by src link
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

const Port = 5000;
app.listen(Port, console.log(`Server is running on port ${Port}`));