import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ImgService {
  Imgs: any;
  selecetdFile: File;
  img: string;
  constructor(private http: HttpClient) {
    this.getData();
  }
  getRandomId() {//lấy id ngẫu nhiên
    return Math.floor(Math.random() * 999999);
  }

  onFileUpload(event, id,message) {//upload file ảnh
    this.selecetdFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.img = reader.result as string;
      if (id == -1) {//kiểm tra nếu id=-1 thì được upload mới
        this.newUpload(this.img, this.getRandomId(), event.target.files[0].name,message,Date);
      } else {
        this.updateImg(this.img, id);//còn không thì giữ nguyên ảnh hiện tại với id cũ
      }
    };
    reader.readAsDataURL(this.selecetdFile);
  }


  //Tạo ảnh mới
  async newUpload(img, id, name,message,createDate) {
    let data = {
      id: id,
      img: img,
      name: name,
      message:message,
      createDate:createDate,
    }
    await this.http.post(environment.endpoint + "uploadImg", data).toPromise();
    this.getData();
  }


  //lấy dữ liệu ảnh ra
  async getData() {
    this.Imgs = await this.http.get(environment.endpoint + "imgs").toPromise();
  }

  //Cập nhật ảnh
  async updateImg(img, id) {
    let data = {
      id: id,
      img: img
    }
    await this.http.put(environment.endpoint + "update", data).toPromise();

    this.getData();
  }


  //Xóa ảnh dựa vào id 
  async delImg(id) {
    await this.http.delete(environment.endpoint + "delete?id=" + id).toPromise();
    this.getData();
  }


}
