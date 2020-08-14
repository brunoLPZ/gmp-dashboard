import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from "@angular/common/http";
import { NullBooleanPipe } from "./pipes/null-boolean.pipe";

const SHARED_MODULES = [
  MaterialModule,
  FlexLayoutModule,
  HttpClientModule
];

const SHARED_COMPONENTS = [
  NullBooleanPipe
];

const SHARED_SERVICES = [
  NullBooleanPipe
];

@NgModule({
  declarations: [SHARED_COMPONENTS],
  imports: [SHARED_MODULES],
  exports: [SHARED_MODULES, SHARED_COMPONENTS],
  providers: [SHARED_SERVICES]
})
export class SharedModule {}
