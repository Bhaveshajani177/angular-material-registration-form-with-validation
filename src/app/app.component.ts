import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { FormControl, Validators, MinLengthValidator, FormBuilder, FormGroup, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angularMaterialRegistration';
  public registrationForm: FormGroup;
  mismatch: boolean = false;
  pattern="[6789][0-9]{9}";

  constructor(private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.registrationForm = this.formBuilder.group(
      {
        f_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        l_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.pattern)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)]),
        c_password: new FormControl('', [Validators.required])
      }, { validator: this.passwordConfirming });
  }

  // confirmation mathod
  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('password').value !== c.get('c_password').value) {
      return { invalid: true };
    }
  }

  //method for error in registration form
  public hasError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }

  // function call on submit login form
  submitRegistrationForm(submitRegistrationFormValue){
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      this.registrationForm.reset();
    }
  }

  login(){
    console.log("Navigate to login component");
    // this.router.navigate(['/login-component']);
  }
}
