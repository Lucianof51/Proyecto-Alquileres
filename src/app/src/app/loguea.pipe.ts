import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loguea'
})
export class LogueaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
