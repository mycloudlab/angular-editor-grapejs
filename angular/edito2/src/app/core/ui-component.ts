import { ViewContainerRef } from "@angular/core"
import { ComponentRegistryMetaData } from "./registry";

export class UIComponent {

  type: ComponentRegistryMetaData;

  view: ViewContainerRef;

  properties: {[key: string]: string} = {};

  children: Array<UIComponent> = [];

  get propertyKeys(){
    return Object.keys(this.properties);
  }

  get componentCount() {

    let count = 0;
    this.children.forEach(el => {
      count += el.componentCount;
    })

    count += this.children.length;

    return count;

  }

}

