import { NgModule } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

const MAT_MODULES = [
  MatToolbarModule
];

@NgModule({
  imports: [MAT_MODULES],
  exports: [MAT_MODULES]
})
export class MaterialModule {}
