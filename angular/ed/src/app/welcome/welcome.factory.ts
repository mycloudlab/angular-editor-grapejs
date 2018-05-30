import { WelcomeComponent } from './welcome.component';
import { ComponentFactory } from "../componentfactory.interface"

export class WelcomeFactory implements ComponentFactory {
  
  componentTag: string = 'app-welcome';

  name: string = 'welcome';
  label: string = 'Welcome';
  category: string = 'test';
  title: string = 'welcome component test';
  classIcon: string = 'fa fa-youtube-play';
  component: any = WelcomeComponent;

  model: any = {
    draggable: 'body *',
    droppable: false,
    traits: [
      {
        type: 'text', 
        label: 'Title',
        name: 'title',
        changeProp: 1,
        change: (model, cmp) => {
          cmp.title = model.title;
        }
      }
    ]
  }

  toHTML(model) {
    let attr = model.attributes;
    return `<app-welcome title="${attr.title}"></app-welcome>`
  }
}
