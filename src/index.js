(function (document, window) {
    'use strict';

    var scripts = [
        'src/models/home.js',
        'src/views/home/home.js',
    ];

    function onEndLoad() {
        console.log('start');
    }

    window.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));