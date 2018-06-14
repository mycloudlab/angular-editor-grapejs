import { Component, NgZone, OnInit, ViewContainerRef, ChangeDetectorRef, ComponentFactoryResolver, Renderer2 } from '@angular/core';

import * as grapesjs from 'grapesjs';

import { ComponentFactory } from "./componentfactory.interface"
import { WelcomeFactory } from './welcome/welcome.factory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  editor: any;

  constructor(
    private zone: NgZone,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private render: Renderer2
  ) { }

  ngOnInit(): void {
    /*
    this.buildPlugin();  

    this.editor = grapesjs.init({
      container: '#gjs',
      components: '<div class="txt-red">Hello worls</div><app-welcome title="tese"></app-welcome>',
      style: '.txt-red{color: red}',
      plugins: ['angular-editor-plugin'],
    });
    */
  }


  buildPlugin() {
    let angularEnv = this;


    let components: ComponentFactory[] = [new WelcomeFactory()];

    grapesjs.plugins.add('angular-editor-plugin', (editor, options) => {

      editor.BlockManager.add('row', {
        label: 'row',
        content: `<div  class="row-cell"> row</div>`,
        category: 'cust',
        attributes: {
          title: 'row'

        }
      });



      let defaultModel = editor.DomComponents.getType('default').model;
      let defaultView = editor.DomComponents.getType('default').view;



      editor.DomComponents.addType('row', {
        model: defaultModel.extend({
          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            content: `<div> nova</div>`,
                draggable: 'body *',
    droppable: false,
          }),
        }, {
            // verifica se é um componente usando função customizada ou usando o componentTag.
            isComponent: function (el) {

              // verifica com o componentTag
              if (el.tagName.toUpperCase() == 'DIV') {
                return { type: 'row' };
              }

            },
          }),

        // render view component
        view: defaultView.extend({})

      });





      components.forEach((cf, index) => {

        // adiciona ao blockmanager
        editor.BlockManager.add(cf.name, {
          label: cf.label,
          content: `<custom-element  style="display: inline-block" angular-component-type="${cf.name}"></custom-element>`,
          category: cf.category,
          attributes: {
            title: cf.title,
            class: cf.classIcon,
          }
        });

        let defaultModel = editor.DomComponents.getType('default').model;
        let defaultView = editor.DomComponents.getType('default').view;



        editor.DomComponents.addType(cf.name, {
          model: defaultModel.extend({
            
            // ao destruir o componente na tela remove do contexto do angular também.
            destroy() {
              if (this.angular)
                this.angular.destroy();

              defaultModel.prototype.destroy.apply(this, arguments);
            },

            toHTML: function () {
              return cf.toHTML(this);
            },

            // init usado para fazer listen das propriedades do componente
            init() {
              (function (self) {

                if (cf.model.traits) {
                  cf.model.traits.forEach((trait) => {
                    if (trait.change) {
                      self.listenTo(self, 'change:' + trait.name, () => {
                        angularEnv.zone.run(() => {
                          trait.change(self.attributes, self.angular.instance);
                        });
                      });
                    }
                  })
                }

              })(this);
            },
            defaults: Object.assign({}, defaultModel.prototype.defaults, cf.model),
          }, {
              // verifica se é um componente usando função customizada ou usando o componentTag.
              isComponent: function (el) {

                // verifica com o componente customizado
                if (cf.isComponent) {
                  if (cf.isComponent(el)) {
                    return { type: cf.name };
                  }
                }

                // verifica com o componentTag
                if (el.tagName.toUpperCase() == cf.componentTag.toUpperCase() || (el.tagName == 'CUSTOM-ELEMENT' && (el.attributes['angular-component-type'] || { value: '' }).value == cf.name)) {
                  let cmp = { type: cf.name };


                  //TODO corrigir para usar trait
                  for (let x = 0; x <= el.attributes.length - 1; x++) {
                    cmp[el.attributes[x].name] = el.attributes[x].value;
                  }

                  return cmp;
                }

              },
            }),

          // render view component
          view: defaultView.extend({
            render: function () {
              let self = this;

              if (self.angular) {
                console.log('destroy');
                self.angular.destroy();
              }
/*
              angularEnv.zone.run(() => {
                let componentFactory = angularEnv.componentFactoryResolver.resolveComponentFactory(cf.component);
                let componentRef = angularEnv.viewContainerRef.createComponent(componentFactory);
                //angularEnv.render.appendChild(this.el, componentRef.location.nativeElement);
                self.el.appendChild(componentRef.location.nativeElement);
                this.model.angular = componentRef;
              });
              */
              this.model.set('content', "<div data-gjs-selectable='true'>olá</div>")


    this.renderAttributes();
    this.updateContent();
    //this.getChildrenContainer().innerHTML = this.model.angular.location.nativeElement.innerHTML;


    this.renderChildren();
    this.updateScript();
    this.onRender();
/*
              cf.model.traits.forEach((trait) => {
                if (trait.change) {
                  angularEnv.zone.run(() => {
                    trait.change(self.model.attributes, this.model.angular.instance);
                  });
                }
              })
*/
              return this;
            }
          })
        });
      })
    })
  }
}
