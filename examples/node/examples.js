const uclapi = require("./@sdk/dist");
const dotenv = require("dotenv");
dotenv.config();

/*
 * Send the user to https://uclapi.com/oauth/authorize?client_id=CLIENT_ID&state=STATE
 * to receive your `CODE`
 */
const clientSecret = process.env.UCLAPI_CLIENT_SECRET; // {String} Client secret of the authenticating app
const clientId = "clientId_example"; // {String} Client ID of the authenticating app.

/* Get your token by GETting
 * https://uclapi.com/oauth/token?code=CODE&client_id=CLIENT_ID&client_secret=CLIENT_SECRET
 */
const token = process.env.UCLAPI_API_KEY;

// Set your received OAuth2 access token
uclapi.ApiClient.instance.authentications.OAuthToken.apiKey = token;

let failedTests = 0;
let passedTests = 0;

const callback = function (error, data, response) {
  let passed = true;

  if (error) {
    failedTests++;
    passed = false;
    console.error(error.response.body);
  } else {
    passedTests++;
  }

  console.log(
    (passed ? "Passed: " : "Failed: ") + response.req._header.split("\n")[0].split("?")[0]
  );
  console.log("(" + passedTests + " / " + (passedTests + failedTests) + ")");
};

console.log("Running examples...");

// 1. Timetable API examples
const timetable = new uclapi.TimetableApi();
timetable.timetablePersonalGet(clientSecret, {}, callback);
timetable.timetableBymoduleGet('COMP0016,STAT0007', {}, callback);
timetable.timetableDataDepartmentsGet(callback);
timetable.timetableDataModulesGet('COMPS_ENG', callback);
timetable.timetableDataCoursesGet('COMPS_ENG', callback);
timetable.timetableDataCoursesModulesGet('UMNCOMSMAT05', {}, callback);

// 2. Room Bookings API examples
const bookings = new uclapi.RoomBookingsApi();
bookings.roombookingsRoomsGet({}, callback);
bookings.roombookingsBookingsGet({}, callback);
bookings.roombookingsEquipmentGet({}, callback);
bookings.roombookingsFreeroomsGet({}, callback);

// 3. Staff Search API examples
const search = new uclapi.SearchApi();
search.searchPeopleGet("Hirsch", callback);

// 4. Resources API examples
const resources = new uclapi.ResourcesApi();
resources.resourcesDesktopsGet(callback);

// 5. Workspaces API examples
const workspaces = new uclapi.WorkspacesApi();
workspaces.workspacesSurveysGet({}, callback);
workspaces.workspacesSensorsGet(79, { return_states: false }, callback);
workspaces.workspacesSensorsAveragesTimeGet(1, {}, callback);
workspaces.workspacesSensorsLastupdatedGet(79, callback);
workspaces.workspacesSensorsSummaryGet({ survey_filter: 'student' }, callback);
workspaces.workspacesImagesMapGet(48, { image_format: 'base64' }, callback);
workspaces.workspacesImagesMapLiveGet(0, 1, {}, callback);

// 6. Analytics API examples
const analytics = new uclapi.AnalyticsApi();
analytics.dashboardApiAnalyticsTotalGet(callback);
analytics.dashboardApiAnalyticsQuotaGet(callback);
analytics.dashboardApiAnalyticsServicesGet(callback);
analytics.dashboardApiAnalyticsMethodsGet({ service: "rooms" }, callback);
analytics.dashboardApiAnalyticsOauthTotalGet({ end_date: '2021-01-14' }, callback);
analytics.dashboardApiAnalyticsOauthTotalByDeptGet(callback);
