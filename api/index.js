import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected and backend is working fine");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on defined port:3000");
});
