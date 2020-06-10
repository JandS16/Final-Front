import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Question } from 'src/app/services/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() numQuestion: number
  @Input() question: Question
  @Output() variable = new EventEmitter<number[]>();
  
  selectedOption: number;

  constructor() { }

  ngOnInit(): void {
  }

	select(x: number){
		this.selectedOption = x;
		this.variable.emit([this.numQuestion, x]);
	}

}
