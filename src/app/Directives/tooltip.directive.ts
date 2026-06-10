import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Tooltip } from 'bootstrap';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit, OnDestroy {

  constructor(private el: ElementRef) { }

  private tooltip?: Tooltip;

  ngOnInit(): void {
    this.tooltip = new Tooltip(this.el.nativeElement)
  }

  ngOnDestroy(): void {
    this.tooltip?.dispose()
  }
}
