requirejs({
    baseUrl: "lib",
    shim: {
        "bootstrap": { "deps": ["jquery"] }
    },
    paths: {
        app: "../scripts",
        bootstrap: "//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min"
    }
});

requirejs(['app/main']);