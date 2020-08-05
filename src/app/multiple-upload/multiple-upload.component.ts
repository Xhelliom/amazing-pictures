import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-multiple-upload',
  templateUrl: './multiple-upload.component.html',
  styleUrls: ['./multiple-upload.component.css']
})
export class MultipleUploadComponent {
  isHovering: boolean;
  files: File[] =[];

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }

  selectMultiplePictures(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      this.files.push(files.item(i));
    }
  }
}
