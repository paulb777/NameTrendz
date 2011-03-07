
function getTrendInfo(name) {
//    var name = $('#trend-name').val();

    var gender;
    var doMale, doFemale;
//    if ($('#trend-genderM').is(":checked")) {
//        doMale = true;
//        doFemale = false;
//    } else if ($('#trend-genderF').is(":checked")) {
//        doMale = false;
//        doFemale = true;
//    } else {
        doMale = true;
        doFemale = true;
//    }
    var y, i;
    var resultText = '';
    for (y = END_YEAR, i = 0; y >= START_YEAR; y--, i++) {
        var maleRank = 0, femaleRank = 0, rank = -1;
        if (doMale) maleRank = getRank(name, y, namesM[y]);
        if (doFemale) femaleRank = getRank(name, y, namesF[y]);
        if (maleRank > 0) {
            rank = maleRank;
            if (femaleRank > 0 && maleRank < femaleRank) doFemale = false;
        }
        if (femaleRank > 0 && (rank === -1 || femaleRank < maleRank)) {
            rank = femaleRank;
            doMale = false;
        }
        if (rank > 0)  { 
            resultText += '<li>' + y + 
            '</a><span class="ui-li-count">' + rank + '</span></li>';
        }
    }
    if (resultText === '') {
        resultText = 'No Top ' + TOTAL_NAMES + ' results found for ' + name + ' since ' + START_YEAR;
        gender = 'none';
    } else {
        gender = doMale ? 'male' : 'female';
    }
    jQuery("#trendResYear").html(START_YEAR);
    jQuery("#trendResName").html(name);
    jQuery("#trendResGender").html(gender);
    jQuery("ol#trends-list").html(resultText);
    jQuery('ol#trends-list').listview('refresh');

}