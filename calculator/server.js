const app = require('./src/app');

// Define the port number (9876 as per the requirement)
const PORT = 9876;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
