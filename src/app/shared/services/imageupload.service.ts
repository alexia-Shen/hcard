import { Injectable } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ImageUploadService {

  constructor() { }

  createImageUploader(): { uploader: FileUploader, listener: Observable<any> } {
    const listener = new Subject();
    const uploader = new FileUploader({
      maxFileSize: 1024 * 1024 * 5,
      url: '...',
      allowedMimeType: ['image/jpeg', 'image/jpg', 'image/png']
    });

    return { uploader: uploader, listener: listener.asObservable() };
  }
  public uploadImage(uploader: FileUploader, image: FileItem): void {
    // uploader.uploadItem(image);
  }
}
