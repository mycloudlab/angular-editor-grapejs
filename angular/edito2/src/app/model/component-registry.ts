export { ComponentPallete,Component } from './component-pallete';

export interface ComponentRegistryProperties {
    name: string;
    group: string;
    description?: string;
    classImage?: string;
}


export function ComponentRegistry(config: ComponentRegistryProperties) {
    return function (target) {
        ComponentPallete.registry(config,target);
    }
}
