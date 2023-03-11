import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { properties } from 'src/assets/properties/properties';
import { ApiService } from '../../service/api.service';
import { ConstantUri } from '../../utils/constantUri';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 // value1 !: string;          // ! este signo omite la inicializacion de la variable
  logo = properties.logo;
  formLogin: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private readonly ApiService: ApiService<any>
  ) {

  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required, Validators.min, Validators.max],
      password: ['', Validators.required],
    });
  }

  login() {
    if(this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      for(const key in this.formLogin.controls) {
        //console.log(key);
        this.formLogin.controls[key].markAsDirty();
      }
      return;
    }


    const { username, password } = this.formLogin.value;
    const body = {
      username,
      password,
      "request_token": sessionStorage.getItem('requestToken')  //clave de la api
    }

    const configPost = { url: ConstantUri.validateWitheLogin, params: {api_key: ConstantUri.apikey}, body };
    this.ApiService.postService(configPost).subscribe(val => {
      console.log(val);
    });

    console.log(this.formLogin.value)
  }
}
