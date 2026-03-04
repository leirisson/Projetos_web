import sdk  from 'node-appwrite'
import { env } from '../env';

export default sdk;
export let client = new sdk.Client();

client
    .setEndpoint(env.APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(env.APPWRITE_PROJECT_ID) // Your project ID
    .setKey(env.APPWRITE_API_KEY) // Your secret API key
    ;

