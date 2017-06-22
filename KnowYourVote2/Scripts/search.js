var loc;
var state;

function initAutocomplete() {
    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);

    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) { return; }

        // For each place, get the icon, name and location.
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
        });
        loc = encodeURI(places[0].formatted_address.replace(/,/g, ''));

        if (/.. (\d){5}, USA/.test(places[0].formatted_address)) {
            state = /.. (\d){5}/.exec(places[0].formatted_address)[0].substr(0, 2).toLowerCase();
        }
        if (/.., USA/.test(places[0].formatted_address)) {
            state = /.., USA/.exec(places[0].formatted_address)[0].substr(0, 2).toLowerCase();
        }
    });
}

$(document).ready(function () {
    $("#search").click(function () {
        searchResult();
    });

    $("#pac-input").keypress(function (e) {
        if (e.which == 13) {
            searchResult();
            return false;
        }
    });

    function searchResult() {
        $('main-body').removeClass('absolute-center');
        var locLink = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyBRTWesCWcZoIiBVFxanm3BPBkUmOdSbW8&address=" + loc;
        $.get(locLink, function (response) {
            console.log(response);
            $('#official-container').addClass('official-scroll');
            document.getElementById('official-container').innerHTML = '';
            var id = 0;
            for (var x = 0; x < response.offices.length; x++) {
                for (var y = 0; y < response.offices[x].officialIndices.length; y++) {

                    var image = response.officials[id].photoUrl;
                    if (image === undefined)
                    {
                        image = "../Images/silhouette.png";
                    }

                    document.getElementById('official-container').innerHTML +=
                    //'<a href="' + response.officials[id].urls + '" target="blank_" class="thumbnail row">' +
                    '<a href= " /Politicians/MarciaFudge " class="thumbnail row">' +
                    '<div class="col-xs-4">' +
                        '<img src= "' + image + '"/>' +
                    '</div> <div class="col-xs-8">' +
                        '<h4>' + response.officials[id].name + '</h4>' +
                        '<p>Position: ' + response.offices[x].name + '</p>' +
                        '<p>Party: ' + response.officials[id].party + '</p>' +
                    '</div></a>';
                    id++;
                }
            }
        });
        var thing = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyBRTWesCWcZoIiBVFxanm3BPBkUmOdSbW8&address=" + loc;

        $.get(thing, function (response) {
            //This usually doesn't work
            console.log(response);
            console.log('^ ^ ^ It works ^ ^ ^');
            document.getElementById('polling-container').innerHTML = '';
            document.getElementById('polling-container').innerHTML +=
                    '<div class="cell">' + response.election.name + '</div>';
        });
      

        $.get("https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyBRTWesCWcZoIiBVFxanm3BPBkUmOdSbW8", function (response) {
            console.log(response);
            var stateRegex = new RegExp("state:" + state);
            document.getElementById('election-container').innerHTML = '';

            if (response.elections.length > 0) {
                document.getElementById('election-container').innerHTML +=
                    '<h4>We found some elections that might affect you</h4>';

                response.elections.forEach(function (entry) {
                    if (!/state:/.test(entry.ocdDivisionId) || stateRegex.test(entry.ocdDivisionId)) {
                        document.getElementById('election-container').innerHTML +=
                        '<div class="cell">' + entry.name + ' at ' + entry.electionDay + '</div>';
                    }
                });
            }
        });

        document.getElementById('ballot').innerHTML = '';
        document.getElementById('ballot').innerHTML += '<a href="../Images/sample-ballot.PDF" target="_blank">Sample Ballot</a>';
    }
});