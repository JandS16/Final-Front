import { Injectable, NgZone} from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private authWorkerApp = firebase.initializeApp(firebase.app().options, 'auth-worker');
   private authWorkerAuth = firebase.auth(this.authWorkerApp);
  
  userData: User;
  private isCompanie: boolean = false;

  constructor(public afs: AngularFirestore, public  afAuth:  AngularFireAuth, public  router:  Router, public ngZone: NgZone) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE); 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.saveStorage(user);
        //console.log(user)
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.saveStorage(result.user)
      await this.checkWhoIsSignIn();
      this.ngZone.run(() => {
        if (this.isCompanie) {
          this.router.navigate(['operators-list']);
        } else {
          this.router.navigate(['tests-list']);
        }
      });
      console.log('Logueado')
    } catch (error) {
      Swal.fire({
        title: '¡Ha ocurrido un error!',
        text: error.message,
        icon: 'error',
      });
    }
  }

  public async checkWhoIsSignIn(){
    this.isCompanie = false;
    let user: User = JSON.parse(localStorage.getItem('user'));
    if (user.displayName === "chief") {
      this.isCompanie = true;
    }
    //localStorage.setItem('isComapanie', this.isCompanie)
    return this.isCompanie;
  }

  // Sign up with email/password
  async SignUp(username: string, email: string, password: string, idType: string, id: number, companyName: string, phoneNumber: number) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await result.user.updateProfile({
        displayName: "chief"
      })
      /* Call the sendEmailVerification() function when new user sign up and returns promise */
      //this.SendVerificationMail();
      const Toast = Swal.mixin({
        toast: true,
        position: 'center-start',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Registrado exitosamente. Verificar correo.'
      });
      this.SetUserData(result.user, username, companyName, idType, id, phoneNumber);
      this.isCompanie = true;
      this.ngZone.run(() => {
        this.router.navigate(['operators-list']);
      });
    } catch (error) {
      window.alert(error.message);
    }
  }

  async SignUpEmployee(username: string, email: string, password: string, idType: string, id: number, companyName: string) {
    // disables caching of account credentials
    /* console.log("Vamos a registrar el siguiente correo: "+email)
    this.authWorkerAuth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    }); */


    let employee: User = null
    try {
      const result = await this.authWorkerAuth.createUserWithEmailAndPassword(email, password);
      result.user.updateProfile({
        displayName: username
      })
      employee = result.user
      const Toast = Swal.mixin({
        toast: true,
        position: 'center-start',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        onOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
      });
      Toast.fire({
        icon: 'success',
        title: 'Empleado registrado'
      });
    } catch (error) {
      window.alert(error.message);
    }
    if (employee !== null) {
      return employee.uid;
    } else {
      return null;
    }
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail: string) {
    try {
      await this.afAuth.sendPasswordResetEmail(passwordResetEmail);
      Swal.fire({
        title: '¡Proceso realizado!',
        text: 'El correo electrónico de restauración de contraseña ha sido enviado. Por favor, revisar tu bandeja.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Cool'
      });
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) //&& user.emailVerified !== false) ? true : false;
  }

  async insertEmail() {
    const { value: email } = await Swal.fire({
      title: 'Input email address',
      input: 'text',
      inputPlaceholder: 'Enter your email address'
    });
    if (email) {
      this.ForgotPassword(email);
    }
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    this.afAuth.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          // this.router.navigate(['path']);
        });
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth 
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: User, name: string, company: string, idType: string, id: number, phoneNumber) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`companies/${user.uid}`);
    const userData = {
      name: name,
      empresa: company,
      tipo_id: idType,
      id: id,
      telefono: phoneNumber
    };
    console.log(user.displayName)
    this.saveStorage(user);
    return userRef.set(userData, {
      merge: true
    });
  }

  saveStorage(user: User){
    this.userData = user;
    localStorage.setItem('user', JSON.stringify(this.userData));
  }

  // Sign out
  async SignOut() {
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    this.ngZone.run(() => {
      this.router.navigate(['login']);
    });
  }

}