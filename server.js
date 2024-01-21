const express = require('express');
const mongoose = require('mongoose');
// REVIEW: Comments are important, you should add comments especially to functions and complex code blocks to make the code more readable and understandable.
// REVIEW: It is better to add unit and integration tests to the code to make sure that it works as expected and to avoid regressions. (The test coverage should be at least 80%).
// REVIEW: Configure NODE_ENV (development, production, test) to use different configurations for each environment. It is especially important to use a different database for the test environment to avoid data corruption. Another example of NODE_ENV: The debugging should be disabled in the production environment.
// REVIEW: You should respect the naming convention of the variables, functions, and files. Example, the file name /src/models/Product.js should be /src/models/product.js (camelCase), as the other files of the project are in camelCase.
const productRoutes = require('./src/routes/productRoutes'); // REVIEW: (Depends on the project configurations) => Update the path to the correct one as in the project structure, the server.js file is in the root folder and the routes directory is in the src directory.
const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect('mongodb://admin:1234@localhost:27017/database', { // REVIEW: The connection string contains sensitive information, it is better to use environment variables to store it, or store its sensitive parts in environment variables (You can use the dotenv package to do that depending on the project conventions).
  //useNewUrlParser: true, useUnifiedTopology: true // REVIEW: useNewUrlParser and useUnifiedTopology are deprecated, they are not needed anymore, they may cause errors in the future if you keep them.
});
app.use(express.json());
app.use('/', productRoutes); // REVIEW: It is better to use a prefix for the routes at this level (app.use('/api', productRoutes);) instead of using it in each route file for multiple times. 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});