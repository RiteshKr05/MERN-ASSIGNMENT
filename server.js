const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const connectDb = require("./config/db");

//dotenv configuration
dotenv.config();

//DB connection

connectDb();

// rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use(morgan("dev"));

//routes

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/departments", require("./routes/departmentRoute"));
app.use("/api/employees", require("./rou(tes/employees"));
app.use("/api/employees/filter", require("./routes/filter"));

app.get("/", (req, res) => {
  res.send("Hello ");
});

//Port
const PORT = process.env.PORT;

//listen
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
