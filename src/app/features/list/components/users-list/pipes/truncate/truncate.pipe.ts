import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  //primeira formula de fazer sem parametro
  
  // transform(value: string): string{
  //   if(value.length > 10){
  //     return value.substring(0, 10) + '...';
  //   }
  //   return value;
  // }


  //segunda formula de fazer com parametro
  transform(value: string, length:number = 15): string{
    if(value.length > length){
      return value.substring(0, length) + '...';
    }
    return value;
  }

}
