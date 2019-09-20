import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PreviewCardComponent } from './card.component';
import { Store } from '@ngrx/store';
import { TestStore } from 'src/testing/teststore.util';
import { formState } from 'src/app/shared/store/form.store';


describe('PreviewCardComponent', () => {
  let component: PreviewCardComponent;
  let fixture: ComponentFixture<PreviewCardComponent>;
  let store: TestStore<formState>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        {
          provide: Store,
          useClass: TestStore
        }
      ],
      declarations: [
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
    fixture = TestBed.createComponent(PreviewCardComponent);
    fixture.detectChanges();
    component = fixture.debugElement.componentInstance;
  }));

  it('should set form initial value from store', () => {
    expect(component.profileName).toBe('name1 name2');
    expect(component.phoneNumber).toBe('1234567890');
    expect(component.emailAddress).toBe('123@email.com');
    expect(component.addressLineOne).toBe('1 street');
    expect(component.addressLineTwo).toBe('suburb, state');
    expect(component.postcode).toBe('1234');
    expect(component.country).toBe('country');
    expect(component.photoPath).toBe('...');
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
        }, photoPath: ''
    }); //clear value

    //value should change
    expect(component.profileName).toBe(' ');
    expect(component.phoneNumber).toBe('');
    expect(component.emailAddress).toBe('');
    expect(component.addressLineOne).toBe(' ');
    expect(component.addressLineTwo).toBe('');
    expect(component.postcode).toBe('');
    expect(component.country).toBe('');
    expect(component.photoPath).toBe('');
  });

});
