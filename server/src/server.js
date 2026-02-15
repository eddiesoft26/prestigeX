import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import authRoutes from "./routes/auth.routes.js";

app.use("/api/auth", authRoutes);

// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT || 8000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
