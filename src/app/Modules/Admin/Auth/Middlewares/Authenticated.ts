export default (req, res, next) => {
    let session = req.session;
    let authenticated = session.authenticated || null;
    if (!authenticated) return res.redirect("/admin/auth");
    res.locals.authenticated = authenticated;
    return next();
}