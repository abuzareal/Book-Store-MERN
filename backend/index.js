import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js"
import booksRoute from "./routes/bookRoutes.js"
import cors from 'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS policy

//Option 1: We allow all origins in the below syntax
app.use(cors());

//Option 2: We allow custom origins in the below syntax
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type']
  })
)

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome");
});

app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT} `)
    });
  })
  .catch((error) => {
    console.log(error);
  })