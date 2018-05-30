import * as grapesjs from 'grapesjs';

//componentes angulares
import './components/index';

let body = document.querySelector('body');
let div = document.createElement("div");
div.id = 'gjs';
body.appendChild(div);

var editor = grapesjs.init({
    container : '#gjs',
    components: '<div class="txt-red">Hello world!</div>',
    style: '.txt-red{color: red}',
    plugins: ['angular-editor-plugin']
});