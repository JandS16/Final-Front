import { Routes} from '@angular/router';

import { TestComponent } from '../../pages/test/test.component';
import { TestListOperatorComponent } from '../../pages/tests-list-operator/tests-list-operator.component';
import { BarChartComponent } from '../../pages/bar-chart/bar-chart.component';

export const OperatorLayoutRoutes: Routes = [
  {path: 'tests-list', component: TestListOperatorComponent},
  {path: 'test/:id', component: TestComponent},
  {path: 'results/:id', component:BarChartComponent}
  //{path: '**', redirectTo: 'tests-list'}
];
