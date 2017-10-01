import {
    Component,
} from '@angular/core'

import {
    HttpClient
} from '@angular/common/http'

//import { ResponseContentType } from '@angular/http'

import { MdSnackBar } from '@angular/material'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/timer'
import 'rxjs/add/operator/map'

import { BehaviorSubject } from 'rxjs/BehaviorSubject'

import * as xml2js from 'xml2js'

@Component({
    selector: 'app-root',
    template: `
        <md-sidenav-container class="sidenav-component-sidenav-container">
            <md-sidenav #sidenav class="sidenav-component-sidenav" [opened]="true" [mode]="'side'">
                <!--div style="height: 180px;">
                    <button md-fab (click)="setProject(project)" id="buttonProjectAdd" mdTooltip="Actualiser" class="md-sidenav-component-button md-card-button">
                        <md-icon></md-icon>
                    </button>
                </div-->
                <md-list>
                    <a>
                        <md-list-item class="sidenav-component-sidenav-components">
                            <md-icon md-list-avatar>home</md-icon>
                            <h4 md-line>AERO_WINTEM</h4>
                            <p md-line>Wintem</p>
                        </md-list-item>
                    </a>
                    <md-divider class="sidenav-component-sidenav-components-divider"></md-divider>
                    <a>
                    <md-list-item class="sidenav-component-sidenav-components">
                        <md-icon md-list-avatar>home</md-icon>
                        <h4 md-line>AERO_TEMSI</h4>
                        <p md-line>Temsi</p>
                    </md-list-item>
                </a>
                </md-list>
            </md-sidenav>
            <md-toolbar color="primary"  [class.mat-elevation-z6]="showShadow" class="md-toolbar-component-shadow">
                <div style="display: flex; align-items: center;">
                    <span>AEROWEB</span>
                </div>
                <div style="display: flex; align-items: center;">
                </div>
            </md-toolbar>
            <div class="sidenav-component-sidenav-content">
                <md-spinner *ngIf="progress"></md-spinner>
                <div>            
                    <md-select placeholder="Altitude" [(ngModel)]="altitudeSelect" (change)="getInfos()">
                        <md-option *ngFor="let altitude of altitudes" [value]="altitude">{{ altitude }}</md-option>
                    </md-select>
                    <md-select placeholder="Date" [(ngModel)]="dateSelect" style="width: 200px;" (change)="getInfos()">
                        <md-option *ngFor="let data of datas" [value]="data.date_echeance[0]">{{ data.date_echeance[0] }}</md-option>
                    </md-select>
                </div>
                <pdf-viewer [src]="this.pdfUrl"
                            [render-text]="true"
                            style="display: block;">
                </pdf-viewer>
            </div>
            {{this.datas | json}}
        </md-sidenav-container>
    `
})
export class AppComponent {

    id = 'ONANVIRDNL'
    url = '/FR/aviation/serveur_donnees.jsp'
    title = 'Aeroweb'

    vueSelect = 'AERO_TEMSI'
    dateSelect = '00 00 0000 00:00'
    altitudeSelect = '100'
    progress = true

    img
    datas

    altitudes = ['020', '050', '080', '100', '140', '180', '210', '240', '270', '300', '320', '340', '360', '390', '410', '450', '480', '530']
    carte
    pdfUrl

    urlMap = (vue, altitude) => `${this.url}?ID=${this.id}&TYPE_DONNEES=CARTES&BASE_COMPLETE=non&VUE_CARTE=${vue}&ALTITUDE=${altitude}`

    constructor(
        private http: HttpClient,
        private snackBar: MdSnackBar
    ) {
        console.log('AppComponent - constructor')        
        Observable.timer(0,60000)
            .map(
                () => this.getInfos()
            )
            .subscribe()
    }

    getInfos = () => {
        console.log('getInfos')
        this.progress = true
        this.http.get(this.urlMap(this.vueSelect, this.altitudeSelect), {responseType: 'text'})
            .subscribe(
                (res: any) => {
                    xml2js.parseString(
                        res,
                        (err, result) => {
                            console.log('AppComponent - getInfos, err, result : ', err, result)
                            if(err || result.ERREUR) {
                                this.snackBar.open('Erreur de connection', '', {duration: 30000})
                            }
                            else {
                                this.progress = false
                                this.datas = result.cartes.bloc_zone[0].carte
                                this.pdfUrlSet()
                            }
                        }
                    )
                }
            )
    }

    pdfUrlSet = () => {
        console.log('AppComponent - pdfUrlSet, dateSelect : ', this.dateSelect)
        console.log(this.datas)
        let mapInfos = this.datas.find(
            data => data.date_echeance[0] === this.dateSelect
        )
        console.log('mapInfos : ', mapInfos)
        if(mapInfos)
            this.pdfUrl = mapInfos.lien[0]
        else
            this.pdfUrl = ""
    }

}
