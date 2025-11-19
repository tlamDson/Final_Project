import express from "express";
import "dotenv/config";
import cors from "cors"; // connect to the frontend
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
const app = express();

await connectDB();
//middlewares
//all the request will be passed using json method
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/admin", adminRouter);
app.use("/api/blog", blogRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
});

export default app;
