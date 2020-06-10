import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(public db: AngularFirestore) {}

  private item;
  setItem(item){
    this.item=item;
  }
  getItem(){
    return this.item;
  }
  
  getCompanie(companie){
    console.log("Buscando la empresa de codigo: "+companie)
    return this.db.collection('empresas').doc(companie).snapshotChanges();
  }

  getAvatars() {
    return this.db.collection('/avatar').valueChanges();
  }

  getUser(userKey) {
    return this.db.collection("employees").doc(userKey).snapshotChanges();
    
  }

  updateUser(userKey, value) {
    return this.db.collection('employees').doc(userKey).update(value);
  }

  deleteUser(userKey) {
    return this.db.collection('employees').doc(userKey).delete().then(
      

    );
  }

  getUsers(companie) {
    return this.db
      .collection('employees', (ref) => ref.where('companie', '==', companie))
      .snapshotChanges();
  }

  searchUsers(searchValue) {
    return this.db
      .collection('employees', (ref) =>
        ref
          .where('nameToSearch', '>=', searchValue)
          .where('nameToSearch', '<=', searchValue + '\uf8ff')
      )
      .snapshotChanges();
  }

  searchUsersByAge(value) {
    return this.db
      .collection('users', (ref) => ref.orderBy('age').startAt(value))
      .snapshotChanges();
  }

  available(userKey,available){
    if(available==1){
      return this.db.collection('employees').doc(userKey).update({
        available: 0
      });
    }else{
      return this.db.collection('employees').doc(userKey).update({
        available: 1
      });
    }
   
  }

  createUser(value, uid, avatar) {
    let user: User = JSON.parse(localStorage.getItem('user'));
    let companyName=user.uid;
    const userRef: AngularFirestoreDocument<any> = this.db.doc(`employees/${uid}`);
    const data = {
      name: value.UserName,
      tipoDocumento: value.idType,
      numeroDocumento: value.UserId,
      password: value.UserPassword,
      address: value.Direccion,
      avatar: avatar,
      email: value.UserEmail,
      companie: user.uid,
      available: 1,
    }
    return userRef.set(data, {
      merge: true
    });
  }
}
