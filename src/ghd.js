(function (document, window) {
    'use strict';

    function execute(func, args, context) {
        if (typeof func !== "function") {
            return;
        }
        if (context && context instanceof Object) {
            func.apply(context, args);
        } else {
            func(args);
        }
    }

    function prepareEnvironment() {
        _.templateSettings = {
            evaluate:    /\{\{#([\s\S]+?)\}\}/g,
            interpolate: /\{\{[^#\{]([\s\S]+?)[^\}]\}\}/g,
            escape:      /\{\{\{([\s\S]+?)\}\}\}/g
        };
    }

    function ScriptLoader() {
        var loader = this,
            isLoaded = false;

        function loadScript(url, checkCallback) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.async = true;
            if (script.readyState) { //IE
                script.onreadystatechange = function() {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        checkCallback();
                    }
                };
            } else { //Others
                script.onload = checkCallback;
                script.onerror = checkCallback;
            }
            script.src = url;
            document.head.appendChild(script);
        }

        function loadArray(urls, callback, context) {
            var i, l = urls.length,
                counter = 0;
            loader.arr = null;
            loader.callback = null;
            loader.context = null;

            function check() {
                counter += 1;
                if (counter === l) {
                    execute(callback, null, context);
                }
            }
            for (i = 0; i < l; i += 1) {
                loadScript(urls[i], check);
            }
        }

        function onLoad() {
            isLoaded = true;
            loader.loadScripts = loadArray;
            if (loader.arr && loader.callback) {
                loader.loadScripts(loader.arr, loader.callback, loader.context);
            }
        }
        loader.loadScripts = function(urls, callback, context) {
            loader.arr = urls;
            loader.callback = callback;
            loader.context = context;
        };
        if (window.attachEvent) {
            window.attachEvent('onload', onLoad);
        } else {
            window.addEventListener('load', onLoad, false);
        }
        return loader;
    }

    function Application() {
        var self = this,
            app = {},
            store = {};

        self.register = function (id, creator) {
            if (store[id] === undefined) {
                store[id] = {
                    creator: creator,
                    instance: null
                };
            } else {
                window.console.log('You try register already registered module:' + id + '!');
            }
        };

        self.registerAll = function (arrayOfViews) {
            var index, length, options, id;

            for (index = 0, length = arrayOfViews.length; index < length; index += 1) {
                options = arrayOfViews[index];
                for (id in options) {
                    if (options.hasOwnProperty(id)) {
                        self.register(id, options[id]);
                    }
                }
            }
        };

        self.start = function (application, options) {
            var id, parts;

            app = application || app;

            if (options) {
                self.options = options;
            }
            // if (self.options.plugins && isArray(self.options.plugins)) {
            //     self.registerAll(self.options.plugins);
            // }

            prepareEnvironment();
            // for (id in store) {
            //     if (viewData.hasOwnProperty(id)) {
            //         parts = id.split('.');
            //         if (parts[0] === 'plugin') {
            //             this.startPlugin(id);
            //         }
            //     }
            // }

            this.isInitialize = true;
        };

        return self;
    }

    window.ghd = {
        app: new Application(),
        models: {},
        model: function(modelId, Model, instantiate){
            var model = Model;
            if (typeof Model === 'function' && (instantiate === undefined || instantiate === true)) {
                model = new Model();
            }

            this.models[modelId] = model;
            return model;
        },
        view: function(id, fabric) {
            var i, l;
            if (isArray(id)) {
                for (i = 0, l = id.length; i < l; i += 1) {
                    views.register(id[i], fabric);
                }
            } else {
                views.register(id, fabric);
            }
        },
        loader: new ScriptLoader()
    };
}(document, window));
