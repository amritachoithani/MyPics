var express = require('express'),
router = express.Router(),
logger = require('../../config/logger');
var mongoose = require('mongoose'),
Todo = mongoose.model('Todo');
multer = require('multer'),
mkdirp = require('mkdirp');

module.exports = function (app, config) {
  app.use('/api', router);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {      
          var path = config.uploads + req.params.userId + "/";
        mkdirp(path, function(err) {
            if(err){
                res.status(500).json(err);
            } else {
                cb(null, path);
            }
        });
    },
    filename: function (req, file, cb) {
        let fileName = file.originalname.split('.');   
        cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
    }
  });

  router.post('/todos', function (req, res, next) {
     logger.log('Create Todo', 'verbose');
    var todo = new Todo(req.body);
     todo.save()
     .then(result => {
    res.status(201).json(result);
     })
    .catch(err => {
     return next(err);
     })
   });
      
  router.get('/todo', function(req, res, next){
     logger.log('Get all todo', 'verbose');

      var query = Todo.find()
      .sort(req.query.order)
      .exec()
      .then(result => {
           if(result && result.length) {
          res.status(200).json(result);
      } else {
          res.status(404).json({message: "No Todos"});
      }
      })
      .catch(err => {
        return next(err);
      });
  })

  router.get('/todo/:todoId', function(req, res, next){
    logger.log('Get Todo ' + req.params.todoId, 'verbose');
            Todo.findById(req.params.todoId)
                .then(todo => {
                    if(todo){
                        res.status(200).json(todo);
                    } else {
                        res.status(404).json({message: "No Todo found"});
                    }
                })
                .catch(error => {
                    return next(error);
                });
        });       

router.get('/todos/:userId', function(req, res, next){
    logger.log('Get todo ' + req.params.userId, 'verbose');
        Todo.find({userId: req.params.userId})
          .then(todo => {
            if(todo){
                res.status(200).json(todo);
            } else {
                res.status(404).json({message: "No todo found"});
            }
            })
            .catch(error => {
            return next(error);
            });
});  

router.put('/todos/:todoId', function(req, res, next){
      logger.log('Update Todos', + req.params.todoId,  'verbose');
 
          Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new:true, multi:false})
              .then(todo => {
                  res.status(200).json(todo);
              })
              .catch(error => {
                  return next(error);
              });
      }); 
     

      router.delete('/todos/:todoId', function(req, res, next){
        logger.log('Delete Todo ', + req.params.todoId,  'verbose');
   
            Todo.remove({ _id: req.params.todoId })
                .then(todo => {
                    res.status(200).json({msg: "Todo Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
});


  var upload = multer({ storage: storage });
  router.post('/todos/upload/:userId/:todoId', upload.any(), function(req, res, next){
      logger.log('Upload file for todo ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
      
      Todo.findById(req.params.todoId, function(err, todo){
          if(err){ 
              return next(err);
          } else {     
              if(req.files){
                  todo.file = {
                      filename : req.files[0].filename,
                      originalName : req.files[0].originalname,
                      dateUploaded : new Date()
                  };
              }           
              todo.save()
                  .then(todo => {
                      res.status(200).json(todo);
                  })
                  .catch(error => {
                      return next(error);
                  });
          }
      });
});

}