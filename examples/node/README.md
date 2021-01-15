# UCL API JavaScript SDK

## Installation

This SDK provides an easy method for you to use the UCL API via a package installed from npm.

This takes away the pain of having to worry about the actual HTTP requests, and just get straight into coding.

To install the SDK, run the following command in the root of your project:

``` npm install @uclapi/sdk ```

You can find a comprehensive documentation of the SDK here: https://www.npmjs.com/package/@uclapi/sdk, and a comprehensive documentation of the API here: https://uclapi.com/docs.

In addition, the `examples.js` file contains examples of how to use all the available endpoints.

If you do require to make an OAuth application, you will need to have a local/live website for the authentication redirection. If you need help with this, please get in touch!

## Examples

The examples have been written as a set of tests to check the OpenAPI specification. This means they show you how to make the calls but not the outputs!

Play around with the callback function and commenting out certain functions to leave only one. The JSON that is outputted is all summarised at https://www.uclapi.com/docs.

## Usage

See the `examples.js` file for full examples of all the endpoints.

However, see the snippet below if you just want to get started:

```js
const uclapi = require('@uclapi/sdk');
const token = process.env.UCLAPI_API_KEY; // This example uses a pre-generated token stored in an environment variable
uclapi.ApiClient.instance.authentications.OAuthToken.apiKey = token; // Configure the SDK to use your token

// Instantiate instances for the one or more API's you want to use
const timetable = new uclapi.TimetableApi();
const bookings = new uclapi.RoomBookingsApi();
const search = new uclapi.SearchApi();
const resources = new uclapi.ResourcesApi();
const workspaces = new uclapi.WorkspacesApi();
const analytics = new uclapi.AnalyticsApi();

search.searchPeopleGet("John", (error, data, response) => {
  if (error || !data.ok) return console.error(error, data);
  data.people.forEach(person => console.log(person.name));
});
```

### OAuth applications

If you are creating an OAuth application, you'll need to get the user to authorise your application by sending them to `https://uclapi.com/oauth/authorize?client_id=CLIENT_ID&state=STATE` and making sure you have a Redirect URL set up in your UCL API dashboard account.

Once the user approves your application, the user will be sent to your Redirect URL with a `code` query parameter. You should use this `code` to generate a token which you should save in your app:

```js
const uclapi = require('@uclapi/sdk');

// You should not store your client secret in your code if it is public. Instead, use environment variables
const clientSecret = process.env.UCLAPI_CLIENT_SECRET;
const clientId = "YOUR_CLIENT_ID";
const state = "A RANDOM STRING";

// TODO: send user to /oauth/authorize endpoint, and extract the `code` query parameter in the code for your redirect page

const oauth = new uclapi.OauthAPI();
oauth.oauthTokenGet(clientSecret, clientId, code, (err, data, response) => {
  if (error || !data.ok) return console.error(error, data);
  console.log('Your token is', data.token);
});
```
