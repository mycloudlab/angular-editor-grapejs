export class ComponentType {

  name: string;
  angularComponentType: any;
  properties: Array<PropertyType> = [];

  constructor() {
    let property = new PropertyType();
    property.key = "elementRef";
    this.properties.push(property);
  }

}

export class PropertyType {
  key: string;
}

export class BasicInputPropertyType extends PropertyType {

  constructor(public key: string) {
    super();
  }

  value: string;
}

export class AngularInputPropertyType extends PropertyType {

  constructor(public key: string) {
    super();
  }

  value: string;
}
