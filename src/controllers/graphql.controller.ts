const express = require('express');
const app = express();
const { ApolloClient, InMemoryCache, HttpLink, gql } = require('@apollo/client');
/* const fetch = require('node-fetch'); */

// Fill in the GraphQL endpoint and your GitHub Personal Access Token inside secrets.
const cache = new InMemoryCache();
const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    fetch,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
    },
  }),
  cache,
});

app.get('/', function (req, res) {
  let repositories = [];
  let endCursor = null;

  function fetchRepositories() {
    client
      .query({
        query: gql`
          query FetchData($after: String) {
            viewer {
              avatarUrl
              bio
              blog
              company
              createdAt
              email
              eventsUrl
              followers
              followersUrl
              following
              followingUrl
              gistsUrl
              gravatarId
              hireable
              htmlUrl
              id
              location
              login
              name
              nodeId
              organizationsUrl
              publicGists
              publicRepos
              receivedEventsUrl
              repos: repositories(first: 100, after: $after) {
                nodes {
                  nameWithOwner
                  description
                  updatedAt
                  createdAt
                  diskUsage
                }
                pageInfo {
                  endCursor
                  hasNextPage
                }
              }
              siteAdmin
              starredUrl
              subscriptionsUrl
              twitterUsername
              type
              updatedAt
              url
            }
          }
        `,
        variables: {
          after: endCursor,
        },
      })
      .then((result) => {
        const { repos, ...userData } = result.data.viewer;
        const { nodes, pageInfo } = repos;
        repositories = repositories.concat(nodes);
        if (pageInfo.hasNextPage) {
          endCursor = pageInfo.endCursor;
          fetchRepositories();
        } else {
          const data = {
            userData,
            repositories,
          };
          console.log(JSON.stringify(data, null, 2));
          res.send('Check your Console for the JSON you requested!');
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('An error occurred while fetching the data.');
      });
  }

  fetchRepositories();
});


app.listen(8000, () => console.log('Example app listening on port 8000!'));
