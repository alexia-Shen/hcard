import { Person } from "../model/person.model";
import { Address } from '../model/address.model';
import { ActionReducerMap } from '@ngrx/store';

export interface formState {
    personalDetail: Person;
    addressDetail: Address;
    photoPath: string;
}

const initialForm = {
    personalDetail: {
        givenName: '',
        surname: '',
        email: '',
        phone: ''
    },
    addressDetail: {
        houseNameOrNumber: '',
        street: '',
        state: '',
        suburb: '',
        postcode: '',
        country: ''
    },
    photoPath: 'assets/default_avatar.png'
};

export function formReducer(state = initialForm, action): formState {
    switch (action.type) {
        case 'UPDATE_DETAIL':
            return {...state, [action.payload.key]: action.payload.value};
        default:
            return state;
    }
}
export interface AppStore {
    form: formState;
}

export const appReducers: ActionReducerMap<AppStore> = {
    form: formReducer
};
