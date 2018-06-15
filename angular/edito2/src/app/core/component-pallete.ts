import { Registry } from './registry';

/**
 * represents this metadata for a componentPallete
 */
export interface ComponentPalleteMetaData {
  tagName: string;
  friendlyName: string;
  group: string;
  description?: string;
  classImage?: string;
}

/**
 * Decorator of ComponentFactory usaged for inform metadata of component
 * @param config 
 */
export function ComponentPallete(config: ComponentPalleteMetaData) {
  return function (factory) {
    console.log('p');
    Registry.register({ ...config, factory });
  }
}
