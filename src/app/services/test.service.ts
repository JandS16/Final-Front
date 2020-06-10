import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Test } from '../services/test';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  
  constructor(private db: AngularFirestore) { }

  getTests(companie: string) {
    return this.db
      .collection('tests', (ref) => ref.where('companie', '==', companie))
      .snapshotChanges();
  }

  getTest(testId: string) {
    return this.db
      .collection('tests').doc(testId).snapshotChanges()
  }

  addTestEmployee(uid: string, testId: string, data: Test){
    this.db.doc(`employees/${uid}`).snapshotChanges().subscribe((item)=>{
      let tests = item.payload.data()['tests'] as {};
      tests[`${testId}`] = data;
      return this.db.doc(`employees/${uid}`).update({tests: tests})
    })
  }

  getTestsEmployee(uid: string) {
    return this.db
      .collection(`employees`).doc(`${uid}`).snapshotChanges();
  }

  deleteTest(testId: string) {
    return this.db.collection('tests').doc(testId).delete();
  }

  addTest(title: string, time: number, questions, companie: string) {
    const testRef: AngularFirestoreCollection<any> = this.db.collection(`tests`);
    const data = {
      questions: questions,
      companie: companie,
      time: time,
      title: title
    }
    return testRef.add(data);
  }
}
