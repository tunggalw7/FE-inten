import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class HandleErrorService { 
    constructor() {

    }    

    public getError(error: HttpErrorResponse) {

        console.log(error)

        if (error.error) {
            // A client-side or network error occurred. Handle it accordingly.
        } else {
            console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }
    
}
