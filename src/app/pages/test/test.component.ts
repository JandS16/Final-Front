import { Component, OnInit } from '@angular/core';
import {  TestService} from '../../services/test.service'
import { Question } from '../../services/question'
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'firebase';
import { Test } from '../../services/test';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  public title: string;
  public questions: Question[];
  private answers: number[];
  public preloader: boolean = true;
  public error: boolean = false;
  public complete: boolean = false;
  private testId: string;
  private user: User;

  constructor(private _testService: TestService, private _activeRoute: ActivatedRoute, private _router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this._activeRoute.params.subscribe( params=>{
      if (params!== undefined){
        this.testId = params['id']
        this._testService.getTest(this.testId).subscribe((item)=>{
          this.preloader = false
          if (item.payload.data() !== undefined) {
            this.title = item.payload.data()['title']
            this.questions = item.payload.data()['questions'] as Question[]
            this.answers = new Array(this.questions.length)
          } else {
            this.error = true;
          }
        })        
      }
    })  
  }

  ngOnInit(): void {
  }

  //Posición cero el número de pregunta y uno la respuesta seleccionada
  onLevel(x: number[]) {
    this.answers[x[0]] = x[1];
    this.checkComplete()
  }

  checkComplete(){
    let cont: number = 0;
    for (let index = 0; index < this.answers.length; index++) {
      if(this.answers[index] !== undefined){
        cont = cont +1
      }
    }
    this.complete = cont == this.answers.length
  }

  sendTest(){
    let correctas: number = 0
    for (let index = 0; index < this.questions.length; index++) {
      console.log(`Seleccionada ${this.answers[index]} Correcta: ${this.questions[index].respuesta}`)
      if (this.questions[index].respuesta === this.answers[index]) {
        correctas = correctas + 1
      }
    }
    const data: Test = {
      correct: correctas,
      wrong: this.questions.length-correctas,
      score: correctas/this.questions.length*100
    }
    this._testService.addTestEmployee(this.user.uid, this.testId, data)
    this._router.navigate(['results', this.testId])
  }

}
