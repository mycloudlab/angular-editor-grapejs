import {Type,PropertyType} from "."

export interface ComponentFactory {
    friendlyName: string;
    elementType: Type;
    properties: Array<PropertyType>;
    render(): string;
    isComponent(data: any): boolean;
}