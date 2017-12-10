import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Gallery} from '../resources/data/gallery';
import {Pics} from '../resources/data/pics';
import { AuthService } from 'aurelia-auth';


@inject(Router, AuthService, Gallery, Pics)
export class List {
  constructor(router, auth, gallery, pics) {
    this.gallery = gallery;
    this.pics = pics;
    this.router = router;
    this.message = 'List';
    this.auth = auth;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.showList = 'galleryList';
  }


  async activate(){
		await this.gallery.getUserGallery(this.user._id);
	}

        createGallery(){	
            this.galleryObj = {
                gallery: "",
                description: "",
                dateCreated: new Date(),
                userId: this.user._id,
            }
            this.showList = 'galleryForm';		
        }

        createPics(){	
            this.galleryObj = {
                userId: this.user._id,
                Id: this.selectedphoto
            }
            this.showList = 'picsForm';		
        }

        editGallery(gallery){
            this.galleryObj = gallery;
            this. showList = 'galleryForm';
            }

        editPics(gallery){
            this.galleryObj = gallery;
            this. showList = 'picsForm';
            }

        deleteGallery(gallery){
            this.gallery.deleteGallery(gallery._id);
            }
              
        changeFiles(){
            this.filesToUpload = new Array(); 
            this.filesToUpload.push(this.files[0]);
            }
            
        removeFile(index){
            this.filesToUpload.splice(index,1);
            }
                       
    
        async saveGallery(){
            if(this.galleryObj){		
                let response = await this.gallery.save(this.galleryObj);
                if(response.error){
                    alert("There was an error creating the Galleries");
                } else {
                      var galleryId = response._id;
                                    if(this.filesToUpload && this.filesToUpload.length){
                                        await this.gallery.uploadFile(this.filesToUpload, this.user._id, galleryId);
                                        this.filesToUpload = [];
                                    }                     
                }
                this.showList = 'galleryList';
            }
        }

        async savePics(){
            if(this.galleryObj){		
                let response = await this.pics.save(this.galleryObj);
                if(response.error){
                    alert("There was an error creating the Galleries");
                } else {
                      var galleryId = response._id;
                                    if(this.filesToUpload && this.filesToUpload.length){
                                        await this.pics.uploadFile(this.filesToUpload, this.user._id, galleryId);
                                        this.filesToUpload = [];
                                    }                     
                }
                this.showList = 'picsList';
            }
        }

        async showPics (gallery){
            this.selectedpics = gallery._id;
            await this.pics.getPics(gallery._id)
            this.showList ='picsList';
        }

        back(){
            this.showList='galleryList';
        }
        
        backPics(){
            this.showList='picsList';
        }
    
      logout(){
         sessionStorage.removeItem('user');
         this.auth.logout();
    
      }
    }