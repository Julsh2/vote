const express = require("express");
const app = express();
const port = 3000;

// Serve static files (your p5.js sketch)
app.use(express.static(__dirname));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
