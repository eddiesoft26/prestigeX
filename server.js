import dotenv from "dotenv";
dotenv.config();
import app from "./src/app";

const PORT = process.env.PORT || 8000;

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, "0.0.0.0", () => {
  // Added 0.0.0.0 for Koyeb/Production
  console.log(`Server running on port ${PORT}`);
});
