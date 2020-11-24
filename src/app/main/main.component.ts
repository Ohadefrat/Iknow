import {Component,ElementRef, OnInit,ViewChild} from "@angular/core";
import {RouterExtensions} from '@nativescript/angular/router';
import {setString,getString} from "tns-core-modules/application-settings";

import {ActivatedRoute} from "@angular/router"
import { NavigationExtras } from "@angular/router"
import { device, screen, isAndroid, isIOS } from "tns-core-modules/platform";

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



    constructor(private router: RouterExtensions, private route: ActivatedRoute) {


    }

    ngOnInit(): void {
        console.log(`Running on Android? ${isAndroid}`);
        console.log(`Running on iOS? ${isIOS}`);
    
        console.log(`device.model ${device.model}`); // For example: "Nexus 5" or "iPhone".
        console.log(`device.deviceType ${device.deviceType}`); // "Phone" | "Tablet"
        console.log(`device.os ${device.os}`); // For example: "Android" or "iOS".
        console.log(`device.osVersion ${device.osVersion}`); // For example: 4.4.4(android), 8.1(ios)
        console.log(`device.sdkVersion ${device.sdkVersion}`); //  For example: 19(android), 8.1(ios).
        console.log(`device.language ${device.language}`); // For example "en" or "en-US".
        console.log(`device.manufacturer ${device.manufacturer}`); // For example: "Apple" or "HTC" or "Samsung".
        console.log(`device.uuid ${device.uuid}`); // The unique identification number
        console.log(`device.region ${device.region}`); //  For example "US".
    
        console.log(`screen.mainScreen.heightDIPs ${screen.mainScreen.heightDIPs}`); // The absolute height of the screen in density independent pixels.
        console.log(`screen.mainScreen.heightPixels ${screen.mainScreen.heightPixels}`); // The absolute height of the screen in pixels.
        console.log(`screen.mainScreen.scale ${screen.mainScreen.scale}`); // The logical density of the display.
        console.log(`screen.mainScreen.widthDIPs ${screen.mainScreen.widthDIPs}`); // The absolute width of the screen in density independent pixels.
        console.log(`screen.mainScreen.widthPixels ${screen.mainScreen.widthPixels}`); // The absolute width of the screen in pixel
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
                    this.router.navigate(['/puzzels/level1'], NavigationExtras)
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
        setString("name", "" + this.name)
        setString("image", "" + this.image)
        this.router.navigate(['/arithmetic/arithmetic1'])

    }
}
