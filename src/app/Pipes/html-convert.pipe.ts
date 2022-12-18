import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'htmlConvert'
})
export class HtmlConvertPipe implements PipeTransform {

  constructor(private _sanitizer: DomSanitizer) { }

  transform(value: string, event?: unknown): SafeHtml {
      return this._sanitizer.bypassSecurityTrustHtml(value);
  }
}
