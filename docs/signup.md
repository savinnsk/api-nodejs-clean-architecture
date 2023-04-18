## SUCCESS

✅ Receives a POST request on the route /api/signup
✅ Validates name, email, password, and passwordConfirmation as required data
✅ Validates that password and passwordConfirmation are equal
✅ Validates that the email field is a valid email address
✅ Validates if there is already a user with the provided email
✅ Generates a encrypted password (this password cannot be decrypted)
✅ Creates an account for the user with the provided data, replacing the password with the encrypted password
✅ Generates an access token from the user's ID
✅ Updates the user's data with the generated access token
✅ Returns 200 with the access token and the user's name

## ERRORS

✅ Returns 404 error if the API does not exist
✅ Returns 400 error if name, email, password, or passwordConfirmation are not provided by the client
✅ Returns 400 error if password and passwordConfirmation are not equal
✅ Returns 400 error if the email field is an invalid email address
✅ Returns 403 error if the provided email is already in use
✅ Returns 500 error if there is an error when trying to generate an encrypted password
✅ Returns 500 error if there is an error when trying to create the user's account
✅ Returns 500 error if there is an error when trying to generate the access token
✅ Returns 500 error if there is an error when trying to update the user with the generated access token
