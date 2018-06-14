import { Component, OnInit,Input } from '@angular/core';
import { ComponentType, UIComponent, FlatNode } from "../model";
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
