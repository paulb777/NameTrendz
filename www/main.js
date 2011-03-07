var START_YEAR = 1880;
var END_YEAR = 2009;
var TOTAL_NAMES = 50;

function getPopNamesList(year, namesList) {
    $.mobile.changePage([ $.mobile.activePage, "#pagepopresults" ], 'slide');
    var resultText = '';
    for (i = 0; i < namesList[year].length; i++) {
        oneName = namesList[year][i];
        resultText += '<li><div id=\"resName\"><a>' + oneName + '</a></div></li>';
    }
    
    jQuery("#resYear").html(year);
    jQuery("#resultsListOl").html(resultText);
    $('ol#resultsListOl').listview('refresh'); 
}

function getPopNames(event) {
    var gendertestM = false;
    var year = $('#year').val();
    var namesListByGender, oneName;
    var i;
    
    if ($('#genderM').is(":checked")) {
        gendertestM = true;
        jQuery("#resGender").html("Male");
        namesListByGender = namesM;
    } else {
        jQuery("#resGender").html("Female");
        namesListByGender = namesF;
    }

    getPopNamesList(year, namesListByGender);
}

function randomSearch() {
        var sex = Math.floor(Math.random()*2);
        var namesList = sex === 0 ? namesM : namesF;
        var max = END_YEAR - START_YEAR + 1;
        var year = Math.floor(Math.random()*max) + START_YEAR;
        getPopNamesList(year, namesList);
}

function getRank(name, year, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === name) {
            return i + 1;
        }
    }
    return -1;
}

function getPeakRank(name) {
    var lowRank = TOTAL_NAMES;
    var r;
    var lowYear;
    for (y = START_YEAR, i = 0; y <= END_YEAR; y++, i++) {
        r = getRank(name, y, namesM[y]);
        if (r !== -1 && r < lowRank) {
            lowRank = r;   
            lowYear = y;
        }
        r = getRank(name, y, namesF[y]);
        if (r !== -1 && r < lowRank) {
            lowRank = r;   
            lowYear = y;
        }
    }
    if (lowRank < TOTAL_NAMES) {
        return '<h4><em>' + name + ' peaked at number ' + lowRank + ' in popularity in ' + lowYear + '</em>.</h4>'; 
    } else {
        return '';
    }
}


$(document).ready(function() {

    $("#dislikeslist").hide();
    $("#dislikesOl").hide();
    $("#likesOl").hide();
    $("#likeslist").show();
    $('#likesbtn').focus();
    $('#likesbtn').live('tap', function() {
        //alert('likes btn');
        $("#dislikeslist").hide();
        $("#likeslist").show();
    });
    $('#dislikesbtn').live('tap', function() {
        //alert('dislikes btn');
        $("#likeslist").hide();
        $("#dislikeslist").show();

    });
    
    $('#searchpop').focus();
    $('#content-by-name').hide();
    
    $('#searchpop').live('tap', function() {
        $('#content-by-name').hide();
        $('#content-pop').show();
    });
    
    $('#searchbyname').live('tap', function() {
        $('#content-pop').hide();
        $('#content-by-name').show();
    });
    
    $('#gettrendbtn').live('tap', function() {
        var name =  capitalize($('#byname-name').val());
        getTrendInfo(name);
        $.mobile.changePage([ $.mobile.activePage, "#pagetrends" ], 'slide');
//        event.preventDefault();
        return false;
    });
    
    $('#getcontacts').live('tap', function() {
        $.mobile.changePage([ $.mobile.activePage, "#pagefriends" ], 'slide');
        return false;
    });
    
    $('#friends-alpha-btn').live('tap', function() {
        friendsAlphaList();
    });
    $('#friends-count-btn').live('tap', function() {
        friendsCountList();
    });
    
    
    $('#getnamesbtn').live('tap', function() { 
        getPopNames(event);
//        event.preventDefault();
        return false;
    });
  
    $('#resName').live('tap', function() {
        $('#currentname').html($(this).text());
        $('#peakmessage').html(getPeakRank($(this).text()));
        $.mobile.changePage([ $.mobile.activePage, "#pagename" ], 'slide');
    });
    
    // from Save put name into currentname
    $('#savenamebtn').live('tap', function() {       
        var name = $("#inputname").val();
        if (name.length === 0) {
            return;
        }
        name = capitalize(name);
        //alert("Save name btn " + name);

        $('#currentname').html(name);
        $('#peakmessage').html(getPeakRank(name));
        $.mobile.changePage([ $.mobile.activePage, "#pagename" ], 'slide');
    });
    
    $('#likesaddbtn').live('tap', function() {
        $('ol#likesOl').append('<li>' + $('#currentname').text() + '</li>');
        //alert($('#currentname').text() + ' is now in the Likes List' );
        $('ol#likesOl').listview('refresh');
        $('#likesbase').hide();
        $("#likesOl").show();
    });
    
    $('#dislikesaddbtn').live('tap', function() {
        $('ol#dislikesOl').append('<li>' + $('#currentname').text()+ '</li>');
        //alert($('#currentname').text() + ' is now in the Dislikes List' );
        $('ol#dislikesOl').listview('refresh');
        $('#dislikesbase').hide(); 
        $("#dislikesOl").show();
    });
    
    $('#inputlikesadd').live('tap', function() {
        var name = $("#inputname").val();
        if ($("#inputname").val().length === 0) {
            return;
        }
        name = capitalize(name);
        //alert(name);
      
        $('ol#likesOl').append('<li>' + name + '</li>');
        //alert(name + ' is now in the Likes List' );
        $('ol#likesOl').listview('refresh');
        $('#likesbase').hide();
        $("#likesOl").show();
    });
    
    $('#inputdislikesadd').live('tap', function() {
        var name = $("#inputname").val();
        if ($("#inputname").val().length === 0) {
            return;
        }
        name = capitalize(name);
        //alert('dislikes input' + name);
      
        $('ol#dislikesOl').append('<li>' + name + '</li>');
        //alert(name + ' is now in the Dislikes List' );
        $('ol#dislikesOl').listview('refresh');
        $('#dislikesbase').hide();
        $("#dislikesOl").show();        
    }); 
    
    $('#viewpopranks').live('tap', function() {
        getTrendInfo($('#currentname').text());
        $.mobile.changePage([ $.mobile.activePage, "#pagetrends" ], 'slide');
//        event.preventDefault();
        return false;
    });
    // TODO next two lines should run whenever page 1 becomes visible
    var quote = getRandomQuote();
    $('#quotes-div').html("<h3>\"" + quote.quote + "\"</h3>");
    $('#quotesauth-div').html("<h5><i>-" + quote.author + "<i></h5>");
 });
  

function deviceReady() {
    getContacts();
    toggleShaker();
}
    
function init() {
    document.addEventListener("deviceready", deviceReady, true);    
}


