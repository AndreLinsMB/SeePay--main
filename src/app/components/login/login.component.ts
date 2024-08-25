import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  login(){
    if (!this.form.valid) {
      return;
    }

    this.authService.login(this.form.value.email, this.form.value.password);

    this.form.reset();
    this.form.get('email')?.clearValidators();
    this.form.get('email')?.updateValueAndValidity();
    this.form.get('password')?.clearValidators();
    this.form.get('password')?.updateValueAndValidity();
  }
}


