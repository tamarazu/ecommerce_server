module.exports=(err, req, res, next) => {
        if(err.name === "SequelizeValidationError" || err.name === 'SequelizeUniqueConstraintError'){
        let errors = err.errors.map(el => el.message)
        res.status(400).json({
            errors : errors
        })
    } else {
        res.status(err.status || 500).json({
            error: err.message || "Internal Server Error"
        })
    }
}