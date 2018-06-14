import { Component, NgZone, OnInit, ViewContainerRef, ViewChild, ElementRef, ChangeDetectorRef, ComponentFactoryResolver, Renderer2, ComponentRef } from '@angular/core';

import { TreeViewComponent } from "./tree-view/tree-view.component";

import { Comp, Type, ComponentFactory, ComponentType, UIComponent, FlatNode, PropertyType } from "./model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  components: Array<UIComponent> = [];

  devices: Array<Device> = [];
  _deviceSelected: Device;
  width: string;
  height: string;
  zoom: number = 100;

  @ViewChild('editorContainer') editor: ElementRef;
  editorWidth: number;

  rotate() {
    let tmp = this.width;
    this.width = this.height;
    this.height = tmp;

    this.adjustZoom();
  }

  constructor(private renderer: Renderer2) {
    this.devices.push(new Device("Phone", '320px', '480px'));
    this.devices.push(new Device("Tablet", '768px', '1024px'));
    this.devices.push(new Device("Laptop", '1280px', '800px'));
    this.devices.push(new Device("Desktop", '1920px', '1080px'));



  }

  ngOnInit(): void {



    class DummyComponentFactory implements ComponentFactory {

      friendlyName: string;
      elementType: Type;
      properties: PropertyType[] = [];

      constructor() { }

      render(): string {
        throw new Error('Method not implemented.');
      }
      isComponent(data: any): boolean {
        throw new Error('Method not implemented.');
      }

    }
    console.log(Comp.components)
    let viewWindow: any = window;
    this.editorWidth = parseInt(viewWindow.document.defaultView.getComputedStyle(this.editor.nativeElement).width.replace('px', '')) - 10;

    this.deviceSelected = this.devices[2];

    let form = new UIComponent();
    form.type = new DummyComponentFactory();
    form.type.friendlyName = "form";
    this.components.push(form)

    let ff = new UIComponent();
    ff.type = new DummyComponentFactory();
    ff.type.friendlyName = "form-field";
    form.children.push(ff);
    let pt = new PropertyType();
    pt.key = "placeHolder"
    ff.type.properties.push(pt)
    pt = new PropertyType();
    pt.key = "required"
    ff.type.properties.push(pt)

    let ff1 = new UIComponent();
    ff1.type = new DummyComponentFactory();
    ff1.type.friendlyName = "form-field2";
    form.children.push(ff1);

    ff = new UIComponent();
    ff.type = new DummyComponentFactory();
    ff.type.friendlyName = "input";
    ff1.children.push(ff);

    ff = new UIComponent();
    ff.type = new DummyComponentFactory();
    ff.type.friendlyName = "error-message";
    ff1.children.push(ff);

  }

  set deviceSelected(device: Device) {
    this.width = device.width;
    this.height = device.height;
    this._deviceSelected = device;
    this.adjustZoom();

  }

  private adjustZoom() {
    let viewWidth: number = parseInt(this.width.replace('px', ''));
    let calculedZoom: number = this.editorWidth / viewWidth;
    if (calculedZoom > 1) {
      this.zoom = 100;
    } else {
      this.zoom = parseInt((calculedZoom * 100).toString());
    }

  }

  get deviceSelected() {
    return this._deviceSelected;
  }

}


class Device {
  constructor(public name: string, public width: string, public height: string) { }
}