
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    var google_key = 'AIzaSyDxiC5gPdIQAFuo3r-KujeRYKLQEL7dUNs';
    var nyt_key = 'a19e123ecd362cfd3ecdca1102dc45ee:13:75095583';

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;         

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '&key=' + google_key;

    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // load new york time article
    var nytURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr+ '&sort=newest&api-key=' + nyt_key;

    $.getJSON(nytURL, function (data){
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+ '<a href="' + article.web_url + '">' + article.headline.main + '</a>'+
                '<p>' + article.snippet + '</p>' + 
                '</li>');
        };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not be Loaded');
    });

    // wikipedia
    var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' 
        + cityStr + '&format=json&callback=wikiCallback'

    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("failed to get wikipedia resources");
    });

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function( response ) {
            var articleList = response[1];
            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[1];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>')
            };

            clearTimeout(wikiRequestTimeout);
        }
    });


    return false;
};

$('#form-container').submit(loadData);
