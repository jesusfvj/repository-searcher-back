# repository-searcher-back - GitHub Dashboard

This is a backend application built with Node.js and Express, serving as the server for the [repository-searcher-front](https://github.com/jesusfvj/repository-searcher-front.git). The backend handles user authentication, retrieves data from the GitHub GraphQL API, and interacts with a MongoDB database for data persistence.

## Technologies Used

- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express: A fast and minimalist web application framework for Node.js.
- Axios: A promise-based HTTP client for making API requests.
- Cors: A middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.
- Dotenv: A module for loading environment variables from a .env file.
- Express-GraphQL: A library for creating GraphQL servers with Express.
- Helmet: A middleware for securing HTTP headers in Express.
- JSON Web Token (jsonwebtoken): A library for creating and verifying JSON Web Tokens.
- Mongoose: An object modeling tool for MongoDB.

## Installation

Follow the steps below to run the backend application:

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies: `npm install`
3. 3. Create an OAuth app in your GitHub account if you haven't done so before:
   - Go to your GitHub account settings.
   - Navigate to "Developer settings" > "OAuth Apps."
   - Click on "New OAuth App" to create a new OAuth application.
   - Provide the necessary details for your application.
   - Set the authorization callback URL to the URL where your application will be running.
   - Once the OAuth app is created, you will receive a client ID and a secret ID. Make a note of it.
4. Create a `.env.development` and a `.env.production` file in the root directory of the project.
5. Add the following information to the both files and complete according to the stage of the proccess:
   ```
   # SERVER
   PORT=<your-port-number>

   # MONGODB
   MONGODB_URL=<your-mongodb-url>

   # GITHUB AUTH0
   CLIENT_ID=<your-github-auth0-client-id>
   CLIENT_SECRET=<your-github-auth0-client-secret>

   # JSONWEBTOKEN
   TOKEN_SECRET=<a-string-of-your-choice>
   ```
5. Start the server: `npm start`
6. The backend application will be running at the specified port.

## API endpoints

### - Get the logging user's personal token from GitHub

The endpoint used for this proccess is the following:
```https://github.com/login/oauth/access_token?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&code=CODE```

-Once the OAuth app is created, you will receive the client ID and the secret ID.
-The CODE is given to the user once they have granted permission to GitHub to login to this app with their GitHub account.

### - Get the GitHub data from GitHub using GraphQL

GraphQL is used in this backend application to efficiently fetch all the required information from the GitHub API in a single request. To construct the GraphQL query, the [GitHub GraphQL Explorer](https://docs.github.com/graphql/overview/explorer) page was utilized. This allowed for testing and building the query, ensuring that the correct information is retrieved and returning an error if any issues arise.
The request is sent to the GitHub GraphQL API endpoint: ```https://api.github.com/graphql```

-The logging user's personal token from GitHub will be needed in the geaders of the request to retrieve the user's data.

## Contributing

Contributions are welcome! If you find any issues or want to contribute to the project, please feel free to open a pull request or submit an issue on the GitHub repository.

## License

This project is licensed under the [MIT License](link-to-license-file).
