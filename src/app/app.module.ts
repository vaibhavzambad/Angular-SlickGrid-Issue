import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GridBasicComponent } from "./grid-basic/grid-basic.component";
import { RowDetailPreloadComponent } from "./row-detail-preload/row-detail-preload.component";
import { RowDetailViewComponent } from "./row-detail-view/row-detail-view.component";
import { AngularSlickgridModule } from "angular-slickgrid";

@NgModule({
  declarations: [
    AppComponent,
    GridBasicComponent,
    RowDetailPreloadComponent,
    RowDetailViewComponent
  ],
  imports: [BrowserModule, AppRoutingModule, AngularSlickgridModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
