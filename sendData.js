//function is supposed to accept data as an argument and post it to the server. Need to update url and endpoint accordingly.
//Note: currently not functioning

const sendDataToServer = (data) => {
  fetch('http://your-json-server-url/your-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData); // Optional: Handle the response data
    })
    .catch((error) => {
      console.error(error);
    });
};