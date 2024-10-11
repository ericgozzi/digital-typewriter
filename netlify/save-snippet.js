// Step 1: Import the 'fetch' function to send requests
const fetch = require('node-fetch');

// Step 2: Create the main function that will handle the request
exports.handler = async function (event, context) {
  try {
    // Step 3: Get the HTML snippet sent by the user (from the event's body)
    const { htmlSnippet } = JSON.parse(event.body);

    // Step 4: If no snippet is provided, return an error message
    if (!htmlSnippet) {
      return {
        statusCode: 400, // Error status code
        body: JSON.stringify({ message: 'No HTML snippet provided' }),
      };
    }

    // Step 5: Define where the HTML snippet will be stored (your Netlify Blob URL)
    const blobUrl = `https://codedtext.netlify.app/.netlify/functions/blob`;

    // Step 6: Send the HTML snippet to Netlify Blobs
    const response = await fetch(blobUrl, {
      method: 'POST',  // This is a "send" request
      headers: {
        'Content-Type': 'text/html',  // Letting it know it's HTML
      },
      body: htmlSnippet,  // Here's the actual HTML content being saved
    });

    // Step 7: Get the URL of the saved snippet from the response
    const blobData = await response.json();
    console.log(blobData)

    // Step 8: Return success message and URL of the saved HTML snippet
    return {
      statusCode: 200,  // Success code
      body: JSON.stringify({
        message: 'HTML Snippet saved successfully!',
        blobUrl: blobData.url,  // URL of the saved snippet
      }),
    };
  } catch (error) {
    // Step 9: Return an error message if something goes wrong
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error saving snippet', error: error.toString() }),
    };
  }
};
