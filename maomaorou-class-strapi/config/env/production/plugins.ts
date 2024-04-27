export default ({ env }) => ({
  graphql: {
    config: {
      endpoint: "/graphql",
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 20,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
      },
    },
  },
})