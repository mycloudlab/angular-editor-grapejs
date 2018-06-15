import { ComponentPalleteMetaData } from './component-pallete';
import { ComponentFactory } from './component-factory';

/**
 * Data of component registry
 */
export interface ComponentRegistryMetaData extends ComponentPalleteMetaData {

    tagName: string;
    friendlyName: string;
    group: string;
    description?: string;
    classImage?: string;
    factory: ComponentFactory;

}

/**
 * class usaged for database of components
 */
export abstract class Registry {

    private static _components: ComponentRegistryMetaData[] = [];
    private static _groups: { [key: string]: ComponentRegistryMetaData[] } = {};


    static register(component: ComponentRegistryMetaData) {
        Registry._components.push(component);

        if (Registry._groups[component.group] == undefined)
            Registry._groups[component.group] = [];

        Registry._groups[component.group].push(component);
    }

    static get components() {
        return Registry._components;
    }

    static lookupComponent(tagName: any): ComponentRegistryMetaData {
        let found = Registry._components.filter(cmp => cmp.tagName === tagName);
        if (found.length != 0)
            return found[0];
    }

    static get groups() {
        return Registry._groups;
    }

    static get groupList() {
        return Object.keys(Registry._groups).sort();
    }

}