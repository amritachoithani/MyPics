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

  router.get('/mypics/:mypicId', requireAuth, function(req, res, next){
    logger.log('Get My Pics List' + req.params.mypicId, 'verbose');
            Mypic.findById(req.params.mypicId)
                .then(mypic => {
                    if(mypic){
                        res.status(200).json(mypics);
                    } else {
                        res.status(404).json({message: "No pictures found"});
                    }
                })
                .catch(error => {
                    return next(error);
                });
        });       
        
router.get('/mypics/user/:userId', function(req, res, next){
    logger.log('Get MyPics for a user' + req.params.mypicId, 'verbose');
        Mypic.find({userId: req.params.userId})
          .then(mypics => {
            if(mypics){
                res.status(200).json(mypics);
            } else {
                res.status(404).json({message: "No pictures"});
            }
            })
            .catch(error => {
            return next(error);
            });
        });   


  router.post('/mypics', function (req, res, next) {
     logger.log('Create Photo', 'verbose');
    var mypic = new Todo(req.body);
     mypic.save()
     .then(result => {
    res.status(201).json(result);
     })
    .catch(err => {
     return next(err);
     })
   });
      


router.put('/mypics/:mypicId', function(req, res, next){
      logger.log('Update Photo', + req.params.todoId,  'verbose');
 
          Mypic.findOneAndUpdate({_id: req.params.todoId}, req.body, {new:true, multi:false})
              .then(mypic => {
                  res.status(200).json(todo);
              })
              .catch(error => {
                  return next(error);
              });
      }); 
     

var upload = multer({ storage: storage });
      router.post('/mypics/upload/:userId/:mypicId', upload.any(), function(req, res, next){
          logger.log('Upload Photo' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
          
          Mypic.findById(req.params.mypicId, function(err, mypic){
              if(err){ 
                  return next(err);
              } else {     
                  if(req.files){
                      mypic.file = {
                          filename : req.files[0].filename,
                          originalName : req.files[0].originalname,
                          dateUploaded : new Date()
                      };
                  }           
                  mypic.save()
                      .then(mypic => {
                          res.status(200).json(mypic);
                      })
                      .catch(error => {
                          return next(error);
                      });
              }
          });
    });      

router.delete('/mypics/:mypicId', function(req, res, next){
        logger.log('Delete Photo', + req.params.todoId,  'verbose');
   
            Mypic.remove({ _id: req.params.todoId })
                .then(user => {
                    res.status(200).json({msg: "Photo Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
        });
}