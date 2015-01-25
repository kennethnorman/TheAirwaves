// theairwaves-diary.js

var nextevent = document.getElementById("tc-nextevent");
var allevents = document.getElementById("tc-allevents");
var pagemessage = document.getElementById("tc-pagemessage");
var foundevents = false;
$("tc-nextevent").text("Working...");
$("tc-allevents").text("Working...");

pagemessage.innerText = "Working...";

$(document).ready(UpdateCalendarEvents(
//"https://www.google.com/calendar/feeds/hlen4bh928ramfldnhc9scrhvs%40group.calendar.google.com/public/full?singleevents=true&futureevents=true&orderby=starttime&sortorder=ascending&alt=json"
"https://www.google.com/calendar/feeds/hlen4bh928ramfldnhc9scrhvs%40group.calendar.google.com/public/basic?singleevents=true&futureevents=true&orderby=starttime&sortorder=ascending&alt=json"
));


/**/
function UpdateCalendarEvents(sourceFile) {

    $.getJSON(sourceFile, function (data) {

        if (data.feed.entry.length != 0) {
            pagemessage.innerText = "";
            $("tc-pagemessage").hide();
        }

        $.each(data.feed.entry, function (i, el) {

            var entry = $(el),
                title = entry[0].title.$t,
                summary = entry[0].summary.$t;
			var when = new Date("1990-01-01");
			
			// Format is "When: Sat 12 Sep 2015<br>\n\n\n<br>Event Status: confirmed"
			var sum = summary.split("<br>");
			for (var sumIndex= 0; sumIndex<sum.length; sumIndex++) {
				var entry= sum[sumIndex].split(":");
				if (entry[0] == "When") {
					when = new Date(entry[1].trim());
				}
			}

            foundevents = true;

            if (nextevent) {
                if (i === 0) {
                    nextevent.appendChild(document.createTextNode(when.toLocaleDateString("en-GB") + " : "));
                    nextevent.appendChild(document.createTextNode(title));
                    nextevent.appendChild(document.createElement("br"));
                }
            }

            if (allevents) {
                allevents.appendChild(document.createTextNode(when.toLocaleDateString("en-GB") + " : "));
                allevents.appendChild(document.createTextNode(title));
                allevents.appendChild(document.createElement("br"));
                allevents.appendChild(document.createElement("br"));
            }
        });
    })
    .fail(function () {
        pagemessage.innerText = "No dates found.";

    });

}

