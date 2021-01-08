import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfviewerComponent } from './pdfviewer/pdfviewer.component';
import { FormsModule } from '@angular/forms';
import { PdfpageComponent } from './pdfpage/pdfpage.component';
import { PdfwithpageComponent } from './pdfwithpage/pdfwithpage.component';

@NgModule({
  declarations: [
    AppComponent,
    PdfviewerComponent,
    PdfpageComponent,
    PdfwithpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
