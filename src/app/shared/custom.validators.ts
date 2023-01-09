import { Validators } from '@angular/forms';

export class CustomValidators {
    static positiveNumberPattern() {
        return Validators.pattern(/^[1-9]+[0-9]*$/);
    }
}
