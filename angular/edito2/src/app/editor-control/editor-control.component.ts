import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-editor-control',
  templateUrl: './editor-control.component.html',
  styleUrls: ['./editor-control.component.css']
})
export class EditorControlComponent implements OnInit {

  devices: Array<Device> = [];
  _deviceSelected: Device;
  width: string;
  height: string;
  zoom: number = 100;

  @Input('editor')
  editor: HTMLElement;

  editorWidth: number;

  constructor() {
    this.devices.push(new Device("Phone", '320px', '480px'));
    this.devices.push(new Device("Tablet", '768px', '1024px'));
    this.devices.push(new Device("Laptop", '1280px', '800px'));
    this.devices.push(new Device("Desktop", '1920px', '1080px'));
  }

  ngOnInit() {
    let viewWindow: any = window;
    this.editorWidth = parseInt(viewWindow.document.defaultView.getComputedStyle(this.editor).width.replace('px', '')) - 10;

    this.deviceSelected = this.devices[2]; 
  }


  set deviceSelected(device: Device) {
    this.width = device.width;
    this.height = device.height;
    this._deviceSelected = device;
    this.adjustZoom();

  }

  private adjustZoom() {
    let viewWidth: number = parseInt(this.width.replace('px', ''));
    let calculedZoom: number = this.editorWidth / viewWidth;
    if (calculedZoom > 1) {
      this.zoom = 100;
    } else {
      this.zoom = parseInt((calculedZoom * 100).toString());
    }

  }

  rotate() {
    let tmp = this.width;
    this.width = this.height;
    this.height = tmp;

    this.adjustZoom();
  }

  get deviceSelected() {
    return this._deviceSelected;
  }

}

class Device {
  constructor(public name: string, public width: string, public height: string) { }
}
