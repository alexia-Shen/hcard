import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from '@ngrx/store';
import { formState } from '../../store/form.store';
import { Person } from '../../model/person.model';
import { Address } from '../../model/address.model';
import { Subscription } from 'rxjs';

@Component({
    selector: 'preview-card',
    templateUrl: './card.html',
    styleUrls: ['./card.scss']
})
export class PreviewCardComponent implements OnInit, OnDestroy{
    photoPath: string;
    profileName: string;
    emailAddress: string;
    phoneNumber: string;
    addressLineOne: string;
    addressLineTwo: string;
    postcode: string;
    country: string;

    formSubscription: Subscription;
    constructor(
        private _store: Store<formState>
    ) {}

    ngOnInit() {
        
        this.formSubscription = this._store.select('form').subscribe((form: formState) => {
            this.photoPath = form.photoPath;
            this.profileName = this.nameFormatter(form.personalDetail);
            this.emailAddress = form.personalDetail.email;
            this.phoneNumber = form.personalDetail.phone;

            this.addressLineOne = this.addressLineOneFormatter(form.addressDetail);
            this.addressLineTwo = this.addressLineTwoFormatter(form.addressDetail);
            
            this.postcode = form.addressDetail.postcode;
            this.country = form.addressDetail.country;
        });
    }

    private nameFormatter(personalDetail: Person) {
        return personalDetail ? 
            ((personalDetail.givenName || "") + " " + (personalDetail.surname || ""))
             : "";
    }

    private addressLineOneFormatter(addressDetail: Address) {
        return addressDetail ? 
            ((addressDetail.houseNameOrNumber || "") + " " + (addressDetail.street || ""))
            : "";
    }
    private addressLineTwoFormatter(addressDetail: Address) {
        return addressDetail ? 
            ((addressDetail.suburb ? addressDetail.suburb + ", " : "") + (addressDetail.state || ""))
            : "";
    }

    ngOnDestroy() {
        this.formSubscription.unsubscribe();
    }
}
