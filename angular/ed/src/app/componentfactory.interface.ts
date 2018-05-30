

export interface ComponentFactory {
  
  componentTag:string;  
  name: string;
  label: string;
  category: string;
  title: string;
  classIcon: string;
  component: any;
  model: any;

  toHTML(model:any);
  isComponent?(el);
}
