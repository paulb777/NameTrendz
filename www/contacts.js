var sortedContactList = null;  // sorted list initialized after contacts in

function unique(a) {
    var i, j;
    a.sort();
    var nameCountArray = [];
    nameCountArray[0] = {};
    nameCountArray[0].name = a[0];
    nameCountArray[0].count = 1;
    for(i = 1, j = 1; i < a.length; i++){
        if(a[i-1] === a[i]){
            nameCountArray[j-1].count++;
        } else {
            nameCountArray[j] = {};
            nameCountArray[j].name = a[i];
            nameCountArray[j].count = 1;
            j++;
        }
    }
    return nameCountArray;
} 

function buildList(a) {
    var str='';
    var i;
    for (i = 0; i < a.length; i++) {  
        str += '<li><a class="popContactName" href="#">' + a[i].name + 
               '</a><span class="ui-li-count">' + a[i].count + '</span></li>';
//        str += '<li><div id="popContactName" >' + a[i] + '</div></li>';
    }
    return str;
}

function capitalize(s) {
    s = s.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function outputList(contactList) {
    // TODO only build html when page is put in view

    jQuery('ol#contact-list').html(contactList);    
    jQuery('ol#contact-list').listview('refresh');
    $('.popContactName').live('tap click', function() {
        var name = $(this).text();
        $('#byname-name').val(name);
        $.mobile.changePage([ $.mobile.activePage, "#pagesearch" ], 'slide', false, true);
        return false; 
    });
}

function friendsAlphaList() {
    if (sortedContactList) {
        outputList(sortedContactList);
    }
}

function contacts_success(contacts) {
    var initNames = [];
    var first = null;
    var i, j;
    for (i = 0, j = 0; i < contacts.length; i++) {
        var name = contacts[i].name;
        if (!name) continue; 
        var gname = name.givenName;
        if (!gname) continue;
        gname = gname.replace(/\./g,""); // email names come back with . at end of first
        if (gname && name.familyName && gname.length > 1 && gname.match(/^[a-zA-Z]+$/)) {
            gname = capitalize(gname);   
            initNames[j++] = gname;
            if (first === null) first = gname;
//            if (j === 20) break; // 250 loses format
        }
    }
    sortedContactList = buildList(unique(initNames));
    friendsAlphaList();
}

function getContacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.service.contacts.find(
            [ "displayName", "name" ], contacts_success,
            function() { alert('failed');}, obj);
}



function friendsCountList() {
    if (sortedContactList) {
        alert('entered');
        sortedContactList.sort(function(a, b) {
            if (a.count < b.count)
                return -1;
            if (a.count > b.count)
                return 1;
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        });
        alert('past sort');
        outputList(sortedContactList);
    }
}