import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://cascades.stepzen.net/api/sad-sheep/__graphql",
    headers: {
        authorization: `ApiKey ${process.env.STEPZEN_API_KEY}`
    },
    cache: new InMemoryCache()
});

export default client;