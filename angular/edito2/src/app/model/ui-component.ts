import { ViewContainerRef } from "@angular/core"
import { ComponentFactory } from ".";

export class UIComponent {

  type: ComponentFactory;

  view: ViewContainerRef;

  properties: {[key: string]: string} = {};

  children: Array<UIComponent> = [];

  get componentCount() {

    let count = 0;
    this.children.forEach(el => {
      count += el.componentCount;
    })

    count += this.children.length;

    return count;

  }

}

