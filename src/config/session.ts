export default {
    session: {
        secret: "IdgzE3z1PONc09PX9MeH3CHDzZe3",
        resave: false,
        saveUninitialized: true,
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null,
        store: {
            "default": "mongo",
            mongo: {}
        }
    }
};
