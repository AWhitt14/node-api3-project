const usersDb = require('../users/userDb')
const postDb = require('../posts/postDb')

function validateUserId() {
    return (req,res,next) => {
        usersDb.getById(req.params.id)
        .then(user => {
            req.user = user
			next()
		})
		.catch((error) => {
			console.log(error)
			res.status(404).json({
				message: "user not found",
			})
		})
    }
}

function validateBody(type) {
    return (req, res, next) => {
        switch (type){
            case "user":
                if (req.body.name) {
                    next();
                } else {
                    res.status(400).json({message: 'user requires a name'})
                }
            break
            case "post":
                if (req.body.text) {
                    next();
                } else {
                    res.status(400).json({message: 'post requires text'})
                }
        }
    }

}





module.exports = {
    validateUserId, validateBody
}