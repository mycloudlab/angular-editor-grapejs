import { ViewContainerRef } from "@angular/core"
import { ComponentType } from ".";

export class UIComponent {

  type: ComponentType;

  view: ViewContainerRef;

  properties: Array<Map<string, string>> = [];

  children: Array<UIComponent> = [];

  get componentCount(){

    let count = 0;
    this.children.forEach(el=>{
      count += el.componentCount;
    })

    count+=this.children.length;

    return count;
    
  }

}

