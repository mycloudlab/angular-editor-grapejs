import { Component,Self, Host,Optional,ViewContainerRef,Directive, ElementRef, Renderer2, OnDestroy, OnInit, AfterViewInit, Input } from '@angular/core';

import {ContainerComponent} from './container/container.component';

@Directive({
  selector: '[droppable]',
  host: {
    '(drop)': 'onDrop($event)',
    '(dragover)': 'onDragOver($event)',
  }
})
export class DroppableDirective {

  constructor(
    private _viewContainerRef: ViewContainerRef,
    private el: ElementRef<any>,
    private renderer: Renderer2
  ) { } 

  onDrop(event) {
    event.preventDefault();
    let id = event.dataTransfer.getData("dnd");
    let elementViewRef = window[id];
    delete window[id];

    let container = this._viewContainerRef.element.nativeElement;
    this.renderer.appendChild(container,elementViewRef.element.nativeElement);
    //console.log(hostComponent,cmp)
  }

  onDragOver(event) {
    event.preventDefault();
  }


}








