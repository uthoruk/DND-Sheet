requirejs({
    baseUrl: "lib",
    paths: {
        app: "../scripts"
    }
});

requirejs(['app/main']);