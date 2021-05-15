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
import { Level3Component } from './puzzles/level3/level3.component';
import { Level4Component } from './puzzles/level4/level4.component';
import { SelectPuzzleComponent } from './select-puzzle/select-puzzle.component';
import { Level2twoComponent } from './puzzles2/level2two/level2two.component';
import { Level3twoComponent } from './puzzles2/level3two/level3two.component';
import { Level4twoComponent } from './puzzles2/level4two/level4two.component';
import { Level1threeComponent } from './puzzles3/level1three/level1three.component';
import { Level2threeComponent } from './puzzles3/level2three/level2three.component';
import { Level3threeComponent } from './puzzles3/level3three/level3three.component';
import { Level4threeComponent } from './puzzles3/level4three/level4three.component';
import { Level1fourComponent } from './puzzles4/level1four/level1four.component';
import { Level2fourComponent } from './puzzles4/level2four/level2four/level2four.component';
import { Level3fourComponent } from './puzzles4/level3four/level3four/level3four.component';
import { Level4fourComponent } from './puzzles4/level4four/level4four/level4four.component';
require( "nativescript-platform-css" );

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
        Level3Component,
        Level4Component,
        SelectPuzzleComponent,
        Level2twoComponent,
        Level3twoComponent,
        Level4twoComponent,
        Level1threeComponent,
        Level2threeComponent,
        Level3threeComponent,
        Level4threeComponent,
        Level1fourComponent,
        Level2fourComponent,
        Level3fourComponent,
        Level4fourComponent,

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
