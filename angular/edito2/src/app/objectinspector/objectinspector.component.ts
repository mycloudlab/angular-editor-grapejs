import { Component, OnInit,Input } from '@angular/core';
import { ComponentType, FlatNode } from "../model";
import {UIComponent} from '../core/ui-component'

@Component({
  selector: 'app-objectinspector',
  templateUrl: './objectinspector.component.html',
  styleUrls: ['./objectinspector.component.css']
})
export class ObjectinspectorComponent implements OnInit {

  @Input()
  component: UIComponent;

  constructor() { }

  ngOnInit() {
  }

}
