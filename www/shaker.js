function shakerEvent() {
    id = $.mobile.activePage[0].id;

    switch (id) {
    case 'pagesearch':
        randomSearch();
        break;
    }
}

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

var lastX = null;
var lastY, lastZ;

function updateAcceleration(a) {
    
    if (lastX !== null) {  // not first time
        var deltaX = Math.abs(a.x - lastX);
        var deltaY = Math.abs(a.y - lastY);
        var deltaZ = Math.abs(a.z - lastZ);
        
        var changes = 0;
        if (deltaX > 3) changes++;
        if (deltaY > 3) changes++;
        if (deltaZ > 3) changes++;
        
        if (changes >= 2) {
            shakerEvent();
        }
    }
    lastX = a.x;
    lastY = a.y;
    lastZ = a.z;
}

var toggleShaker = function() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
        lastX = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};
