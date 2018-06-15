import { async } from '@angular/core/testing';
import { ComponentParser } from './component-parser';

import { ComponentRegistryMetaData, Registry } from './registry';

import { UIComponent } from "./ui-component";
import { ComponentFactory, Property } from "./component-factory";

class DummyComponentFactory implements ComponentFactory {

  elementType: any;

  properties: Property[];

  preRenderHTML(properties: { [key: string]: string; }): string {
    throw new Error("Method not implemented.");
  }

  posRenderHTML(): string {
    throw new Error("Method not implemented.");
  }
}


describe('ComponentParser', () => {

  let parser = new ComponentParser();

  describe("should be parse html with angular components", () => {

    // overwrite default implementation lookup of custom lookup for tests
    Registry.lookupComponent = function (tag): ComponentRegistryMetaData {
      return { friendlyName: tag, tagName: tag, group: 'default', factory: new DummyComponentFactory() }
    };

    it('parse based tag components', async(() => {
      let html = `<button><mat-icon></mat-icon></button>`;

      let object: Array<UIComponent> = parser.parse(html);

      expect(object.length).toEqual(1);
      expect(object[0].children.length).toEqual(1);
    }))

    it('parse basic properties', async(() => {
      let html = `<button clip disabled="disabled"><mat-icon color="red"></mat-icon></button>`;

      let object: Array<UIComponent> = parser.parse(html);
      expect(object[0].properties['clip']).toEqual(undefined);
      expect(object[0].properties['disabled']).toEqual("disabled");
      expect(object[0].children[0].properties['color']).toEqual("red");

    }))

    it('parse angular component preserving elementRef identification', async(() => {
      let html = `<form #heroForm="ngForm"></form>`;

      let object: Array<UIComponent> = parser.parse(html);

      expect(Object.keys(object[0].properties)).toEqual(["#heroForm"]);
      expect(object[0].properties['#heroForm']).toEqual("ngForm");
    }))

    it('parse angular directive preserving capital letters ', async(() => {
      let html = `<input ngModalFrameLoad >`;

      let object: Array<UIComponent> = parser.parse(html);

      expect(Object.keys(object[0].properties)).toEqual(["ngModalFrameLoad"]);
    }))


    it('parse angular [(ngModel)]', async(() => {
      let html = `<input [(ngModel)]="client.name" >`;

      let object: Array<UIComponent> = parser.parse(html);

      expect(object[0].properties["[(ngModel)]"]).toEqual("client.name");
    }))

    it('parse angular events', async(() => {
      let html = `<input (click)="search()" >`;

      let object: Array<UIComponent> = parser.parse(html);

      expect(object[0].properties["(click)"]).toEqual("search()");
    }))



  });

});
