import {Component,ElementRef, OnInit,ViewChild} from "@angular/core";
import {RouterExtensions} from '@nativescript/angular/router';
import {setString,getString} from "tns-core-modules/application-settings";

import {ActivatedRoute} from "@angular/router"
import { NavigationExtras } from "@angular/router"
import { device, screen, isAndroid, isIOS } from "tns-core-modules/platform";
import { AbsoluteLayout, Button, Label, Page } from "tns-core-modules/ui";
import * as application from "tns-core-modules/application";
import { EventData } from "tns-core-modules/ui/page";

export function onNavigatingTo(args) {

}
const firebase = require("nativescript-plugin-firebase");
const firebaseAPI = require("nativescript-plugin-firebase/app");

@Component({
  selector: 'ns-select-puzzle',
  templateUrl: './select-puzzle.component.html',
  styleUrls: ['./select-puzzle.component.css']
})
export class SelectPuzzleComponent implements OnInit {

  public users: any
  public name: string
  public image: string
  public level: number
  public score;
  public levelstatus :boolean
  public level_Position: any
  

  constructor(private router: RouterExtensions, private route: ActivatedRoute,private page: Page) {
    this.page.on(application.AndroidApplication.activityBackPressedEvent, this.onBackButtonTap, this);


}
onBackButtonTap(data: EventData) {
    
        this.router.navigate(['/main']);
   
}



