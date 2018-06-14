import { TestBed, async } from '@angular/core/testing';

import { ComponentPallete, Component } from './component-pallete';

import { ComponentFactory, Type, PropertyType } from "../model"

class DummyComponentFactory implements ComponentFactory {
  
  friendlyName: string;
  elementType: Type;
  properties: PropertyType[];

  constructor() { }

  render(): string {
    throw new Error('Method not implemented.');
  }
  isComponent(data: any): boolean {
    throw new Error('Method not implemented.');
  }

}




describe('ComponentPallete', () => {

  it('should be get groups and groupList when registry component factory', async(() => {

    ComponentPallete.registry({
      name: 'div',
      group: 'html'
    }, new DummyComponentFactory());

    ComponentPallete.registry({
      name: 'form',
      group: 'forms'
    }, new DummyComponentFactory());
        
    expect(ComponentPallete.groups.html.length).toBe(1);
    expect(ComponentPallete.groups.forms.length).toBe(1);
    expect(ComponentPallete.groupList[0]).toBe('forms');
    expect(ComponentPallete.groupList[1]).toBe('html');

  }))

});