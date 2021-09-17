require("express-async-errors");
const app = require("express")();
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger.json");

// Pre-route middlewares
require("./src/middlewares/pre-route.middleware")(app);

// API routes
app.use("/api", require("./src/routes"));


app.use('/docs', swaggerUi.serve);
app.get('/docs', swaggerUi.setup(swaggerDoc));

// Ping route for testing connection
app.get("/", (req, res) => res.status(200).send(`

<h1>Hello users !<h1/>
<h1>click on this <a href="/docs">link<a/> to get  documentation on the blog post api !<a href="/docs">click me<a/></h1> 


`));





module.exports = app