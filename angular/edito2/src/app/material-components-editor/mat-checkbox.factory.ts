import { ComponentFactory, Property, TextProperty, CheckboxProperty, RadioProperty } from "../core/component-factory";
import { ComponentPallete } from "../core/component-pallete";
import { MatCheckbox } from "@angular/material";

@ComponentPallete({
    tagName: 'mat-checkbox',
    friendlyName: 'mat-checkbox',
    group: 'material-elements',
    description: 'Checkbox styled on material design'
})
export class MatCheckboxFactory implements ComponentFactory {

    elementType: any = MatCheckbox;

    properties: Array<Property>;

    constructor() {
        this.properties = [
            new RadioProperty('labelPosition', { 'After': 'after', 'Before': 'before' }),
            new CheckboxProperty('disabled', 'disabled'),
        ];
    }

    preRenderHTML(properties: { [key: string]: string; }): string {
        
        let prop = '';
        Object.entries(properties).forEach(data => {
            prop += ` ${data[0]}=${data[1]}`;
        })
        
        return `<mat-checkbox${prop}>`;
    }

    posRenderHTML() {
        return "</mat-checkbox>";
    }
}