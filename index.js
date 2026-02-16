import dotenv from "dotenv";
dotenv.config();
import app from "./src/app";
import prisma from "./src/prisma";

const PORT = process.env.PORT || 8000;

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

prisma
  .$connect()
  .then(() => console.log("DataBase connected successfuly"))
  .catch((err) => {
    console.error("database error:", err);
    process.exit(1);
  });

app.listen(PORT, "0.0.0.0", () => {
  // Added 0.0.0.0 for Koyeb/Production
  console.log(`Server running on port ${PORT}`);
});
