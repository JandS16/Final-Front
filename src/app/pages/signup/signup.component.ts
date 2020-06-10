import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})



export class SignupComponent implements OnInit {

  file: any;

  constructor(private _authService: AuthService, private _storageService: StorageService) { }

  ngOnInit(): void {
  }

  // called each time file input changes
  onSelectFile(event) {
    this.file = event.target.files[0]
  }

  //Create user using AuthService and save file if there's one.
  createUser(username: string, email: string, password: string, idType: string, id: number, companyName: string, userPhone: string){
    this._authService.SignUp(username, email, password, idType, id, companyName, userPhone).then(
      ()=>{
        console.log(this.file)
        if(this.file !== undefined){
          this._storageService.uploadFile(email, this.file)
        }
      }
    )
  }


}
