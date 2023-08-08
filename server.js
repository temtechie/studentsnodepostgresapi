const express = require('express');
const port = 8080;
const studentRouter = require('./src/student/apiroutes/routes');

const app = express();
app.use(express.json());

app.use('/api/v1/students', studentRouter)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});