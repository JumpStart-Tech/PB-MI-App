
export default async function signUp(email, password){
    try{
        const response = await fetch(`http://localhost:3000/authData?email=${email}`); //will be able to be done with signUp() in Amplify
        if (!response.ok) { // response.ok is false if the HTTP status code is 400 or higher
            throw new Error(`HTTP error. status: ${response.status}`);
        }
        const responseObj = await response.json();
        if(responseObj.length > 0){
            console.log('user already exists');
            return {status: 'Error', message: 'User already exists'};
        }
        else{
            const response2 = await fetch(`http://localhost:3000/authData`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        email,
                        password,
                    }
                )
            });
            const {id} = await response2.json()
            console.log('user created. identifier: ' + id);
            return {status: 'Success', message: 'User created', id};
        }
    }
    catch(e){
        console.log('error: ' + e);
    }
}