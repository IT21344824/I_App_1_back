const express = require('express');
const signupRoute = require("./src/routes/SignupRoute");
const loginRoute = require("./src/routes/LoginRoute");
const AuthenticatedRoute = require("./src/routes/AuthenticatedRoute");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(cors());

// Home route
app.get('/', (req, res) => {
    res.send('Hello');
});

app.use("/user", signupRoute);
app.use("/auth", loginRoute);
app.use("/api", AuthenticatedRoute);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})