import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material.module"
import { LayoutModule } from '@angular/cdk/layout';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { ObjectinspectorComponent } from './objectinspector/objectinspector.component';
import { ComponentpalleteComponent } from './componentpallete/componentpallete.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeViewComponent,
    ObjectinspectorComponent,
    ComponentpalleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TreeViewComponent]
})
export class AppModule { }
