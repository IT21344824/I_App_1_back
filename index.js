const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

//routes
const signupRoute = require("./src/routes/SignupRoute");
const loginRoute = require("./src/routes/LoginRoute");
const AuthenticatedRoute = require("./src/routes/AuthenticatedRoute");
const fileUploadRoute = require("./src/routes/FileUploadRoute");
const productRoute = require("./src/routes/productRoute");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", AuthenticatedRoute);
app.use("/imgUpload", fileUploadRoute);
app.use("/products", productRoute);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
