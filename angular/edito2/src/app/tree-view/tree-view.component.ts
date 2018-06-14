import { Component, OnInit, ViewContainerRef, Input,Output,EventEmitter } from '@angular/core';

import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';

import { ComponentType, UIComponent, FlatNode } from "../model";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.css']
})
export class TreeViewComponent implements OnInit {

  treeControl: FlatTreeControl<FlatNode>;

  treeFlattener: MatTreeFlattener<UIComponent, FlatNode>;

  dataSource: MatTreeFlatDataSource<UIComponent, FlatNode>;

  @Output() select: EventEmitter<any> = new EventEmitter();

  selected: UIComponent;
  private _selected:FlatNode;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  }

  @Input()
  set components(components: Array<UIComponent>) {
    this.dataSource.data = components;
  }

  transformer = (component: UIComponent, level: number) => {
    let flatNode = new FlatNode();
    flatNode.component = component;
    flatNode.level = level;
    flatNode.expandable = component.children.length != 0;
    return flatNode;
  }

  private _getLevel = (node: FlatNode) => { return node.level; };

  private _isExpandable = (node: FlatNode) => { return node.expandable; };

  private _getChildren = (node: UIComponent): Observable<UIComponent[]> => {
    return observableOf(node.children);
  }

  hasChild(_: number, _nodeData: FlatNode) { 
    return _nodeData.expandable; 
  };

  ngOnInit(): void {
  }

  selectComponent(nodeData:FlatNode){
    this._selected=nodeData;
    this.selected = nodeData.component;
    this.select.emit(this.selected);
  }

  isSelected(node:FlatNode): boolean {
    return this._selected == node;
  }

}
