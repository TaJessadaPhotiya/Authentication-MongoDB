require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// เชื่อมต่อ MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/auth", require("./routes/authRoutes"));

app.listen(port, () => console.log(`Server running on port ${port}`));
