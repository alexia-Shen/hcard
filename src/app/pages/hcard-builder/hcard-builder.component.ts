import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, FormControl} from "@angular/forms";
import { phoneNumberValidator, emailValidator, required } from 'src/app/shared/utility/validators';
import { formState } from 'src/app/shared/store/form.store';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { ImageUploadService } from 'src/app/shared/services/imageupload.service';
import { FileUploader } from 'ng2-file-upload';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './hcard-builder.html',
    styleUrls: ['./hcard-builder.scss']
})
export class HCardBuilderComponent implements OnInit, OnDestroy{
    personalForm: FormGroup;
    addressForm: FormGroup;
    imageUploader: FileUploader;

    subsriptions: Subscription[] = [];
    constructor(
        private formBuilder: FormBuilder,
        private _store: Store<formState>,
        private _image: ImageUploadService
    ) {
        this.personalForm = this.formBuilder.group({
            givenName: new FormControl('', [required()]),
            surname: new FormControl('', [required()]),
            phone: new FormControl('', [required(), phoneNumberValidator()]),
            email: new FormControl('', [required(), emailValidator()]),
        });
        this.addressForm = this.formBuilder.group({
            houseNameOrNumber: new FormControl('', [required()]),
            street: new FormControl('', [required()]),
            suburb: new FormControl('', [required()]),
            postcode: new FormControl('', [required()]),
            state: new FormControl('', [required()]),
            country: new FormControl('', [required()]),
        });
        const uploader = this._image.createImageUploader();
        this.imageUploader = uploader.uploader;
       
    }
    isPersonalFormFieldInvalid(field: any) {
        return !this.personalForm.get(field).valid && this.personalForm.get(field).touched;    
    }

    isAddressFormFieldInvalid(field: any) {
        return !this.addressForm.get(field).valid && this.addressForm.get(field).touched; 
    }

    ngOnInit() {
        this._store.select('form')
        .pipe(take(1))
        .subscribe((form: formState) => {
            this.personalForm.patchValue(form.personalDetail);
            this.addressForm.patchValue(form.addressDetail);
        });

        this.subsriptions.push(this.personalForm.valueChanges.subscribe((value) => {
            this._store.dispatch({
                type: 'UPDATE_DETAIL',
                payload: {
                    value,
                    key: 'personalDetail'
                }
            });
        }));
        this.subsriptions.push(this.addressForm.valueChanges.subscribe((value) => {
            this._store.dispatch({
                type: 'UPDATE_DETAIL',
                payload: {
                    value,
                    key: 'addressDetail'
                }
            });
        }));

        this.imageUploader.onAfterAddingFile = (fileItem) => {
            this._image.uploadImage(this.imageUploader, fileItem);
            const reader = new FileReader();
            reader.onload = (e) => {
                const imageURL = reader.result.toString();
                this._store.dispatch({
                    type: 'UPDATE_DETAIL',
                    payload: {
                        value: imageURL,
                        key: 'photoPath'
                    }
                });
            };
            
            reader.readAsDataURL(fileItem._file);
        };
        this.imageUploader.onWhenAddingFileFailed = (fileItem, filter) => {
            let message = '';
            switch (filter.name) {
              case 'fileSize':
                message = 'The file ' + fileItem.name + ' exceeds maximun file size(5MB).';
                break;
              case 'mimeType':
                message = 'File format not supported.';
                break;
              default:
                message = 'Fail to upload file, please try again.';
                break;
            }
        };
    }
    submitForm() {
    }

    ngOnDestroy() {
        this.subsriptions.forEach(sub => sub.unsubscribe());
    }
}
