import { Directive, ElementRef, Renderer, Input, OnInit, HostListener } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[appMaskCustom]'
})
export class MaskCustomDirective implements OnInit {
  private mask: string;
  @Input() appMaskCustom: string;

  constructor(public el: ElementRef) { }

  ngOnInit() {
    this.mask = this.appMaskCustom;
    $(this.el.nativeElement).mask(this.mask);
  }
}
