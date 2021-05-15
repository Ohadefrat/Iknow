import {
    Component,
    OnInit
} from '@angular/core';
import {
    RouterExtensions
} from '@nativescript/angular/router';
import {
    NavigationExtras
} from "@angular/router"
import {
    setString
} from 'tns-core-modules/application-settings';
import { registerElement } from '@nativescript/angular/element-registry';
import { Gif } from 'nativescript-gif';
import { Page } from "tns-core-modules/ui";
import {  Color, isAndroid, Observable } from 'tns-core-modules/ui/core/view';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChildren } from '@angular/core';
import { Application, Device } from 'tns-core-modules';
import { AbsoluteLayout } from "tns-core-modules/ui";
import { Label } from '@nativescript/core/ui/label';
import * as enums from "tns-core-modules/ui/enums";
var orientation = require('nativescript-orientation');
orientation.disableRotation();
//registerElement('Gif', () => Gif);
const datagif = new Observable();

let page2;



const firebase = require("nativescript-plugin-firebase");
const firebaseAPI = require("nativescript-plugin-firebase/app");
const data2 = new Observable();


@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    public name: string
    public image: string
    public level: number
    public score: number
    public level_Position: any
    //@ViewChild("playGif") gifRef: ElementRef;
    public mygif: any

    
    
    constructor(private router: RouterExtensions,private page:Page ) {


    }


    ngOnInit(): void {
        
      this.level_Position = new Array()
        firebase.getCurrentUser()
            .then(result => {
                if (result.uid != undefined) {
                      const usersCollection = firebaseAPI.firestore().collection("Users");
                      usersCollection.doc(result.uid).get().then(user => {
                          console.log("main\n" + result);
                          this.name = user.data().name
                          this.image = user.data().image
                          this.level = user.data().level
                          this.score = user.data().score
                          this.level_Position = user.data().levelPosition
                      
                  })
                    this.router.navigate(['/main'])
                }

            })





    }
    ngAfterViewInit(){
        setInterval(()=>{
            this.animationFunc()

        },5000)

    }
    animationFunc(){
        var cardfirstcard1= <AbsoluteLayout>this.page.getViewById("lbl");
        cardfirstcard1.animate({
            rotate: 360,
            duration: 3000,
            iterations: Number.POSITIVE_INFINITY,
            curve: enums.AnimationCurve.easeInOut
        });

        /*.then(() =>  {
            
        cardfirstcard1.originX = 1; // default 0.5 (center), 0 is most left, 1 is most right
        cardfirstcard1.originY = 0; // default 0.5 (middle), 0 is top, 1 is bottom
        cardfirstcard1.animate({
        rotate: 90, // will take into account originX and originY
        duration: 1000,
        opacity: 0
        })
        }).then(() => { 
        cardfirstcard1.originX = 0;
        cardfirstcard1.originY = 1;
        cardfirstcard1.rotate = 0;

        cardfirstcard1.animate({
            rotate: 180,
            duration: 1000,
            opacity: 1
        })
        }).then(() => { 
            cardfirstcard1.originX = 0;
            cardfirstcard1.originY = 0;
            cardfirstcard1.rotate = 0;
    
            cardfirstcard1.animate({
                rotate: 270,
                duration: 1000,
                opacity: 0
            })
            })
            .then(() => { 
                cardfirstcard1.originX = 1;
                cardfirstcard1.originY = 1;
                cardfirstcard1.rotate = 0;
        
                cardfirstcard1.animate({
                    rotate: 360,
                    duration: 1000,
                    opacity: 0
                })
                })*/
    }


    loginWithGoogle() {


        firebase.login({
            type: firebase.LoginType.GOOGLE,
            googleOptions: {
                scopes: ['https://www.googleapis.com/auth/user.birthday.read', 'https://www.googleapis.com/auth/userinfo.profile']
            }
        }).then((result) => {
                //JSON.stringify(result);
                
                    console.log("UNDEFINED");
                    const usersCollection = firebaseAPI.firestore().collection("Users");

                    usersCollection.doc(result.uid).set({
                        name: result.displayName,
                        email: result.email,
                        level: 0,
                        score: 0,
                        image: result.photoURL,
                        levelPosition: this.level_Position
                    });
                    this.router.navigate(['/main'])

                /*} else {
                    firebase.getCurrentUser()
                        .then(result => {
                            console.log("main\n" + result.uid);
                            const usersCollection = firebaseAPI.firestore().collection("Users");
                            usersCollection.doc(result.uid).get().then(user => {
                                console.log("main\n" + result);
                                this.name = user.data().name
                                this.image = user.data().image
                                this.level = user.data().level
                                this.score = user.data().score
                            })
                        })
                        .catch(error => console.log("Logout error: " + JSON.stringify(error)));
                    this.router.navigate(['/main'])
                }*/
              
            })

        

    }
}
