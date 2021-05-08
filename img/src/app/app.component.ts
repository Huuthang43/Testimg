import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component } from '@angular/core';
import { ImgService } from 'src/services/img.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'img';
  message: string;
  constructor(private imgSer: ImgService) { }

  onFileUpload(event) {
    if (this.message == undefined ||this.message == " "||this.message == null) {
      alert("message is empty!");
    } else {
      this.imgSer.onFileUpload(event, -1,this.message);
    }
    
  }
  para(message) {
    this.message = message;
  }
  test() {
    this.imgSer.getData();
  }
}
