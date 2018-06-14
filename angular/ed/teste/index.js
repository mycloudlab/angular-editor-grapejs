

var html = `
<input type="text" __ngModel__="teste123">
<mat-menu #appMenu="matMenu">
  <button mat-menu-item>Settings</button>
  <button mat-menu-item>Help</button>
</mat-menu>

<button mat-icon-button _matMenuTriggerFor_="appMenu">
  <mat-icon>more_vert</mat-icon>
</button>
`;

function repeat(s, n){
    var a = [];
    while(a.length < n){
        a.push(s);
    }
    return a.join('');
}

level=0;

var parser = require('htmljs-parser').createParser({
    onText: function(event) {
        console.log(repeat(' ',level),'text: ',event.value);
    },
 
    onPlaceholder: function(event) {
        //  ${<value>]} // escape = true
        // $!{<value>]} // escape = false
        var value = event.value; // String
        var escaped = event.escaped; // boolean
        var withinBody = event.withinBody; // boolean
        var withinAttribute = event.withinAttribute; // boolean
        var withinString = event.withinString; // boolean
        var withinOpenTag = event.withinOpenTag; // boolean
        var pos = event.pos; // Integer
    },
 
    onCDATA: function(event) {
          console.log(repeat(' ',level),'cdata: ',event.value);
    },
 
    onOpenTag: function(event) {
        var tagName = event.tagName; // String
        var attributes = event.attributes; // Array
        var argument = event.argument; // Object
        var pos = event.pos; // Integer

        var attrs = "";

        attributes.forEach(function(element) {

            let val = element.value||"''";
            val = val.substring(1,val.length-1);

            attrs+= element.name  +':"'+ val + '",'
        }, this);
        
        console.log(repeat(' ',level),'open tag: ',tagName, attrs);
        level++;
        
    },
 
    onCloseTag: function(event) {
        level--;
        // close tag
        var tagName = event.tagName; // String
        var pos = event.pos; // Integer
        
    },
 
    onDocumentType: function(event) {
        // Document Type/DTD
        // <!<value>>
        // Example: <!DOCTYPE html>
        var value = event.value; // String
        var pos = event.pos; // Integer
        console.log('document type',event);
    },
 
    onDeclaration: function(event) {
        // Declaration
        // <?<value>?>
        // Example: <?xml version="1.0" encoding="UTF-8" ?>
        var value = event.value; // String
        var pos = event.pos; // Integer
        console.log('onDeclaration',event);
    },
 
    onComment: function(event) {
        // Text within XML comment
        var value = event.value; // String
        var pos = event.pos; // Integer
        console.log('onComment',event);
    },
 
    onScriptlet: function(event) {
        // Text within <% %>
        var value = event.value; // String
        var pos = event.pos; // Integer
         console.log('onScriptlet',event);
    },
 
    onError: function(event) {
        // Error
        var message = event.message; // String
        var code = event.code; // String
        var pos = event.pos; // Integer.
        console.log('error',event);
    }
});

parser.parse(html);


/*
var htmlparser = require("htmlparser2");
var parser = new htmlparser.Parser({
    onopentag: function(name, attribs){

        console.log(name,attribs);
    },
    ontext: function(text){
    },
    onclosetag: function(tagname){
    }
}, {decodeEntities: true});
parser.write(html);
parser.end();
*/

/*
var parse5 = require('parse5');

let document = parse5.parseFragment(html);
console.log(document.childNodes[1].childNodes[1]);
*/

/*
var htmlParser = require('html-parser');

htmlParser.parse(html, {
    openElement: function (name) { 
        console.log('open: %s', name); 
    },
    closeOpenedElement: function (name, token, unary) { console.log('token: %s, unary: %s', token, unary); },
    closeElement: function (name) { console.log('close: %s', name); },
    comment: function (value) { console.log('comment: %s', value); },
    cdata: function (value) { console.log('cdata: %s', value); },
    attribute: function (name, value) { console.log(`attribute: ${name}=${value}`); },
    docType: function (value) { console.log('doctype: %s', value); },
    text: function (value) { console.log('text: %s', value); }
});
*/