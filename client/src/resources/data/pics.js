import {inject} from 'aurelia-framework';
import {DataServices} from './data-services';

@inject(DataServices)
export class Pics {
  constructor(data) {
    this.data = data;
    this.PIC_SERVICE = 'pics';
    this.picsArray = [];
  }

  async getUserPic(galleryId) {
    let response = await this.data.get(this.PIC_SERVICE + "/" + id);
    if (!response.error && !response.message) {
      this.picsArray = response;
    }
  }

  async save(pics) {
    if (pics) {
      if (!pics._id) {
        let response = await this.data.post(pics, this.GALLERY_SERVICE + "/" + this.PIC_SERVICE);
        if (!response.error) {
          this.picsArray.push(response);
        }
        return response;
      } else {
        let response = await this.data.put(pics, this.GALLERY_SERVICE + "/" + this.PIC_SERVICE + "/" + pics._id);
        if (!response.error) {
// this.updateArray(response);
        }
        return response;
      }
    }
  }

  async deletePics(id) {
    let response = await this.data.delete("pics" + "/" + id);
    if (!response.error) {
      for (let i = 0; i < this.picsArray.length; i++) {
        if (this.picsArray[i]._id === id) {
          this.picsArray.splice(i, 1);
        }
      }
    }
  }
  
  async uploadFile(files, galleryId, picsId) {
    let formData = new FormData();
    files.forEach((item, index) => {
      formData.append("file" + index, item);
    });
    let response = await this.data.uploadFiles(formData, this.GALLERY_SERVICE + "/upload/" + galleryId + "/" + picsId);
    return response;
  }
}