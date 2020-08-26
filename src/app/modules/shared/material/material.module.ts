import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatMenuModule } from "@angular/material/menu";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";

const MAT_MODULES = [
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatSidenavModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatListModule,
  MatInputModule,
  MatSortModule,
  MatMenuModule,
  MatSelectModule,
  MatSlideToggleModule
];

@NgModule({
  imports: [MAT_MODULES],
  exports: [MAT_MODULES]
})
export class MaterialModule {}
