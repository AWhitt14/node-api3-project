const express = require('express');
const usersDb = require('./userDb')
const postDb = require('../posts/postDb')
const {validateUserId, validateBody} = require('../middleware/validate')

const router = express.Router();


router.post('/', validateBody('user'),(req, res, next) => {
  usersDb.insert(req.body)
  .then(user => {
      res.status(201).json(user)
  })
  .catch(er => {
      next(er);
  })
});

router.post('/:id/posts', validateUserId(), validateBody("post"), (req, res, next) => {
  const newPost = {...req.body, user_id: req.params.id}
  postDb.insert(newPost)
  .then(post => {
    res.status(201).json(post)
  })
  .catch(er => {
    next(er);
  })

});

router.get('/',(req, res, next) => {
  usersDb.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(er => {
    next(er)
  })
});

router.get('/:id', validateUserId() , (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  usersDb.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(er => {
    next(er)
  })
});

router.delete('/:id', validateUserId(), (req, res, next) => {
  usersDb.remove(req.params.id)
  .then(x => {
    res.status(200).json({message: 'user deleted'})
  })
  .catch(er => {
    next(er)
  })
});

router.put('/:id', validateUserId(), validateBody("user"), (req, res, next) => {
  usersDb.update(req.params.id, req.body)
  .then(user => {
    res.status(200)
  })
  .catch(er => {
    next(er)
  })
});


module.exports = router;
