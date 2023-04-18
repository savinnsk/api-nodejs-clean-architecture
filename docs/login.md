## SUCCESS

✅ Receives a POST request on route /api/login
✅ Validates mandatory data email and password
✅ Validates that the email field is a valid email
✅ Searches for the user with the provided email and password
✅ Generates an access token from the user ID
✅ Updates the user's data with the generated access token
✅ Returns 200 with the access token and user's name

## ERRORS

✅ Returns 404 error if the API does not exist
✅ Returns 400 error if email or password are not provided by the client
✅ Returns 400 error if the email field is an invalid email
✅ Returns 401 error if it does not find a user with the provided data
✅ Returns 500 error if an error occurs while trying to generate the access token
✅ Returns 500 error if an error occurs while trying to update the user with the generated access token.
