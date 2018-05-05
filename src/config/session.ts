export default {
    session: {
        secret: "IdgzE3z1PONc09PX9MeH3CHDzZe3",
        name: "Nterprise",
        resave: false,
        saveUninitialized: true,
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: (1 * 60 * 60),
        store: {
            "default": "mongo",
            mongo: {
                ttl: (1 * 60 * 60) // 1 hour
            }
        }
    }
};
