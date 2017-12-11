var express = require('express'),
router = express.Router(),
logger = require('../../config/logger');
var mongoose = require('mongoose'),
Pics = mongoose.model('Pics');
multer = require('multer'),
mkdirp = require('mkdirp');

module.exports = function (app, config) {
  app.use('/api', router);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {      
var path = config.uploads + "/" + req.params.galleryId + "/";
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
        
router.get('/users/gallery/:galleryId', function(req, res, next){
    logger.log('Get Pictures in a Gallery' + req.params.galleryId, 'verbose');
        Pics.find({galleryId: req.params.galleryId})
          .then(pics => {
            if(pics){
                res.status(200).json(pics);
            } else {
                res.status(404).json({message: "No pictures"});
            }
            })
            .catch(error => {
            return next(error);
            });
        });   


  router.post('/gallery/pics/', function (req, res, next) {
     logger.log('Add Picture', 'verbose');
    var pics = new Pics(req.body);
     pics.save()
     .then(result => {
    res.status(201).json(result);
     })
    .catch(err => {
     return next(err);
     })
   });
      


router.put('/gallery/pics/:picsId', function(req, res, next){
      logger.log('Update Pictures', + req.params.picsId,  'verbose');
 
          Pics.findOneAndUpdate({_id: req.params.picsId}, req.body, {new:true, multi:false})
              .then(pics => {
                  res.status(200).json(pics);
              })
              .catch(error => {
                  return next(error);
              });
      }); 
     

var upload = multer({ storage: storage });
      router.post('/gallery/upload/:galleryId/:picsId', upload.any(), function(req, res, next){
          logger.log('Upload Picture' + req.params.picsId, 'verbose');
          
          Pics.findById(req.params.picsId, function(err, pics){
              if(err){ 
                  return next(err);
              } else {  
            console.log(pics)   
                  if(req.files){
                      pics.file = {
                          filename : req.files[0].filename,
                          originalName : req.files[0].originalname,
                          dateUploaded : new Date()
                      };
                  }           
                  pics.save()
                      .then(pics => {
                          res.status(200).json(pics);
                      })
                      .catch(error => {
                          return next(error);
                      });
              }
          });
    });      

router.delete('/pics/:picsId', function(req, res, next){
        logger.log('Delete Picture', + req.params.picsId,  'verbose');
   
            Pics.remove({ _id: req.params.picsId })
                .then(pics => {
                    res.status(200).json({msg: "Picture Deleted"});
                })
                .catch(error => {
                    return next(error);
                });
        });
}