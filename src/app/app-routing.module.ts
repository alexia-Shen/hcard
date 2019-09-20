import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HCardBuilderComponent } from './pages';

const routes: Routes = [
  {
    path: "hcard",
    component: HCardBuilderComponent
  },
  {
    path: "**",
    redirectTo: "hcard"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
