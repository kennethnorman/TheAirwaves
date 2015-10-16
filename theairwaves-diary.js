// theairwaves-diary.js

      // Your Client ID can be retrieved from your project in the Google
      // Developer Console, https://console.developers.google.com
      var CLIENT_ID = '1040191233193-jf54albj9gi8s70up20i27l36o393deb.apps.googleusercontent.com';

      var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadCalendarApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
      function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        var request = gapi.client.calendar.events.list({
          //'calendarId': 'primary',
		  'calendarId': 'hlen4bh928ramfldnhc9scrhvs@group.calendar.google.com',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          //'maxResults': 20,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
		
          document.getElementById('aw-pagemessage').style.display = 'none';
		
          var events = resp.items;

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
			  var eventText = new Date(when).toLocaleDateString('en-GB') + ' : ' + event.summary
              appendAllEvents(eventText)
			  
				if (i === 0) {
					appendNextEvent(eventText);
				}
            }
          } else {
            appendAllEvents('No upcoming events.');
            appendNextEvent('No upcoming events.');
          }

        });
      }

      /**
       * Append element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in element.
       */
      function appendAllEvents(message) {
        var allEvents = document.getElementById('aw-allevents');
		if (allEvents) {
			allEvents.appendChild(document.createTextNode(message));
			allEvents.appendChild(document.createElement("br"));
			allEvents.appendChild(document.createElement("br"));
		}
      }

      function appendNextEvent(message) {
        var nextEvent = document.getElementById('aw-nextevent');
		if (nextEvent) {
			nextEvent.appendChild(document.createTextNode(message));
			nextEvent.appendChild(document.createElement("br"));
			nextEvent.appendChild(document.createElement("br"));
		}
      }
	  