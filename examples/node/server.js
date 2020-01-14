const uclapi = require('@uclapi/sdk');
const dotenv = require('dotenv');
 
dotenv.config();

var api = new uclapi.DefaultApi()

var clientSecret = "clientSecret_example"; // {String} Client secret of the authenticating app
var clientId = "clientId_example"; // {String} Client ID of the authenticating app.
var code = "code_example"; // {String} Secret code obtained from the authorise endpoint.

var token = process.env.UCLAPI_API_KEY;

var failedTests = 0;
var passedTests = 0;

var callback = function(error, data, response) {
  if (error) {
    failedTests ++;
    console.error(error);
  } else {  
    passedTests ++;
    console.log(response.req._header.split('?')[0]);
  }
  console.log("Failed: " + failedTests + " Passed: " + passedTests
   + " (" + (passedTests) + " / " + (passedTests + failedTests) + ")")
};
console.log("Calling the uclapi...")
// 1. People search (token, query, callback) Y
api.searchPeopleGet(
    token,
    "Harry Liversedge",
    callback
);
//2. Desktop Availability (token, callback) Y
api.resourcesDesktopsGet(
    token,
    callback
);
// 3. Room Bookings Get Bookings (token, optional, callback) 
api.roombookingsBookingsGet(
    token,
    {
      roomname: "Torrington (1-19) 433",
      roomid: "433",
      start_datetime: "2020-12-01T09:00:00+00:00",
      end_datetime: "2020-12-01T09:30:00+00:00",
      date: "20200112",
      siteid: "086",
    },
    callback
);
// 4. Room Bookings Get Equipment (token, roomid, siteid, callback) Y
api.roombookingsEquipmentGet(
  token,
  "433",
  "086",
  callback
)
// 5. Room Bookings Get Free Rooms 
// (token, start_datetime, end_datetime, callback) Y
api.roombookingsFreeroomsGet(
  token,
  "2020-12-01T09:00:00+00:00",
  "2020-12-01T09:30:00+00:00",
  callback
)
// 6. Room Bookings Rooms Get (token, optional, callback) Y
api.roombookingsRoomsGet(
  token,
    {
      roomname: "Torrington (1-19) 433",
      roomid: "433",
      siteid: "086",
      sitename: "Torrington Place, 1-19",
      classification: "SS",
      capacity: "55"
  },
  callback
)
// 7. Timetable By Modules (token, modules, callback) Y
api.timetableBymoduleGet(
  token,
  "PHAS0041, STAT0007",
  callback
)
// 8. Timetable Get Departments (token, callback) Y
api.timetableDataDepartmentsGet(
  token,
  callback
)
// 9. Timetable Get Module Taught On A Given Course 
// (token, course, optional, callback)
api.timetableDataCoursesModulesGet(
  token,
  "UMNCOMSMAT05",
  {
    term_1: true,
    term_2: true,
    term_3: true,
    term_1_next_year: true,
    summer: true,
    year_long: true,
    lsr: true,
    is_summer_school: false,
    session_1: true,
    session_2: true,
    is_undergraduate: true,
    only_available: true,
    only_compulsory: true
  },
  callback
)
// 10. Timetable Get Moudles Taught By Departmnet (token, department, callback)
api.timetableDataModulesGet(
  token,
  "COMPS_ENG",
  callback
)
// ALL ENDPOINTS USING OAUTH TO ADD...

console.log("End of code.")