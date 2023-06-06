//import { router, get, post, options} from 'microrouter';
import { ApolloServer } from 'apollo-server-micro';
import { ApolloGateway } from '@apollo/gateway';
import Cors from 'micro-cors-multiple-allow-origin';
//import Cors from 'micro-cors';

const cors = Cors(
  {
    origin:["https://studio.apollographql.com", "https://hoppscotch.io"],
    allowMethods:["GET","POST"],
    allowHeaders:["Access-Control-Allow-Credentials","true","Content-Type","Access-Control-Allow-Origin","Access-Control-Allow-Headers"]
  }
);
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'client-api', url: 'http://localhost:8065/client-api/graphql'},
  ],
});

const server = new ApolloServer({
  gateway});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default cors(async function handler(req, res) {
  await startServer;
  if(req.method==="OPTIONS"){
    res.end()
    return false
  }
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
