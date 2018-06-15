import { Component, NgZone, OnInit, ViewContainerRef, ViewChild, ElementRef, ChangeDetectorRef, ComponentFactoryResolver, Renderer2, ComponentRef } from '@angular/core';

import { TreeViewComponent } from "./tree-view/tree-view.component";

import { ComponentType, FlatNode, PropertyType } from "./model";

import { UIComponent } from "./core/ui-component";

import { ComponentFactory } from './core/component-factory';
import {MatCheckboxFactory} from './material-components-editor';
import { Registry } from './core/registry';
import { ComponentPallete } from './core/component-pallete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@ComponentPallete({tagName:"apadf",group:"df",friendlyName:"dsf"})
export class AppComponent implements OnInit {

  components: Array<UIComponent> = [];

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {

    console.log(Registry.components);
    
    class DummyComponentFactory implements ComponentFactory {

      elementType: any;
      properties;
      preRenderHTML(properties: { [key: string]: string; }): string {
        throw new Error("Method not implemented.");
      }
      posRenderHTML(): string {
        throw new Error("Method not implemented.");
      }
    }

    let form = new UIComponent();
    form.type = { tagName: 'form', friendlyName: 'form', group: 'default', factory: new DummyComponentFactory() };
    this.components.push(form)

    let ff = new UIComponent();
    ff.type = { tagName: 'form-field', friendlyName: 'form-field', group: 'default', factory: new DummyComponentFactory() };
    form.children.push(ff);

    ff.properties['placeHolder'] = null;
    ff.properties['required'] = null;

    let ff1 = new UIComponent();
    ff1.type = { tagName: 'form-field', friendlyName: 'form-field', group: 'default', factory: new DummyComponentFactory() };
    form.children.push(ff1);

    ff = new UIComponent();
    ff.type = { tagName: 'input', friendlyName: 'input', group: 'default', factory: new DummyComponentFactory() };
    ff1.children.push(ff);

    ff = new UIComponent();
    ff.type = { tagName: 'error-message', friendlyName: 'error-message', group: 'default', factory: new DummyComponentFactory() };
    ff1.children.push(ff);
  }


}
