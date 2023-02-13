# Note
    taken concert on of time and effort I have done as this by:
        1. Used Express and sqlite database for simple and easy to code the requirement 
        2. Used basic level express and routes to handle the required endpoints to implementation 
        3. Added Jest sample unit testing to ensure the api endpoint working

    The application is written in NodeJS 14+ and TypeScript. It provides the following endpoints for user management:

        POST /users - for adding a user
        GET /users/1 - for fetching a particular user
        DELETE /users/1 - for deleting a particular user
        The application uses an in-memory database for storing user information.

        To run the application, please follow these steps:
            Install the dependencies: npm install
            Build the application: npm run build
            Start the application: npm start
        The application will be running on http://localhost:3000. You can use an API client like Postman to interact with the endpoints.

# To run this API, you will need to have the following installed on your system:
    Node.js
    Express.js
    body-parser
    sqlite3
    supertest
    jest

# install the npm packages
    npm install

# start the node app
    npm run start

This will start the API server and you will be able to send HTTP requests to the endpoints using a tool such as Postman or cURL.

# to test the API's end point
    npm test