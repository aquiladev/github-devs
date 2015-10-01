;
(function() {
    'use strict';
    var octo = new Octokat({
        token: "1967bdb0f826a0de86aa11d4d4f51ee0aaeb0ff4"
    });
    var cb = function(err, val) {
        console.log(val);
    };
    octo.zen.read(cb);
    octo.users('philschatz').fetch(cb);
})(this);