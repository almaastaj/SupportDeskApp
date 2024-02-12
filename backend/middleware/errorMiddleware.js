const errorHandler = (error, req, res, next) => {
    // if it's a good status code then we want to send bad status code ( ensuring a status code of at least 400 before setting a 500 error)
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
};

export default errorHandler;
