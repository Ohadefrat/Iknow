import {Component,ElementRef, OnInit,ViewChild} from "@angular/core";
import {RouterExtensions} from '@nativescript/angular/router';
import {setString,getString} from "tns-core-modules/application-settings";

import {ActivatedRoute} from "@angular/router"
import { NavigationExtras } from "@angular/router"
import { device, screen, isAndroid, isIOS } from "tns-core-modules/platform";
import { AbsoluteLayout, Page } from "tns-core-modules/ui";
import * as application from "tns-core-modules/application";
import { EventData } from "tns-core-modules/ui/page";
var orientation = require('nativescript-orientation');
orientation.disableRotation();
export function onNavigatingTo(args) {

}
const firebase = require("nativescript-plugin-firebase");
const firebaseAPI = require("nativescript-plugin-firebase/app");

@Component({
    selector: 'ns-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

    public users: any
    public name: string
    public image: string
    public level: number
    public score: number
    public level_Position: any
    public myAbsoluteLayout;
    isVisible: boolean = true;



    constructor(private router: RouterExtensions, private route: ActivatedRoute,private page: Page) {
        this.page.on(application.AndroidApplication.activityBackPressedEvent, this.onBackButtonTap, this);


    }
    onBackButtonTap(data: EventData) {
        
            this.router.navigate(['/main']);
       
    }
    ngOnInit(): void {
        this.level_Position = new Array()
        this.isVisible = false;
        this.myAbsoluteLayout = <AbsoluteLayout>this.page.getViewById("stk");
        firebase.getCurrentUser()
            .then(result => {
                console.log("main\n" +result.uid);
                const usersCollection = firebaseAPI.firestore().collection("Users");
                usersCollection.doc(result.uid).get().then(user=>{
                    console.log("main\n" +result);
                        this.name = user.data().name
                        this.image = user.data().image
                        this.level = user.data().level||1
                        this.score = user.data().score||0
                        this.level_Position = user.data().levelPosition
                })
            })

    }

    logoutGoogle() {
        firebase.logout()
            .then(() => console.log("Logout OK"))
        this.router.navigate(['/login'])
            .catch(error => console.log("Logout error: " + JSON.stringify(error)));

    }
    openPuzzleComp() {
        firebase.getCurrentUser()
            .then(user => {
                const usersCollection = firebaseAPI.firestore().collection("Users");
                setString("name", "" + this.name)
                setString("image", "" + this.image)
                setString("level", "" + this.level)
                setString("score", "" + this.score)

                let NavigationExtras: NavigationExtras = {
                    queryParams: {
                        "name": user.displayName,
                        "image": user.photoURL,
                        "level": user.level,
                        "score": user.score

                    }
                }
                //if(this.score>=22){
                    this.router.navigate(['/selectPuzzle'], NavigationExtras)
                /*}
                else{
                    this.router.navigate(['/puzzels/level1'], NavigationExtras)
                }*/
                
            },
                (errorMessage) => {
                    console.log(errorMessage);
                },
            );
    }

    openArithmeticComp() {

        this.router.navigate(['/arithmetic/arithmetic1'])

    }
    settingbtn(){
        console.log("setting press");
        setTimeout(()=>{
            do {
                this.myAbsoluteLayout.opacity +=0.25;
            }while(this.myAbsoluteLayout.opacity != 1);
                
        },100);
        this.isVisible = true;
      
    }
    back(){
        console.log("back press");
        setTimeout(()=>{
            do {
                this.myAbsoluteLayout.opacity -=0.25;
            }while(this.myAbsoluteLayout.opacity != 0);
            
        },100);
        this.isVisible = false;
    }
    
}
