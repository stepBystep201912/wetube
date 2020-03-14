import dotenv from "dotenv";
import "./db";
import app from "./app";

dotenv.config();

// We need to import the Models so mongoose is aware of them.
import "./models/Video";
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
