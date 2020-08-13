import { NgModule } from "@angular/core";
import { MaterialModule } from "./material/material.module";

const SHARED_MODULES = [
  MaterialModule
];

const SHARED_COMPONENTS = [
];

/** NOTE: Shared services are not provided HERE
 *  cause then they are not singletons
 *  @see app.module.ts providers array
 */
const SHARED_SERVICES = [];

@NgModule({
  declarations: [SHARED_COMPONENTS],
  imports: [SHARED_MODULES],
  exports: [SHARED_MODULES, SHARED_COMPONENTS],
  providers: [SHARED_SERVICES]
})
export class SharedModule {}
