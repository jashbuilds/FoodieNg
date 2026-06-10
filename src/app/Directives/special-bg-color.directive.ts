import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appSpecialBgColor]'
})
export class SpecialBgColorDirective {

  constructor(private el: ElementRef) { }

  @Input() set appSpecialBgColor(condition: boolean) {
    this.el.nativeElement.style.backgroundColor = condition ? 'green' : '';
    this.el.nativeElement.style.color = condition ? 'white' : '';
  }

}
