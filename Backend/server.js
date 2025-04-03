import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";
import technologyRoutes from "./routes/technologyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";

dotenv.config();
const app = express();

connectDB();

app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL || "https://ansh-portfolio-phi.vercel.app";
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.use("/api/blogs", blogRoutes);
app.use("/api/portfolios", portfolioRoutes);
app.use("/api/technologies", technologyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/chatbot", chatbotRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/db.js";
// import blogRoutes from "./routes/blogRoutes.js";
// import portfolioRoutes from "./routes/portfolioRoutes.js";
// import technologyRoutes from "./routes/technologyRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";

// dotenv.config();
// const app = express();

// connectDB();

// app.use(express.json());

// app.use("/api/blogs", blogRoutes);
// app.use("/api/portfolios", portfolioRoutes);
// app.use("/api/technologies", technologyRoutes);
// app.use("/api/admin", adminRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
