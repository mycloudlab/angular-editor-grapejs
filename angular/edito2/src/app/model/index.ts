import { PropertyType, AngularInputPropertyType, BasicInputPropertyType } from './component-type'

export { ComponentType, PropertyType } from "./component-type";
export { FlatNode } from "./flat-node";
export { UIComponent } from "./ui-component";
export {ComponentPallete} from './component-pallete';

const components: Array<any> = [];

export class Comp {
    static get components() {
        return components;
    }
}

interface ComponentRegistryProperties {
    name: string;
    group?: string;
    description?: string;
    classImage?: string;
}


export function ComponentRegistry(config: ComponentRegistryProperties) {
    return function (target) {
        components.push(target);
    }
}

export interface Type {
    new ();
}


export interface ComponentFactory {
    friendlyName: string;
    elementType: Type;
    properties: Array<PropertyType>;
    render(): string;
    isComponent(data: any): boolean;
}

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

}
