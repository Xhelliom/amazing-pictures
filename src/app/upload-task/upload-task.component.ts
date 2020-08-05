import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-upload-task',
  templateUrl: './upload-task.component.html',
  styleUrls: ['./upload-task.component.css']
})
export class UploadTaskComponent implements OnInit {

  @Input() file: File;

  task: AngularFireUploadTask;

  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;

  constructor(
    private storage: AngularFireStorage, private db: AngularFirestore
  ) { }

  ngOnInit() {
    this.startUpload();
  }

  startUpload() {

  // picture ID
  const pictureId = /(.*?)-/.exec(uuidv4())[1];

  // The storage path
  const path = `pictures/${pictureId}`;

  // Reference to storage bucket
  const ref = this.storage.ref(path);

  // The main task
  this.task = this.storage.upload(path, this.file);

  // Progress monitoring
  this.percentage = this.task.percentageChanges();

  this.snapshot   = this.task.snapshotChanges().pipe(
    tap(console.log),
    // The file's download URL
    finalize( async() =>  {
      this.downloadURL = await ref.getDownloadURL().toPromise();

      this.db.collection('pictures').doc(pictureId).set( { downloadURL: this.downloadURL, path });
    }),
  );

  }

  isActive(snapshot) {
  return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

}