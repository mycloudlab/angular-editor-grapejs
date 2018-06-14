import { ViewContainerRef, Directive, ElementRef, Renderer2, OnDestroy, OnInit, AfterViewInit, Input } from '@angular/core';


@Directive({
  selector: '[draggable]',
  host: {
    '(dragstart)': 'onDragStart($event)',
    '(dragend)': 'onDragEnd($event)',
    '(drag)': 'onDrag($event)'
  }
})
export class DraggableDirective implements OnDestroy, OnInit, AfterViewInit {
  private Δx: number = 0;
  private Δy: number = 0;

  private host: any = null;
  private id: string;
  @Input('host')
  set draggable(val: any) {
    this.host = val;
  }
  private mustBePosition: Array<string> = ['absolute', 'fixed', 'relative'];
  constructor(
    private _viewContainerRef: ViewContainerRef,
    private el: ElementRef<any>, private renderer: Renderer2
  ) {
  }

  ngOnInit(): void {

    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'true');
  }
  ngAfterViewInit() {
    try {
      let position = window.getComputedStyle(this.el.nativeElement).position;
      if (this.mustBePosition.indexOf(position) === -1) {
        console.warn(this.el.nativeElement, 'Must be having position attribute set to ' + this.mustBePosition.join('|'));
      }
    } catch (ex) {
      console.error(ex);
    }
  }
  ngOnDestroy(): void {
    this.renderer.setAttribute(this.el.nativeElement, 'draggable', 'false');
  }

  onDragStart(event) {
    this.id = `dnd_${Math.random()}`;
    event.dataTransfer.setData('dnd', this.id);
  }

  onDrag(event: DragEvent) {
    let cmp = this._viewContainerRef;
    window[this.id] = cmp;
    event.dataTransfer.setData('dnd', this.id);

  }

  onDragEnd(event: DragEvent) {
    event.dataTransfer.setData('dnd', this.id);
  }



}




