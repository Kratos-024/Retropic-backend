import dotenv from "dotenv";
import app from "./app.js";
dotenv.config({ path: ".env" });

const PORT = process.env.PORT || 3000; // Provide default port

app.listen(PORT, () => {
  console.log(`Server has started on: http://localhost:${PORT}`);
});
