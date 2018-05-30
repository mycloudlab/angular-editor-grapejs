import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, Renderer2 } from '@angular/core';

import * as grapesjs from 'grapesjs';

import { WelcomeComponent } from './welcome/welcome.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  editor: any;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private render: Renderer2
  ) { }




  ngOnInit(): void {


    this.buildPlugin();


    this.editor = grapesjs.init({
      container: '#gjs',
      components: '<div class="txt-red">Hello world!</div>',
      style: '.txt-red{color: red}',
      plugins: ['angular-editor-plugin']
    });
  }


  buildPlugin() {
    let me = this;





    grapesjs.plugins.add('angular-editor-plugin', (editor, options) => {
      var blockManager = editor.BlockManager;
      var comps = editor.DomComponents;

      var defaultType = comps.getType('default');
      var defaultModel = defaultType.model;
      var defaultView = defaultType.view;

      /*
            editor.TraitManager.addType('title', {
              events: {
                'keyup': 'onChange',  // trigger parent onChange method on keyup
              },
              getInputEl: function () {
                if (!this.inputEl) {
                  this.target.set('title','');
                  var input = document.createElement('input');
                  input.value = this.target.get('title');
                  this.inputEl = input;
                }
                return this.inputEl;
              },
      
              onValueChange: function () {
                console.log(this);
                this.target.set('title', this.model.get('value'));
              }
            });
      
      */

      blockManager.add('painel', {
        label: 'Heading',
        content: `
      <custom-element angular-component-type="modal">
      </custom-element>`,
        category: 'custom',
        attributes: {
          title: 'Insert h1 block',
          class: 'fa fa-youtube-play',
        }
      });



      comps.addType('painel', {
        model: defaultModel.extend({

          toHTML: function () {
            return '<div> 1 </div>';
          },

          init() {
            this.listenTo(this, 'change:title', this.changeTitle);
          },

          changeTitle() {
            this.view.angular.instance.title = this.attributes.title;
          },


          defaults: Object.assign({}, defaultModel.prototype.defaults, {
            draggable: 'body *',

            droppable: false,
            traits: [{
              type: 'text',
              label: 'Title',
              name: 'title',
              changeProp: 1,
            }],
          })
        }, {
            isComponent: function (el) {
              if (el.tagName == 'MODAL' || (el.tagName == 'CUSTOM-ELEMENT' && (el.attributes['angular-component-type'] || { value: '' }).value == 'modal')) {
                return { type: 'painel' };
              }
            },
          }),

        // Define the View
        view: defaultType.view.extend({
          render: function () {
            defaultType.view.prototype.render.apply(this, arguments);

            console.log(this);

            const componentFactory = me.componentFactoryResolver.resolveComponentFactory(WelcomeComponent);
            const componentRef = me.viewContainerRef.createComponent(componentFactory);
            me.render.appendChild(this.el, componentRef.location.nativeElement)

            this.angular = componentRef;

            return this;
          }
        })
      });

    });


  }




}
