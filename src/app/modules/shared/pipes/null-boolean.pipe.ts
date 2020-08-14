import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'nullBoolean'})
export class NullBooleanPipe implements PipeTransform {
  transform(value: boolean): string {
    if (value == null) {
      return 'Not specified';
    }
    return value ? 'Yes' : 'No';
  }
}
