
export default {
  name: 'painel',
  blockManager: {
    label: 'Heading',
    content: `<custom-element angular-component-type="modal">
              <span data-gjs-editable="false">Not editable</span>
              <span data-gjs-draggable="false">Not draggable</span>
              <span data-gjs-removable="false">Not removable</span>
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
        }),
        toHTML: function () {
          return '<modal></modal>';
        },
      }, {
          isComponent: function (el) {
            if (el.tagName == 'MODAL' || (el.tagName == 'CUSTOM-ELEMENT' && (el.attributes['angular-component-type'] || { value: '' }).value == 'modal')) {
              return { type: 'modal' };
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