  ngOnInit(): void {
    var lvl11btn;
    var lvl12btn;
    var lvl13btn;
    var lvl14btn;
    
    var lvl2btn = <Button>this.page.getViewById("abs-btn2");
    var lvl3btn = <Button>this.page.getViewById("abs-btn3");
    var lvl4btn = <Button>this.page.getViewById("abs-btn4");

    lvl11btn = <AbsoluteLayout>this.page.getViewById("one-one");
    lvl12btn = <AbsoluteLayout>this.page.getViewById("one-two");
    lvl13btn = <AbsoluteLayout>this.page.getViewById("one-tre");
    lvl14btn = <AbsoluteLayout>this.page.getViewById("one-for");

    var lvl21btn = <AbsoluteLayout>this.page.getViewById("two-one");
    var lvl22btn = <AbsoluteLayout>this.page.getViewById("two-two");
    var lvl23btn = <AbsoluteLayout>this.page.getViewById("two-tre");
    var lvl24btn = <AbsoluteLayout>this.page.getViewById("two-for");
    
    var lvl31btn = <AbsoluteLayout>this.page.getViewById("three-one");
    var lvl32btn = <AbsoluteLayout>this.page.getViewById("three-two");
    var lvl33btn = <AbsoluteLayout>this.page.getViewById("three-tre");
    var lvl34btn = <AbsoluteLayout>this.page.getViewById("three-for");

    var lvl41btn = <AbsoluteLayout>this.page.getViewById("four-one");
    var lvl42btn = <AbsoluteLayout>this.page.getViewById("four-two");
    var lvl43btn = <AbsoluteLayout>this.page.getViewById("four-tre");
    var lvl44btn = <AbsoluteLayout>this.page.getViewById("four-for");

    this.level_Position = new Array()

    firebase.getCurrentUser()
    .then(result => {
        console.log("Selecet Puzzle\n" +result.uid);
        const usersCollection = firebaseAPI.firestore().collection("Users");
        usersCollection.doc(result.uid).get().then(user=>{
            console.log("Selecet Puzzle\n" +result);
                this.name = user.data().name
                this.image = user.data().image
                this.level = user.data().level||1
                this.score = user.data().score||0
                this.level_Position = user.data().levelPosition

                for(var i =0 ; i <= this.level_Position.length;i++){
                  if(this.level_Position[i] == "level1_1"){
                    lvl11btn.backgroundColor = "#4CFE3C";
                  }
                  if(this.level_Position[i] == "level1_2"){
                    lvl12btn.backgroundColor = "#4CFE3C";
                  }
                  if(this.level_Position[i] == "level1_3"){
                    lvl13btn.backgroundColor = "#4CFE3C";
                  }
                  if(this.level_Position[i] == "level1_4"){
                    lvl14btn.backgroundColor = "#4CFE3C";
                    lvl2btn.background ="#31c1ff"
                    lvl2btn.opacity =1;
                    lvl2btn.isEnabled =true;
                  }
                  if(this.level_Position[i] == "level2_1"){
                    lvl21btn.backgroundColor = "#4CFE3C";
                  }
                  if(this.level_Position[i] == "level2_2"){
                    lvl22btn.backgroundColor = "#4CFE3C";
                  }
                  if(this.level_Position[i] == "level2_3"){
                    lvl23btn.backgroundColor = "#4CFE3C";
                  }
                  if(this.level_Position[i] == "level2_4"){
                    lvl24btn.backgroundColor = "#4CFE3C";
                    lvl3btn.background ="#31c1ff"
                    lvl3btn.opacity =1;
                    lvl3btn.isEnabled =true;
                  }
                  if(this.level_Position[i] == "level3_1"){
                    lvl31btn.backgroundColor = "#4CFE3C";
                  }
                  if(this.level_Position[i] == "level3_2"){
                    lvl32btn.backgroundColor = "#4CFE3C";
                  }
                  if(this.level_Position[i] == "level3_3"){
                    lvl33btn.backgroundColor = "#4CFE3C";
                  }
                  if(this.level_Position[i] == "level3_4"){
                    lvl34btn.backgroundColor = "#4CFE3C";
                    lvl4btn.background ="#31c1ff"
                    lvl4btn.opacity =1;
                    lvl4btn.isEnabled =true;
                  }
                  if(this.level_Position[i] == "level4_1"){
                    lvl41btn.backgroundColor = "#4CFE3C";
                  }
                  if(this.level_Position[i] == "level4_2"){
                    lvl42btn.backgroundColor = "#4CFE3C";
                  }
                  if(this.level_Position[i] == "level4_3"){
                    lvl43btn.backgroundColor = "#4CFE3C";
                  }
                  if(this.level_Position[i] == "level4_4"){
                    lvl44btn.backgroundColor = "#4CFE3C";
                  }

                }

        })
        

    })
    

  }
  openlevel(index){
    
        if(index ==1){
          if(this.level_Position.includes("level1_3")){
            this.router.navigate(['/puzzels/level4'])
          }
          else if(this.level_Position.includes("level1_2")){
            this.router.navigate(['/puzzels/level3'])
          }
          else if(this.level_Position.includes("level1_1")){
            this.router.navigate(['/puzzels/level2'])
          }
          else{
            this.router.navigate(['/puzzels/level1'])
          }
        }
        if(index ==2){

          if(this.level_Position.includes("level2_3")){
            this.router.navigate(['puzzels2/level4two'])
          }
          else if(this.level_Position.includes("level2_2")){
            this.router.navigate(['puzzels2/level3two'])
          }
          else if(this.level_Position.includes("level2_1")){
            this.router.navigate(['puzzels2/level2two'])
          }
          else{
            this.router.navigate(['/puzzels2/level'])
          }

          
        }
        if(index ==3){
          if(this.level_Position.includes("level3_3")){
            this.router.navigate(['puzzels3/level4three'])
          }
          else if(this.level_Position.includes("level3_2")){
            this.router.navigate(['puzzels3/level3three'])
          }
          else if(this.level_Position.includes("level3_1")){
            this.router.navigate(['puzzels3/level2three'])
          }
          else{
            this.router.navigate(['puzzels3/level1three'])
          }

        }
        if(index ==4){

          if(this.level_Position.includes("level4_3")){
            this.router.navigate(['puzzels4/level4four'])
          }
          else if(this.level_Position.includes("level4_2")){
            this.router.navigate(['puzzels4/level3four'])
          }
          else if(this.level_Position.includes("level4_1")){
            this.router.navigate(['puzzels4/level2four'])
          }
          else{
            this.router.navigate(['puzzels4/level1four'])
          }
        }
      }

}
