import * as grapesjs from 'grapesjs';

import painel from './painel.cmp';

// componentes
let componentes = [painel];


export default grapesjs.plugins.add('angular-editor-plugin', (editor, options) => {
    var blockManager = editor.BlockManager;
    var comps = editor.DomComponents;

    var defaultType = comps.getType('default');
    var defaultModel = defaultType.model;
    var defaultView = defaultType.view;

    componentes.forEach(component => {
        blockManager.add(component.name, component.blockManager);
        comps.addType(component.name, component.builder(defaultType, defaultModel, defaultView));
    });

});