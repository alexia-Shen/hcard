import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HCardBuilderComponent } from './hcard-builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { PreviewCardComponent } from 'src/app/shared/components/card/card.component';
import { ImageUploadService } from 'src/app/shared/services/imageupload.service';
import { Store } from '@ngrx/store';
import { TestStore } from 'src/testing/teststore.util';
import { formState } from 'src/app/shared/store/form.store';


describe('HcardComponent', () => {
  let component: HCardBuilderComponent;
  let fixture: ComponentFixture<HCardBuilderComponent>;
  let store: TestStore<formState>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule
      ],
      providers: [
        {
          provide: ImageUploadService,
          useValue: {
            createImageUploader: () => {
              return { uploader: {}, listener: {} };
            }
          }
        },
        {
          provide: Store,
          useClass: TestStore
        }
      ],
      declarations: [
        HCardBuilderComponent,
        PreviewCardComponent
      ],
    }).compileComponents();
  }));

  beforeEach(inject([Store], (testStore: TestStore<formState>) => {
    store = testStore;
    store.setState({
      personalDetail: {
        givenName: 'name1',
        surname: 'name2',
        email: '123@email.com',
        phone: '1234567890'
      }, addressDetail: {
        houseNameOrNumber: '1',
        street: 'street',
        suburb: 'suburb',
        state: 'state',
        postcode: '1234',
        country: 'country'
      }, photoPath: '...'
    }); // set dummy state
    fixture = TestBed.createComponent(HCardBuilderComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  }));

  it('should set form initial value from store', () => {
    expect(component.personalForm.value).toEqual({
      givenName: 'name1',
      surname: 'name2',
      email: '123@email.com',
      phone: '1234567890'
    });
    expect(component.addressForm.value).toEqual({
      houseNameOrNumber: '1',
      street: 'street',
      suburb: 'suburb',
      state: 'state',
      postcode: '1234',
      country: 'country'
    });
    store.setState({
      personalDetail: {
        givenName: '',
        surname: '',
        email: '',
        phone: ''
      }, addressDetail: {
        houseNameOrNumber: '',
        street: '',
        suburb: '',
        state: '',
        postcode: '',
        country: ''
      }, photoPath: '...'
    }); //clear value

    //form value should not change
    expect(component.personalForm.value).toEqual({
      givenName: 'name1',
      surname: 'name2',
      email: '123@email.com',
      phone: '1234567890'
    });
    expect(component.addressForm.value).toEqual({
      houseNameOrNumber: '1',
      street: 'street',
      suburb: 'suburb',
      state: 'state',
      postcode: '1234',
      country: 'country'
    });

  });
  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('hcard Profile');
  });

  it('should dispatch form value', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.personalForm.patchValue({
      givenName: '',
      surname: '',
      email: '',
      phone: ''
    });
    expect(dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'UPDATE_DETAIL',
      payload: {
          value : {
            givenName: '',
            surname: '',
            email: '',
            phone: ''
          },
          key: 'personalDetail'
      }
    });
    component.addressForm.patchValue({
      houseNameOrNumber: '',
      street: '',
      suburb: '',
      state: '',
      postcode: '',
      country: ''
    });
    expect(dispatchSpy).toHaveBeenCalledTimes(2);
    expect(dispatchSpy).toHaveBeenCalledWith({
      type: 'UPDATE_DETAIL',
      payload: {
          value : {
            houseNameOrNumber: '',
            street: '',
            suburb: '',
            state: '',
            postcode: '',
            country: ''
          },
          key: 'addressDetail'
      }
    });
  });

  it('form invalid when empty', () => {
    component.personalForm.patchValue({
      givenName: '',
      surname: '',
      email: '',
      phone: ''
    });
    component.addressForm.patchValue({
      houseNameOrNumber: '',
      street: '',
      suburb: '',
      state: '',
      postcode: '',
      country: ''
    });
    expect(component.personalForm.valid).toBeFalsy();
    expect(component.addressForm.valid).toBeFalsy();
  });

  it('phone field validity', () => {
    let phone = component.personalForm.controls['phone'];
    expect(phone.hasError('phone')).toBeFalsy();
    phone.setValue('INVALID PHONE04123');
    expect(phone.hasError('required')).toBeFalsy();
    expect(phone.hasError('phone')).toBeTruthy();
    phone.setValue('04123');
    expect(phone.hasError('phone')).toBeTruthy();
    phone.setValue('0400123456');
    expect(phone.valid).toBeTruthy();
    phone.setValue('0298761243');
    expect(phone.valid).toBeTruthy();

  });

  it('email field validity', () => {
    let email = component.personalForm.controls['email'];
    expect(email.hasError('email')).toBeFalsy();
    email.setValue('INVALID_EMAIL@');
    expect(email.hasError('required')).toBeFalsy();
    expect(email.hasError('email')).toBeTruthy();
    expect(email.valid).toBeFalsy();
    email.setValue('asd@email.com');
    expect(email.valid).toBeTruthy();
  });
});
