import { ComponentFactory,ComponentRegistryProperties } from '.';

export interface Component {
    name: string;
    group: string;
    description?: string;
    classImage?: string;
    componentFactory: ComponentFactory;
}


export class ComponentPallete {

    private static components: Component[] = [];
    private static _groups: {[key: string]: Component[]} = {};

    static registry(config:ComponentRegistryProperties,componentFactory:ComponentFactory){
        let cmp: Component = {
            ...config,
            componentFactory
        };

        ComponentPallete.components.push(cmp);

        if (ComponentPallete._groups[config.group] == undefined)
            ComponentPallete._groups[config.group] = [];
        
        ComponentPallete._groups[config.group].push(cmp);
        
    }

    lookupComponent(tagName: String): ComponentFactory {
        return null
    }

    static get groups(){
        return ComponentPallete._groups;
    }

    static get groupList(){
        return Object.keys(ComponentPallete._groups).sort();
    }

}