import dotenv from "dotenv";
dotenv.config();

import app from "./app.js"; // This already has all your routes!

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => { // Added 0.0.0.0 for Koyeb/Production
  console.log(`Server running on port ${PORT}`);
});