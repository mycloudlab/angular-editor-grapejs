import { TestBed, async } from '@angular/core/testing';
import { ComponentParser } from './component-parser';
import { UIComponent, ComponentFactory, Type, PropertyType } from "../model"

class DummyComponentFactory implements ComponentFactory {

  elementType: Type;
  properties: PropertyType[];

  constructor(public friendlyName: string) { }

  render(): string {
    throw new Error('Method not implemented.');
  }
  isComponent(data: any): boolean {
    throw new Error('Method not implemented.');
  }

}


describe('ComponentParser', () => {

  let parser = new ComponentParser();

  describe("should be parse html with angular components", () => {
    // make a dummy component pallete
    let componentPallete = {
      lookupComponent: function (tag) {
        return new DummyComponentFactory(tag);
      }
    };


    it('parse based tag components', async(() => {
      let html = `<button><mat-icon></mat-icon></button>`;

      let object: Array<UIComponent> = parser.parse(html, componentPallete);

      expect(object.length).toEqual(1);
      expect(object[0].children.length).toEqual(1);
    }))

    it('parse basic properties', async(() => {
      let html = `<button clip disabled="disabled"><mat-icon color="red"></mat-icon></button>`;

      let object: Array<UIComponent> = parser.parse(html, componentPallete);
      expect(object[0].properties['clip']).toEqual(undefined);
      expect(object[0].properties['disabled']).toEqual("disabled");
      expect(object[0].children[0].properties['color']).toEqual("red");
      
    }))

    it('parse angular component preserving elementRef identification',async(() => {
      let html = `<form #heroForm="ngForm"></form>`;

      let object: Array<UIComponent> = parser.parse(html, componentPallete);
      
      expect(Object.keys(object[0].properties)).toEqual(["#heroForm"]);
      expect(object[0].properties['#heroForm']).toEqual("ngForm");
    }))

    it('parse angular directive preserving capital letters ',async(() => {
      let html = `<input ngModalFrameLoad >`;

      let object: Array<UIComponent> = parser.parse(html, componentPallete);
      
      expect(Object.keys(object[0].properties)).toEqual(["ngModalFrameLoad"]);
    }))
 

    it('parse angular [(ngModel)]',async(() => {
      let html = `<input [(ngModel)]="client.name" >`;

      let object: Array<UIComponent> = parser.parse(html, componentPallete);

      expect(object[0].properties["[(ngModel)]"]).toEqual("client.name");
    }))

     it('parse angular events',async(() => {
      let html = `<input (click)="search()" >`;

      let object: Array<UIComponent> = parser.parse(html, componentPallete);

      expect(object[0].properties["(click)"]).toEqual("search()");
    }))
 
 
 
  });

});
