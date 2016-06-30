
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    var google_key = 'AIzaSyDxiC5gPdIQAFuo3r-KujeRYKLQEL7dUNs';

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;         

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '&key=' + google_key;

    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    return false;
};

$('#form-container').submit(loadData);
