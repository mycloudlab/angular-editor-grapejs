export class ComponentType {

  name: string;
  angularComponentType: any;
  properties: Array<PropertyType> = [];

  constructor(){
    let property = new PropertyType();
    property.key="elementRef";
    this.properties.push(property);
  }

}

export class PropertyType {

  key: string;

}