import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearch implements PipeTransform {

  transform(value: string, search: string): string {
    const valueStr = value + '';
    return valueStr.replace(new RegExp('(?![^&;]+;)(?!<[^<>]*)(' + search + ')(?![^<>]*>)(?![^&;]+;)', 'gi'), '<b class="searchText">$1</b>');
  }

}