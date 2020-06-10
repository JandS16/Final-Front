import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  
  url: string;

  constructor(
    private storage: AngularFireStorage
  ) { }

  //Upload file
  public uploadFile(fileName: string, datos: any) {
    return this.storage.upload(fileName, datos);
  }

  //Get reference to file
  public getReference(fileName: string): AngularFireStorageReference {
    return this.storage.ref(fileName);
  }

  //Get file url
  public async getImage(fileName: string){
    const img = await this.storage.ref(fileName).getDownloadURL().toPromise()
    .then(res => localStorage.setItem('url', res))
    .catch(res => this.getImage('default.jpg'))
  }

}
