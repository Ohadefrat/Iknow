import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { LoginComponent } from "./login/login.component";
import { MainComponent } from "./main/main.component";
import { Level1Component } from "./puzzles/level1/level1.component";
import { Arithmetic1Component } from "./arithmetic/arithmetic1/arithmetic1.component";
import { Arithmetic2Component } from "./arithmetic/arithmetic2/arithmetic2.component";
import { Arithmetic3Component } from "./arithmetic/arithmetic3/arithmetic3.component";
import { Arithmetic4Component } from "./arithmetic/arithmetic4/arithmetic4.component";
import { Level2Component } from "./puzzles/level2/level2.component";
import { ModalComponent } from "./puzzles/level1/app.modal";
import { LevelComponent } from "./puzzles2/level/level.component";



const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "main", component: MainComponent },
    {path:"puzzels/level1",component: Level1Component},
    {path:"arithmetic/arithmetic1",component: Arithmetic1Component},
    {path:"arithmetic/arithmetic2",component: Arithmetic2Component},
    {path:"arithmetic/arithmetic3",component: Arithmetic3Component},
    {path:"arithmetic/arithmetic4",component: Arithmetic4Component},
    {path:"puzzels/level2",component: Level2Component},
    {path:"puzzels2/level",component: LevelComponent},
    
    


];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
