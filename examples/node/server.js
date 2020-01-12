var uclapi = require('@uclapi/sdk');
 
var api = new uclapi.DefaultApi()

var clientSecret = "clientSecret_example"; // {String} Client secret of the authenticating app
var clientId = "clientId_example"; // {String} Client ID of the authenticating app.
var code = "code_example"; // {String} Secret code obtained from the authorise endpoint.

// ADD YOUR TOKEN HERE TO TEST LOCALLY
var token = ""

var failedTests = 0;
var passedTests = 0;

var callback = function(error, data, response) {
  if (error) {
  	failedTests ++;
    // console.error(error);
  } else {	
  	passedTests ++;
    //console.log(data);
  }
  console.log("Failed: " + failedTests + " Passed: " + passedTests
   + " (" + (passedTests) + " / " + (passedTests + failedTests) + ")")
};
console.log("Calling the uclapi...")
// People search (token, query, callback)
api.searchGet(
    token,
    "Jane",
    callback
);
// Desktop Availability (token, callback)
api.resourcesDesktopsGet(
    token,
    callback
);
// Room Bookings Get Bookings (token, optional, callback)
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
// Room Bookings Get Equipment (token, roomid, siteid, callback)
api.roombookingsEquipmentGet(
	token,
	// "433",
	// "086",
	callback
)
// Room Bookings Get Free Rooms (token, start_datetime, end_datetime, callback)
api.roombookingsFreeroomsGet(
	token,
	{},
	// "2020-12-01T09:00:00+00:00",
	// "2020-12-01T09:30:00+00:00",
	callback
)
// Room Bookings Rooms Get (token, optional, callback)
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
// ALL ENDPOINTS USING OAUTH TO ADD...

console.log("End of code.")