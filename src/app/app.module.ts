import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import {HttpClientModule} from '@angular/common/http'

import { PdfViewerComponent } from 'ng2-pdf-viewer'

import { FormsModule } from '@angular/forms'

import {
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdDialogModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTableModule,    
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule  

} from '@angular/material'

@NgModule({
    declarations: [
        AppComponent,
        PdfViewerComponent
    ],
    imports: [
        FormsModule,
        BrowserModule,
        MdButtonModule,
        MdButtonToggleModule,
        MdCardModule,
        MdCheckboxModule,
        MdDialogModule,
        MdGridListModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        MdRadioModule,
        MdRippleModule,
        MdSelectModule,
        MdSidenavModule,
        MdSlideToggleModule,
        MdSnackBarModule,
        MdTableModule,    
        MdTabsModule,
        MdToolbarModule,
        MdTooltipModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
