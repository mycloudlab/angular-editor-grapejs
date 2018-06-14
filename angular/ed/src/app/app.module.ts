import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule,Routes } from '@angular/router';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule } from '@angular/material';
import { WelcomeComponent } from './welcome/welcome.component';
import { ContainerComponent } from './container/container.component';
import { RowComponent } from './row/row.component';
import { DraggableDirective } from './draggable.directive';
import { DroppableDirective } from './droppable.directive';


@NgModule({
  declarations: [
    ContainerComponent,
    DraggableDirective,
    DroppableDirective,
    AppComponent,
    WelcomeComponent,
    RowComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
   MatGridListModule,
   MatCardModule,
   MatMenuModule
  ],
  providers: [],
  entryComponents: [ WelcomeComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
