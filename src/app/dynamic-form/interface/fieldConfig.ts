import { ValidatorFn, FormGroup } from '@angular/forms';
export interface FieldConfig {
    name: string;
    validations?: ValidatorFn[];
    value?: any;
    error?: { name: string; message: string; };
    disabled?: boolean;
    placeholder?: string;
    type: string;
    label?: string;
    options?: string[];
}
