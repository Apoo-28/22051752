const axios = require('axios');

// Configuration variables
const WINDOW_SIZE = 10; // Maximum size of the window
let windowState = []; // Stores numbers within the window

/**
 * Handle requests to /numbers/:numberid.
 */
async function handleNumberRequest(req, res) {
  const { numberid } = req.params;

  // Validate number ID (must be 'p', 'f', 'e', or 'r')
  if (!['p', 'f', 'e', 'r'].includes(numberid)) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }

  try {
    // Fetch numbers from third-party API (mocked here)
    const response = await fetchNumbersFromAPI(numberid);
    const numbers = response.data.numbers;

    // Ensure unique numbers and remove duplicates
    const uniqueNumbers = [...new Set(numbers)];

    // Update window state with new numbers while maintaining size limit
    const prevState = [...windowState];
    windowState.push(...uniqueNumbers);

    if (windowState.length > WINDOW_SIZE) {
      windowState = windowState.slice(windowState.length - WINDOW_SIZE);
    }

    // Calculate average of numbers in the current window state
    const avg =
      windowState.reduce((sum, num) => sum + num, 0) / windowState.length;

    // Respond with previous state, current state, fetched numbers, and average
    res.json({
      windowPrevState: prevState,
      windowCurrState: windowState,
      numbers: uniqueNumbers,
      avg: parseFloat(avg.toFixed(2)), // Round to 2 decimal places
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from third-party API' });
  }
}

/**
 * Mock function to fetch numbers from a third-party API.
 */
async function fetchNumbersFromAPI(numberid) {
  const apiUrl = `http://localhost:3000/numbers/${numberid}`;

  try {
    const response = await axios.get(apiUrl, { timeout: 500 }); // Timeout after 500ms
    return response;
  } catch (error) {
    throw new Error('Third-party API request failed or timed out');
  }
}

module.exports = { handleNumberRequest };
