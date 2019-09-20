import { NgModule } from "@angular/core";
import { ImageUploadService } from './services/imageupload.service';
import { PreviewCardComponent } from './components/card/card.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    imports: [FileUploadModule],
    declarations: [PreviewCardComponent],
    providers: [ImageUploadService],
    exports: [FileUploadModule, PreviewCardComponent]
})
export class SharedModule {}
