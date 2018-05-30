
const NAME = 'painel';
export default {
  name: NAME,
  blockManager: {
    label: 'Heading',
    content: `
      <custom-element angular-component-type="modal">
        <mat-checkbox class="mat-checkbox mat-accent">
        <label class="mat-checkbox-layout" for="mat-checkbox-2-input">
        <div class="mat-checkbox-inner-container">
        <input class="mat-checkbox-input cdk-visually-hidden" type="checkbox" id="mat-checkbox-2-input" tabindex="0" 
        aria-checked="false">
        <div class="mat-checkbox-ripple mat-ripple" matripple="">
        </div>
        <div class="mat-checkbox-frame"></div>
        <div class="mat-checkbox-background">
        <svg xml:space="preserve" class="mat-checkbox-checkmark" focusable="false" version="1.1" viewBox="0 0 24 24">
        <path class="mat-checkbox-checkmark-path" d="M4.1,12.7 9,17.6 20.3,6.3" fill="none" stroke="white"></path>
        </svg>
        <div class="mat-checkbox-mixedmark"></div></div></div>
        <span class="mat-checkbox-label">
        <span style="display:none">&nbsp;</span>Check me!</span></label>
        </mat-checkbox> 
      </custom-element>`,
    category: 'custom',
    attributes: {
      title: 'Insert h1 block',
      class: 'fa fa-youtube-play',
    }
  },

  builder: (defaultType, defaultModel, defaultView) => {

    var inputTypes = [
      { value: 'text', name: 'Text' },
      { value: 'email', name: 'Email' },
      { value: 'password', name: 'Password' },
      { value: 'number', name: 'Number' },
    ];


    return {
      model: defaultModel.extend({
        toHTML: function () {
          return '<div> 1 </div>';
        },
        defaults: Object.assign({}, defaultModel.prototype.defaults, {
          draggable: 'body *',

          droppable: false,
          traits: ['name', 'placeholder', {
            type: 'select',
            label: 'Type',
            name: 'type',
            options: inputTypes,
          }, {
              type: 'checkbox',
              label: 'Required',
              name: 'required',
            }],
        })
      }, {
          isComponent: function (el) {
            if (el.tagName == 'MODAL' || (el.tagName == 'CUSTOM-ELEMENT' && (el.attributes['angular-component-type'] || { value: '' }).value == 'modal')) {
              return { type: NAME };
            }
          },
        }),

      // Define the View
      view: defaultType.view.extend({
        render: function () {
          defaultType.view.prototype.render.apply(this, arguments);
          return this;
        }
      })
    };
  }
};