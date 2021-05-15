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
import { Level3Component } from "./puzzles/level3/level3.component";
import { Level4Component } from "./puzzles/level4/level4.component";
import { SelectPuzzleComponent } from "./select-puzzle/select-puzzle.component";
import { Level2twoComponent } from "./puzzles2/level2two/level2two.component";
import { Level3twoComponent } from "./puzzles2/level3two/level3two.component";
import { Level4twoComponent } from "./puzzles2/level4two/level4two.component";
import { Level1threeComponent } from './puzzles3/level1three/level1three.component';
import { Level2threeComponent } from './puzzles3/level2three/level2three.component';
import { Level3threeComponent } from './puzzles3/level3three/level3three.component';
import { Level4threeComponent } from './puzzles3/level4three/level4three.component';
import { Level1fourComponent } from "./puzzles4/level1four/level1four.component";
import { Level2fourComponent } from "./puzzles4/level2four/level2four/level2four.component";
import { Level3fourComponent } from "./puzzles4/level3four/level3four/level3four.component";
import { Level4fourComponent } from "./puzzles4/level4four/level4four/level4four.component";



const routes: Routes = [
    { path: "", redirectTo: "login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "main", component: MainComponent },
    { path: "selectPuzzle", component: SelectPuzzleComponent },
    {path:"arithmetic/arithmetic1",component: Arithmetic1Component},
    {path:"arithmetic/arithmetic2",component: Arithmetic2Component},
    {path:"arithmetic/arithmetic3",component: Arithmetic3Component},
    {path:"arithmetic/arithmetic4",component: Arithmetic4Component},
    {path:"puzzels/level1",component: Level1Component},
    {path:"puzzels/level2",component: Level2Component},
    {path:"puzzels/level3",component: Level3Component},
    {path:"puzzels/level4",component: Level4Component},
    {path:"puzzels2/level",component: LevelComponent},
    {path:"puzzels2/level2two",component: Level2twoComponent},
    {path:"puzzels2/level3two",component: Level3twoComponent},
    {path:"puzzels2/level4two",component: Level4twoComponent},
    {path:"puzzels3/level1three",component: Level1threeComponent},
    {path:"puzzels3/level2three",component: Level2threeComponent},
    {path:"puzzels3/level3three",component: Level3threeComponent},
    {path:"puzzels3/level4three",component: Level4threeComponent},
    {path:"puzzels4/level1four",component: Level1fourComponent},
    {path:"puzzels4/level2four",component: Level2fourComponent},
    {path:"puzzels4/level3four",component: Level3fourComponent},
    {path:"puzzels4/level4four",component: Level4fourComponent},



];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
