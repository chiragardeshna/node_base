export default {
    session: {
        secret: "IdgzE3z1PONc09PX9MeH3CHDzZe3",
        name: "Nterprise",
        resave: false,
        saveUninitialized: true,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: (5 * 60 * 1000), // 1 minute
        },
        store: {
            "default": "mongo",
            mongo: {
                ttl: (1 * 60 * 60) // 1 hour
            }
        }
    }
};
