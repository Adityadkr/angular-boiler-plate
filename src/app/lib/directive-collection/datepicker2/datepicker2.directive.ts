import { formatDate } from '@angular/common';
import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDatepicker2]'
})
export class Datepicker2Directive {
  htmlElement: any
  dateElement: any;
  dateFormat: string ='dd-MM-yyyy'
  @Input() format: string = 'date'

  constructor(private el: ElementRef, private _renderer: Renderer2) { }

  ngOnInit(): void {
    //this.dateFormat = this.format
    if (this.format != 'date') {
      this.dateFormat = 'dd-MM-yyyy HH:mm'
    }
    this.htmlElement = this.el.nativeElement as HTMLElement
    //this.htmlElement.class = icinput"
    this.dateElement = this._renderer.createElement('input')
    this.dateElement.type = "text";
    this.dateElement.disabled = true



    //this.el.nativeElement.addClass(dateElement, 'icinput')
    this.htmlElement.before(this.dateElement)

    this._renderer.listen(this.htmlElement, 'change', (e) => {
      var date = new Date(this.htmlElement.value)
      var dateTxt = formatDate(date, this.dateFormat, 'en-US')
      this.dateElement.value = dateTxt

    })

  }
  ngAfterViewInit(): void {
    if (this.format != 'date') {
      this.dateFormat = 'dd-MM-yyyy HH:mm'
    }
    this.dateElement.disabled = false
    var date = new Date(this.el.nativeElement.value)
    var dateTxt = formatDate(date, this.dateFormat, 'en-US')
    this.dateElement.value = dateTxt
    this.dateElement.disabled = false
  }


}
