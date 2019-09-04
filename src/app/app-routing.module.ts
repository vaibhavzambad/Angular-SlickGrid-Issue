import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GridBasicComponent } from "./grid-basic/grid-basic.component";

const routes: Routes = [{ path: "GridBasic", component: GridBasicComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
