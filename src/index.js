(function (document, window) {
    'use strict';

    var scripts = [
        'src/services/router.js',
        'src/views/home/home.js',
        'src/views/header/header.js',
        'src/views/search/search.js'
    ];

    function onEndLoad() {
        var options = {
            defaultAnimation: 'none'
        };
        RAD.core.initialize(null, options);
        RAD.core.getService('service.router');

        RAD.core.publish('navigation.show', {
            container_id: '.header-holder',
            content: 'view.header'
        });
    }

    window.RAD.scriptLoader.loadScripts(scripts, onEndLoad);
}(document, window));
