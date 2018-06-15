import { UIComponent } from "./ui-component"

import { Registry } from './registry';

import * as parserBuilder from "htmljs-parser";



export class ComponentParser {

    private parser;

    parse(html: string): Array<UIComponent> {
        let collector = new Array<UIComponent>();

        let parser = this.buildParser(collector);

        html = this.workaroundHandleAngularEvents(html);
        parser.parse(html);

        return collector;
    }

    private workaroundHandleAngularEvents(html: string) {
        // this parser does not processing events (click) changed £click£ for parser
        let found = html.match(/ \(([a-z]|[0-9]|[A-Z]|[-_])+\)/gm);

        found = found || [];

        let ret = html;
        found.forEach(text => {
            let newProperty = text.replace('(', '£').replace(')', '£');
            ret = ret.split(text).join(newProperty);
        })
        return ret;
    }

    private buildParser(collector: Array<UIComponent>) {
        let stack = new Array<UIComponent>();

        let parser = parserBuilder.createParser({
            onText: function (event) {
                // handle text
                event.value;
            },
            onPlaceholder: function (event) { },
            onCDATA: function (event) { },

            onOpenTag: function (event) {
                let tagName = event.tagName;
                let attributes = event.attributes;
                let component = new UIComponent();
                component.type = Registry.lookupComponent(tagName);
 

                // fill elements
                attributes.forEach((element) => {
                    let name = element.name + '';

                    // workaround for handle in this parser for handle angular events 
                    // this parser does not support (click)="search()" parenthesis in 
                    // attribute name
                    if (name.substring(0, 1) == '£' && name.substring(name.length, name.length - 1) == '£') {
                        name = "(" + name.substring(1, name.length - 1) + ")";
                    }

                    let value;
                    if (element.value)
                        value = element.value.substring(1, element.value.length - 1);


                    component.properties[name] = value;
                });

                // add component at stack
                stack.unshift(component);
            },

            onCloseTag: function (event) {
                let component = stack.shift();
                if (stack.length == 0) {
                    collector.push(component);
                } else {
                    stack[0].children.push(component);
                }
            },

            onDocumentType: function (event) { },
            onDeclaration: function (event) { },

            onComment: function (event) {
                // Text within XML comment
                var value = event.value; // String
                var pos = event.pos; // Integer
                console.log('onComment', event);
            },

            onScriptlet: function (event) { },

            onError: function (event) {
                console.log('error', event);
            }
        });
        return parser;
    }

}