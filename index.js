const app = require("./app");
const connectDB = require("./config/db");

// connect to database
connectDB();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
