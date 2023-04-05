import { SearchResultsComponent } from './search-results/search-results.component';
import { DeleteStudentComponent } from './delete-student/delete-student.component';
import { AddScoreComponent } from './add-score/add-score.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { SearchComponent } from './search/search.component';
import { UpdateStudentComponent } from './update-student/update-student.component';

const routes: Routes = [
  {path:"", redirectTo:'search', pathMatch:'full'},
  {path:'search',component:SearchComponent},
  {path:'create',component:CreateStudentComponent},
  {path:'update-student/:id',component:UpdateStudentComponent},
  {path:'add-score/:id', component:AddScoreComponent},
  {path: 'delete-student/:id',component:DeleteStudentComponent},
  {path: 'search-result/:searchCriteria/:searchTerm',component:SearchResultsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
