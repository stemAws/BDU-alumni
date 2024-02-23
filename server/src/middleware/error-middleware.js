async function notFound (req, res, next){
    const error = new Error (`The Requested Route Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

async function errorHandler (err, req, res, next){
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message : err.message });
}

module.exports = { notFound, errorHandler };