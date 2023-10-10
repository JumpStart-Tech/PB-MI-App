import { Auth } from 'aws-amplify';
// export each function for use
export {userIsNew, saveUserAuthInfo, validateCreds, getLearnerArray, userExists, changePassword, getTherapistInfo, updateTherapist}

// returns true if the email is not found in the server and false otherwise
//this funciton has been upgraded to use Amplify
async function userIsNew(email){
    // const response = await fetch(`http://localhost:3000/authData?email=${email.toLowerCase()}`); //will be able to be done with signUp() in Amplify
    // if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
    //     throw new Error(`HTTP error in userIsNew. status: ${response.status}`);
    // }
    // const responseObj = await response.json();
    // if(responseObj.length > 0){
    //     console.log(`User with email ${email} already exists.`);
    //     return false;
    // }
    // return true;
    try{ //it's stupid but this is the best way to check if a user exists already
        await Auth.confirmSignUp(email, '000000', {
        // If set to False, the API will throw an AliasExistsException error if the phone number/email used already exists as an alias with a different user
        forceAliasCreation: false
        })
    }
    catch(err){
        switch ( err.code ) {
            case 'UserNotFoundException':
                return true;
            case 'NotAuthorizedException':
                return false;
            case 'AliasExistsException':
                // Email alias already exists
                return false;
            case 'CodeMismatchException':
                return false;
            case 'ExpiredCodeException':
                return false;
            default:
                return false;
        }
    }
}

// saves the email and password of a user who just created their account
// this function has been upgraded to use Amplify
async function saveUserAuthInfo(email, password, name){
    // const response = await fetch(`http://localhost:3000/authData`, {
    //             method: 'POST',
    //             headers: {'Content-Type': 'application/json'},
    //             body: JSON.stringify(
    //                 {
    //                     email: email.toLowerCase(),
    //                     password,
    //                 }
    //             )
    //         });
    // if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
    //     throw new Error(`HTTP error in saveUserAuthInfo. status: ${response.status}`);
    // }
    // const {id} = await response.json()
    // console.log('user created. identifier: ' + id);
    try {
        const { user, userSub } = await Auth.signUp({
          username: email,
          password,
          attributes: {
            email: email,
            name,
          },
          autoSignIn: {
            enabled: true,
          }
        });
        console.log("signUp() didn't error");
        return {status: 'Success', message: 'User created', id: userSub};
      } catch (error) {
        console.log('error signing up:', error);
        switch(error.name){
            case 'UsernameExistsException':
                return {status: 'Error', message: error.message, errorLocation: 'email'};
            case 'InvalidPasswordException':
                return {status: 'Error', message: error.message.substring(lastIndexOf('Password did not conform with policy: ' + 1)), errorLocation: 'password'};
            default:
                return {status: 'Error', message: error.message};
        }
      }
    
}

async function validateCreds(email, password){
	try{
    	const response = await Auth.signIn(email, password);
		console.log('response: ', response.attributes.sub);
		return {status: 'Success', message: 'User credentials authenticated', id: response.attributes.sub}
	}
	catch(e){
		switch (e.message) {
			case 'User is not confirmed.':
				return {status: 'Error', message: "User not confirmed. Check email for code", field: 'Password'};
			default:
				return {status: 'Error', message: "Incorrect user or password.", field: 'Password'};
		}
	}
}

// gets all patient data for a given therapist
//this function hasn't been upgraded; still uses the local data source, not Amplify
async function getLearnerArray(therapistId){
    const response = await fetch(`http://localhost:3000/therapists?id=${therapistId}`);
    if(!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
        throw new Error(`HTTP error in getLearnerArray. status: ${response.status}`);
    }
    const responseArr = await response.json();
    // check that patients field has data
    if (responseArr && responseArr.length > 0 && responseArr[0].patients) {
      return responseArr[0].patients;
    } else {
      throw new Error('No patient data associated with userID.');
    }
}

// gets therapist title, affiliation, and confidence level for use in the profile screen
//this function hasn't been upgraded; still uses the local data source, not Amplify
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

// ensures the user with the entered email address exists
//this function hasn't been upgraded; still uses the local data source, not Amplify
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

// finds the user with the associated email and updates their password to the value passed into the function
//this function hasn't been upgraded; still uses the local data source, not Amplify
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

// allows the therapist profile data to be updated when changes are made
//this function hasn't been upgraded; still uses the local data source, not Amplify
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
