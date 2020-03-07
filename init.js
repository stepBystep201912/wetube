import dotenv from "dotenv";
import app from "./app";
import "./db";
// We need to import the Models so mongoose is aware of them.
import "./models/Video";
import "./models/Comment";

dotenv.config();

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
