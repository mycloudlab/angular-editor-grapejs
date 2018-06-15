export enum PropertyType {
    TEXT,
    TEXTAREA,
    COMBOBOX,
    CHECKBOX,
    RADIO
}

/**
 * a component has many properties that have different 
 * ways of being filled, this component serves as the root 
 * for all sorts of fill shapes that may arise.
 */
export interface Property {
    type: PropertyType;
    key: string;
}


export class TextProperty implements Property {
    type: PropertyType = PropertyType.TEXT;
    constructor(public key: string) { };
}

export class TextareaProperty extends TextProperty {
    type: PropertyType = PropertyType.TEXTAREA
}

export class ComboProperty implements Property {
    type: PropertyType = PropertyType.COMBOBOX;
    constructor(public key: string, public values: string[]) { };
}

export class CheckboxProperty implements Property {
    type: PropertyType = PropertyType.CHECKBOX;
    constructor(public key: string, public checkedValue: string) { };
}

export class RadioProperty implements Property {
    type: PropertyType = PropertyType.CHECKBOX;
    constructor(public key: string, public options: { [key: string]: string }) { };
}

/**
 * this component is responsible for aggregating everything 
 * that represents a component and what is needed to identify 
 * and construct it 
 */
export interface ComponentFactory {

    elementType: any;

    properties: Array<Property>;

    preRenderHTML(properties: { [key: string]: string }): string;
    
    posRenderHTML(): string;
}