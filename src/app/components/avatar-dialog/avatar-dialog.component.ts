import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/lista.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent implements OnInit {

  avatars: Array<any> = new Array<any>();

  constructor(
    public dialogRef: MatDialogRef<AvatarDialogComponent>,
    public crudService: CrudService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.crudService.getAvatars()
    .subscribe(data => this.avatars = data);
  }

  close(avatar){
    this.dialogRef.close(avatar);
  }
}