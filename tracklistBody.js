// tracklistBody.js

//var list = document.getElementById("tc-trackList");
var list2 = document.getElementById("tc-trackList2");
var listMsg = document.getElementById("tc-trackListMsg");
$("tc-trackListMsg").text("Working...");

// Get the song list from the file list.txt
var xmlhttp = sixistLibrary.GetXMLHTTPRequest();

var sourceFile = "songinfo.xml";
xmlhttp.open("GET", sourceFile, true);

// Process the song list into something we can output.
xmlhttp.onreadystatechange = function () {

    //var SongList, SongListLength, i, splitLine, Line, song, songname;
    var xmlSongList;
 
    if (xmlhttp.readyState == 4 && (xmlhttp.status == 200 || xmlhttp.status == 0)) {

        listMsg.innerText = "";
        $("tc-trackListMsg").hide();

        xmlSongList = xmlhttp.responseXML;

        var xmlDoc = $.parseXML(xmlhttp.responseText), 
            xml=$(xmlDoc),
            songs = xml.find("SongInfo");
        $.each(songs.find("Song"), function(i, el) {
            var song = $(el),
                artist = song.find("Artist").text(), 
                track = song.find("Track").text(),
                band = song.find("Band").text();
			band= band.toLowerCase();
			if (band.indexOf("the airwaves") != -1)
			{
				songText = artist.trim() + " : " + track.trim();
				
				//list.appendChild(document.createTextNode(songText));
				//list.appendChild(document.createElement("br"));
				
				var option = document.createElement("option");
				option.text= songText;
				list2.add(option);
			}
        });

    }
    else if (xmlhttp.readyState == 4) {
        listMsg.innerText = "Unable to process list";
    }
    else {
        listMsg.innerText = "Processing list" ;
    }
}
xmlhttp.send();


