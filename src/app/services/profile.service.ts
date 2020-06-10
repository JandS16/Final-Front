import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  constructor(private db: AngularFirestore) { }

  getProfiles(companie: string) {
    return this.db
      .collection('companies', (ref) => ref.where('companie', '==', companie))
      .snapshotChanges();
  }

  getProfile(profileId: string) {
    return this.db
      .collection('companies').doc(profileId).snapshotChanges()
  }
}
