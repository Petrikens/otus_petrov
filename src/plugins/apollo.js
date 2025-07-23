import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const httpLink = createHttpLink({
    uri: 'https://countries.trevorblades.com/', // публичный GraphQL endpoint
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

export default {
    install(app) {
        app.provide(DefaultApolloClient, apolloClient)
    },
}
