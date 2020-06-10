import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

//Rutas
import { OperatorLayoutRoutes } from './operator-layout.routing';

//Componentes
import { TestComponent } from '../../pages/test/test.component';
import { TestListOperatorComponent } from '../../pages/tests-list-operator/tests-list-operator.component';
import { QuestionComponent } from '../../components/question/question.component';

@NgModule({
  declarations: [
    TestComponent,
    TestListOperatorComponent,
    QuestionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(OperatorLayoutRoutes),
    FormsModule
  ]
})
export class OperatorLayoutModule { }
