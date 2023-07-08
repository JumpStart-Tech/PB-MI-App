export {userIsNew, saveUserAuthInfo, validateCreds, getLearnerArray, userExists, changePassword, getTherapistInfo, updateTherapist}

async function userIsNew(email){
    const response = await fetch(`http://localhost:3000/authData?email=${email.toLowerCase()}`); //will be able to be done with signUp() in Amplify
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in userIsNew. status: ${response.status}`);
    }
    const responseObj = await response.json();
    if(responseObj.length > 0){
        console.log(`User with email ${email} already exists.`);
        return false;
    }
    return true;
}

async function saveUserAuthInfo(email, password){
    const response = await fetch(`http://localhost:3000/authData`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        email: email.toLowerCase(),
                        password,
                    }
                )
            });
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in saveUserAuthInfo. status: ${response.status}`);
    }
    const {id} = await response.json()
    console.log('user created. identifier: ' + id);
    return {status: 'Success', message: 'User created', id};
}

async function validateCreds(email, password){
    const response = await fetch(`http://localhost:3000/authData?email=${email.toLowerCase()}`); //will be able to be done with signUp() in Amplify
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in validateCreds. status: ${response.status}`);
    }
    const responseArray = await response.json(); //the db query returns an array
    if(responseArray.length == 0){
        console.log(`User with email ${email} doesn't exist`);
        return {status: 'Error', message: "Email doesn't exist.", field: 'Email'};
    }
    const responseObj = responseArray[0]; //array should always have 1 element at this point b/c only 1 account can be created per email
    if(responseObj.password != password){
        console.log('User entered incorrect password');
        return {status: 'Error', message: 'Incorrect password.', field: 'Password'};
    }
    return {status: 'Success', message: 'User credentials authenticated', id: responseObj.id}
}

async function getLearnerArray(therapistId){
    const response = await fetch(`http://localhost:3000/therapists?id=${therapistId}`);
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in getLearnerArray. status: ${response.status}`);
    }
    const responseArr = await response.json();
    return responseArr[0]['patients'];
}

async function getTherapistInfo(therapistId){
    const response = await fetch(`http://localhost:3000/therapists?id=${therapistId}`);
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in getTherapistInfo. status: ${response.status}`);
    }
    const responseArr = await response.json();
    const title = responseArr[0]['title'];
    const affiliation = responseArr[0]['affiliation'];
    const confidence = responseArr[0]['confidence'];
    return {title, affiliation, confidence};
}


async function userExists(email, setEmail){
    const response = await fetch(`http://localhost:3000/authData?email=${email.toLowerCase()}`);
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in userExists. status: ${response.status}`);
    }
    const responseObj = await response.json();
    if (!(responseObj.length > 0)) {
        console.log(`User with email ${email} does not exist.`);
        return false;
    }
    return true;
}

async function changePassword(email, password){
    const response = await fetch(`http://localhost:3000/authData?email=${email.toLowerCase()}`); //will be able to be done with signUp() in Amplify
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in changePassword. status: ${response.status}`);
    }
    const responseArray = await response.json(); //the db query returns an array
    if(responseArray.length == 0){
        console.log(`User with email ${email} doesn't exist`);
        return {status: 'Error', message: "Email doesn't exist.", field: 'Email'};
    }
    const responseObj = responseArray[0]; //array should always have 1 element at this point b/c only 1 account can be created per email
    responseObj.password = password; // set new password

    // Send the updated password to the server
    const updateResponse = await fetch(`http://localhost:3000/authData/${responseObj.id}`, {
        method: 'PUT', // or 'PATCH' depending on your server API
        headers:  {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseObj),
    });

    if (!updateResponse.ok) {
        throw new Error(`HTTP error in changePassword update. status: ${updateResponse.status}`);
    }
    return {status: 'Success', message: 'User password changed', id: responseObj.id}
}

async function updateTherapist(therapistId, updatedData) {
  try {
    const response = await fetch(`http://localhost:3000/therapists/${therapistId}`); //will be able to be done with signUp() in Amplify
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in updateTherapist. status: ${response.status}`);
    }
    const responseArray = await response.json(); //the db query returns an array
    if(responseArray.length == 0){
        console.log(`User with id ${therapistId} doesn't exist`);
        return {status: 'Error', message: "User ID doesn't exist.", field: 'id'};
    }
    const responseObj = responseArray; //array should always have 1 element at this point b/c only 1 account can be created per email
    const { title, affiliation, confidence } = updatedData;
    if (title) {
      responseObj.title = title; // set new title
    }
    if (affiliation) {
      responseObj.affiliation = affiliation; // set new title
    }
    if (confidence) {
      responseObj.confidence = confidence; // set new title
    }

    const updateResponse = await fetch(`http://localhost:3000/therapists/${therapistId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseObj),
    });

    if (!updateResponse.ok) {
      throw new Error(`HTTP error in updateTherapist. status: ${response.status}`);
    }
    console.log('Therapist updated successfully');
  } catch (error) {
    console.error('Error updating therapist:', error);
  }
}
