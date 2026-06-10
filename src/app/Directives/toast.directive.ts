import { Directive, ElementRef, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap'


@Directive({
  selector: '[appToast]'
})
export class ToastDirective implements OnInit {

  constructor(private el: ElementRef) { }

  private toast?: bootstrap.Toast;

  ngOnInit(): void {
    this.toast = new bootstrap.Toast(this.el.nativeElement)
  }

  show() {
    this.toast?.show()
  }
}
