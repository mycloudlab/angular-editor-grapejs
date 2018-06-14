import { PropertyType, AngularInputPropertyType, BasicInputPropertyType } from './component-type'

export { ComponentType, PropertyType } from "./component-type";
export { FlatNode } from "./flat-node";
export { UIComponent } from "./ui-component";
export { ComponentPallete } from './component-pallete';
export { ComponentFactory } from './component-factory'
export { ComponentRegistry,ComponentRegistryProperties } from './component-registry';

const components: Array<any> = [];

export class Comp {
    static get components() {
        return components;
    }
}


export interface Type {
    new ();
}


/*
import { MatButton } from '@angular/material'
import { Form } from '@angular/forms';

@ComponentRegistry({
    name: 'button',
    group: 'input',
    description: 'oadlfaldfakdsnf lasdknf açlsdknf aç'
})
export class MatButtonComponentFactory implements ComponentFactory {

    friendlyName: string = 'mat-button';

    elementType: any = MatButton;

    properties: PropertyType[] = [
        new BasicInputPropertyType('aria-label')
    ];

    isComponent(data: any): boolean {
        throw new Error('Method not implemented.');
    }

    render(): string {
        return ""
    }

}*/
