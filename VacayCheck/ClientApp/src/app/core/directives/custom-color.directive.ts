import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomColor]'
})
export class CustomColorDirective {
  @Input('appCustomColor')color = 'cyan';

  constructor(private el: ElementRef) {
    //el.nativeElement.style.backgroundColor = this.color;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.color;
  }

  @HostListener('mouseleave') onMouseLeava() {
    this.el.nativeElement.style.backgroundColor = 'gray';
  }
}
