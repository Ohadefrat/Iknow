import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {  NativeScriptModule } from "@nativescript/angular";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {ModalComponent} from "./puzzles/level1/app.modal"
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { Level1Component } from './puzzles/level1/level1.component';
import { Arithmetic1Component } from './arithmetic/arithmetic1/arithmetic1.component';
import { Arithmetic2Component } from './arithmetic/arithmetic2/arithmetic2.component';
import { Arithmetic3Component } from './arithmetic/arithmetic3/arithmetic3.component';
import { Arithmetic4Component } from './arithmetic/arithmetic4/arithmetic4.component';
import { TestlevelComponent } from './testlevel/testlevel.component';
import { Level2Component } from './puzzles/level2/level2.component';
import {ModalDialogService,ModalDialogParams} from "@nativescript/angular/modal-dialog";
import { LevelComponent } from './puzzles2/level/level.component';


// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent,
        
    ],
    entryComponents:[
        
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule
        ],
    declarations: [
        AppComponent,
        LoginComponent,
        MainComponent,
        Level1Component,
        Arithmetic1Component,
        Arithmetic2Component,
        Arithmetic3Component,
        Arithmetic4Component,
        TestlevelComponent,
        Level2Component,
        LevelComponent,

    ],
    providers: [ModalDialogService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
