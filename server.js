
const app = require("./app.js");
const { PORT } = process.env;
// Error middlewares
require("./src/middlewares/error.middleware")(app);

// Listen to server port
app.listen(PORT, async () => {
     //Initialize MongoDB
     await require("./src/config/mongo-db.config").connection()
     console.log(`:::> Server listening on port ${PORT} @ http://localhost:${PORT}`);
});

// On  server error
app.on("error", (error) => {
     console.error(`<::: An error occurred on the server: \n ${error}`);
});