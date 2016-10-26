requirejs({
    baseUrl: "lib",
    shim: {
        "bootstrap": { "deps": ["jquery"] }
    },
    paths: {
        app: "../scripts",
        bootstrap: "//netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min"
    }
});

requirejs(['app/main']);