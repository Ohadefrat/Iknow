import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ViewContainerRef
} from "@angular/core";
import { isAndroid, isIOS, device, screen } from "tns-core-modules/platform";
import {
  PanGestureEventData
} from "tns-core-modules/ui/gestures";
import * as dialogs from "tns-core-modules/ui/dialogs";
import {
  Image
} from "tns-core-modules/ui/image";
import { Label } from "tns-core-modules//ui/label";
import {

  Color,
  EventData,
  Observable,
  opacityProperty,
  Page, ShowModalOptions
} from 'tns-core-modules/ui/page';
import {
  RouterExtensions
} from '@nativescript/angular/router';
import { ActivatedRoute } from "@angular/router";
import { getString } from "tns-core-modules/application-settings";
import { NavigationExtras } from "@angular/router"
import { ModalDialogService, ModalDialogParams, ModalDialogOptions } from "@nativescript/angular/modal-dialog";
import { ExtendedShowModalOptions, ModalStack, overrideModalViewMethod } from "nativescript-windowed-modal"
import { registerElement } from "@nativescript/angular";
import { AbsoluteLayout } from "tns-core-modules/ui";
import * as application from "tns-core-modules/application";
//overrideModalViewMethod()
//registerElement("ModalStack", () => ModalStack)
const firebase = require("nativescript-plugin-firebase");
const firebaseAPI = require("nativescript-plugin-firebase/app");
import * as enums from "tns-core-modules/ui/enums";
var orientation = require('nativescript-orientation');
orientation.disableRotation();
@Component({
  selector: 'ns-level3three',
  templateUrl: './level3three.component.html',
  styleUrls: ['./level3three.component.css']
})
export class Level3threeComponent implements OnInit {

  public imagesArray;
  public wordArray;
  @ViewChildren('ref', { read: ElementRef }) elements: QueryList<ElementRef>;
  @ViewChildren('word', { read: ElementRef }) words: QueryList<ElementRef>;
  public progressvalue: number = 0
  public firstlblEnable: boolean
  public seclblEnable: boolean
  public trlblEnable: boolean
  public foulblEnable: boolean
  public fivelblEnable: boolean
  public sixlblEnable: boolean
  public sevenlblEnable: boolean
  public eightlblEnable: boolean
  public ninelblEnable: boolean
  public tenlblEnable: boolean
  public elevelblEnable: boolean
  public twellblEnable: boolean
  public thrteenlblEnable: boolean
  public forteenlblEnable: boolean
  public fivteenlblEnable: boolean
  public sixteenlblEnable: boolean
  public scorecounter: number = 0
  public name: string
  public image: string
  public level: number
  public score: number

  public firstWordlblEnable: boolean
  public secWordlblEnable: boolean
  public trdWordlblEnable:boolean
  public fiveWordlblEnable:boolean
  public forWordlblEnable:boolean
  public sixWordlblEnable:boolean
  public level_Position: any
  public btnActionActive: boolean =false;

  constructor(private page: Page, private router: RouterExtensions, private route: ActivatedRoute) {
    this.page.on(application.AndroidApplication.activityBackPressedEvent, this.onBackButtonTap, this);


  }
  onBackButtonTap(data: EventData) {
      
          this.router.navigate(['puzzels2/level3two']);
     
  }

  ngOnInit(): void {

    var cardImgfoulbl= <AbsoluteLayout>this.page.getViewById("foulbl");
    var cardImgtrlbl = <AbsoluteLayout>this.page.getViewById("trlbl");
    var cardImgfirstlbl = <AbsoluteLayout>this.page.getViewById("firstlbl");
    var cardImgseclbl = <AbsoluteLayout>this.page.getViewById("seclbl");

    var cardImgfivelbl = <AbsoluteLayout>this.page.getViewById("fivelbl");
    var cardImgsixlbl = <AbsoluteLayout>this.page.getViewById("sixlbl");
    var cardImgsevenlbl = <AbsoluteLayout>this.page.getViewById("sevenlbl");
    var cardImgeightlbl = <AbsoluteLayout>this.page.getViewById("eightlbl");
    
    var cardImgninelbl = <AbsoluteLayout>this.page.getViewById("ninelbl");
    var cardImgtenlbl = <AbsoluteLayout>this.page.getViewById("tenlbl");
    var cardImgelevenlbl = <AbsoluteLayout>this.page.getViewById("elevelbl");
    var cardImgtwellbl = <AbsoluteLayout>this.page.getViewById("twellbl");

    var cardImgthrteenlbl = <AbsoluteLayout>this.page.getViewById("thrteennlbl");
    var cardImgforteenlbl = <AbsoluteLayout>this.page.getViewById("forteenlbl");
    var cardImgfivteenlbl = <AbsoluteLayout>this.page.getViewById("fivteenlbl");
    var cardImgsixteenlbl = <AbsoluteLayout>this.page.getViewById("sixteenlbl");

    setTimeout(()=>{
    cardImgfoulbl.backgroundImage= "black";
    
    cardImgtrlbl.backgroundImage= "white";

    cardImgfirstlbl.backgroundImage= "white";

    cardImgseclbl.backgroundImage= "white";

    cardImgfivelbl.backgroundImage= "white";

    cardImgsixlbl.backgroundImage= "white";
    cardImgsevenlbl.backgroundImage= "white";
    cardImgeightlbl.backgroundImage= "white";
    cardImgninelbl.backgroundImage= "white";
    cardImgtenlbl.backgroundImage= "white";
    cardImgelevenlbl.backgroundImage= "white";
    cardImgtwellbl.backgroundImage= "white";
    cardImgthrteenlbl.backgroundImage= "white";
    cardImgforteenlbl.backgroundImage= "white";
    cardImgfivteenlbl.backgroundImage= "white";
    cardImgsixteenlbl.backgroundImage= "white";
    this.btnActionActive=true;

  },3000)

    var firstcard16= <AbsoluteLayout>this.page.getViewById("firstcard16");
    firstcard16.backgroundImage ="~/app/assets/bunny.jpg";
    console.log(`screen.mainScreen.widthDIPs ${screen.mainScreen.widthDIPs}`);
    if(screen.mainScreen.widthDIPs > 360){
      var sixteenlbl
      sixteenlbl = <Label>this.page.getViewById("firstcard16");
      sixteenlbl.backgroundSize = "700px 700px";
      sixteenlbl.backgroundPosition = "-5% 35%";
      console.log("true");
      
    }
    if(screen.mainScreen.widthDIPs <= 360){
      var sixteenlbl
      sixteenlbl = <Label>this.page.getViewById("firstcard16");
      sixteenlbl.backgroundSize = "926px 1024px";
      sixteenlbl.backgroundPosition = "25% -5%";
      console.log("true");
      
    }


    firebase.getCurrentUser()
    .then(result => {
        const usersCollection = firebaseAPI.firestore().collection("Users");
        usersCollection.doc(result.uid).get().then(user=>{
                this.name = user.data().name
                this.image = user.data().image
                this.level = user.data().level||1
                this.score = user.data().score||0
                this.level_Position = user.data().levelPosition
                
        })
    })
    this.imagesArray = new Array(9);
    this.wordArray = new Array(2);  
    this.firstlblEnable = true;
    this.seclblEnable = true;
    this.trlblEnable = true;
    this.foulblEnable = true;
    this.fivelblEnable = true;
    this.sixlblEnable = true;
    this.sevenlblEnable = true;
    this.eightlblEnable = true;
    this.ninelblEnable = true;
    this.tenlblEnable =true;
    this.elevelblEnable= true;
    this.twellblEnable = true;
    this.thrteenlblEnable =true;
    this.forteenlblEnable =true;
    this.fivteenlblEnable =true;
    this.sixteenlblEnable = true;
    let state = 0


  }


  ngAfterViewInit() {
    console.log('test')
    //console.log(this.elements.length);
    //console.log(this.imagesArray.length);
    let i = 0
    this.elements.forEach(e => {
      let img = <Image>e.nativeElement;
      img.translateX = 0
      img.translateY = 0
      img.scaleX = 1
      img.scaleY = 1
      this.imagesArray[i++] = {
        elem: e,
        image: img,
        isEnable: true,
        prevX: 0,
        prevY: 0
      }
    })

    //console.log(this.words.length);
    //console.log(this.wordArray.length);
    let j = 0
    
    this.words.forEach(e2 => {
      //console.log(e2);
      let lbl = <Label>e2.nativeElement;
      lbl.translateX = 0
      lbl.translateY = 0
      lbl.scaleX = 1
      lbl.scaleY = 1
      this.wordArray[j++] = {
        elem: e2,
        lbl: lbl,
        isEnable: true,
        prevX: 0,
        prevY: 0
        
      }
    })
  }


  onPan5(index: number, args: PanGestureEventData) {
    if(this.btnActionActive==true){

    /*console.log(index);
    console.log(this.imagesArray[index - 1]);*/
    console.log("Pana" + index + ": [" + this.imagesArray[index - 1].image.translateX + ", " + this.imagesArray[index - 1].image.translateY + "] state: " + args.state);
    if (args.state === 1) // down
    {
      this.imagesArray[index - 1].prevX = args.deltaX;
      this.imagesArray[index - 1].prevY = args.deltaY;
      this.imagesArray[index - 1].image.scaleX = 1
      this.imagesArray[index - 1].image.scaleY = 1
    } else if (args.state === 2) // panning
    {
      this.imagesArray[index - 1].image.scaleX = 1.1
      this.imagesArray[index - 1].image.scaleY = 1.1
      this.imagesArray[index - 1].image.translateX += args.deltaX - this.imagesArray[index - 1].prevX;
      this.imagesArray[index - 1].image.translateY += args.deltaY - this.imagesArray[index - 1].prevY;
      this.imagesArray[index - 1].prevX = args.deltaX;
      this.imagesArray[index - 1].prevY = args.deltaY;
      if (this.imagesArray[index - 1].image.translateX <= -105) {
        this.imagesArray[index - 1].image.translateX = -105
      }
      if (this.imagesArray[index - 1].image.translateX >= 120) {
        this.imagesArray[index - 1].image.translateX = 120
      }
      if (this.imagesArray[index - 1].image.translateY <= -400) {
        this.imagesArray[index - 1].image.translateY = -400
      }
      if (this.imagesArray[index - 1].image.translateY >= -7) {
        this.imagesArray[index - 1].image.translateY = -7
      }
      switch (index) {
        case 1:

          /*if (this.imagesArray[index - 1].image.translateX >= -110 && this.imagesArray[index - 1].image.translateX <= -100 && this.imagesArray[index - 1].image.translateY == -400) {
            this.imagesArray[index - 1].image.translateX = -105
            this.imagesArray[index - 1].image.translateY = -400*/
          if (this.imagesArray[index - 1].image.translateX <= 50 && this.imagesArray[index - 1].image.translateX >= 40 && this.imagesArray[index - 1].image.translateY >= -180 && this.imagesArray[index - 1].image.translateY <= -170) {
              this.imagesArray[index - 1].image.translateX = 45
              this.imagesArray[index - 1].image.translateY = -175
            args.state = 3
            if (this.firstlblEnable == true) {
              var cardImgfirstlbl= <AbsoluteLayout>this.page.getViewById("fivteenlbl");

              cardImgfirstlbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard1= <AbsoluteLayout>this.page.getViewById("firstcard1");
              cardfirstcard1.visibility ="hidden";
              cardfirstcard1.opacity =0;
              cardImgfirstlbl.borderColor="#65e000";
              this.firstlblEnable = false
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.imagesArray[index - 1].isEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 2:
          /*if (this.imagesArray[index - 1].image.translateX <= 125 && this.imagesArray[index - 1].image.translateX >= 115  && this.imagesArray[index - 1].image.translateY >= -180 && this.imagesArray[index - 1].image.translateY <= -170) {
            this.imagesArray[index - 1].image.translateX = 120
            this.imagesArray[index - 1].image.translateY = -175*/
          if ((this.imagesArray[index - 1].image.translateX >= -110 && this.imagesArray[index - 1].image.translateX <= -100) && (this.imagesArray[index - 1].image.translateY >= -255 && this.imagesArray[index - 1].image.translateY <= -245)) {
                this.imagesArray[index - 1].image.translateX = -105
                this.imagesArray[index - 1].image.translateY = -250
            args.state = 3
            if (this.seclblEnable == true) {
              this.seclblEnable = false
              var cardImgtrlbl= <AbsoluteLayout>this.page.getViewById("ninelbl");//sixteenlbl
              cardImgtrlbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard2= <AbsoluteLayout>this.page.getViewById("firstcard2");
              cardfirstcard2.visibility ="hidden";
              cardfirstcard2.opacity=0;
              cardImgtrlbl.borderColor="#65e000";


              var cardfirstcard1= <AbsoluteLayout>this.page.getViewById("firstcard1");
              cardfirstcard1.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard1.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var firstlbl
                firstlbl = <AbsoluteLayout>this.page.getViewById("firstcard1");
                
                firstlbl.backgroungRepeat = 'no-repeat';
                firstlbl.backgroundPosition =  "-5% -5%";
                firstlbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var firstlbl
                firstlbl = <AbsoluteLayout>this.page.getViewById("firstcard1");
                
                firstlbl.backgroungRepeat = 'no-repeat';
                firstlbl.backgroundPosition =  "75% 115%";
                firstlbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard1.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard1.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.seclblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }

          }
        case 3:
          if (this.imagesArray[index - 1].image.translateX >= -110 && this.imagesArray[index - 1].image.translateX <= -100 && this.imagesArray[index - 1].image.translateY == -400) {
            this.imagesArray[index - 1].image.translateX = -105
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.trlblEnable == true) {
              this.trlblEnable = false
              var cardImgninelbl= <AbsoluteLayout>this.page.getViewById("firstlbl");//fivteenlbl
              cardImgninelbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard3= <AbsoluteLayout>this.page.getViewById("firstcard3");
              cardfirstcard3.visibility ="hidden";
              cardfirstcard3.opacity=0;
              cardImgninelbl.borderColor="#65e000";


              var cardfirstcard2= <AbsoluteLayout>this.page.getViewById("firstcard2");
              cardfirstcard2.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard2.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var seclbl
                seclbl = <AbsoluteLayout>this.page.getViewById("firstcard2");
                
                seclbl.backgroungRepeat = 'no-repeat';
                seclbl.backgroundPosition =  "115% 115%";
                seclbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var seclbl
                seclbl = <AbsoluteLayout>this.page.getViewById("firstcard2");
                
                seclbl.backgroungRepeat = 'no-repeat';
                seclbl.backgroundPosition =  "-23% 75%";
                seclbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard2.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard2.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.trlblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1

            }
          }
        case 4:
          if (this.imagesArray[index - 1].image.translateX <= 125 && this.imagesArray[index - 1].image.translateX >= 115  && this.imagesArray[index - 1].image.translateY >= -180 && this.imagesArray[index - 1].image.translateY <= -170) {
            this.imagesArray[index - 1].image.translateX = 120
            this.imagesArray[index - 1].image.translateY = -175
            args.state = 3
            if (this.foulblEnable == true) {
              this.foulblEnable = false
              var cardImgsevenlbl= <AbsoluteLayout>this.page.getViewById("sixteenlbl");//ninelbl
              cardImgsevenlbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard4= <AbsoluteLayout>this.page.getViewById("firstcard4");
              cardfirstcard4.visibility ="hidden";
              cardfirstcard4.opacity=0;
              cardImgsevenlbl.borderColor="#65e000";


              var cardfirstcard3= <AbsoluteLayout>this.page.getViewById("firstcard3");
              cardfirstcard3.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard3.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var trdlvl
                trdlvl = <AbsoluteLayout>this.page.getViewById("firstcard3");
                
                trdlvl.backgroungRepeat = 'no-repeat';
                trdlvl.backgroundPosition =  "75% 115%";
                trdlvl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var trdlvl
                trdlvl = <AbsoluteLayout>this.page.getViewById("firstcard3");
                
                trdlvl.backgroungRepeat = 'no-repeat';
                trdlvl.backgroundPosition =  "-23% -5%";
                trdlvl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard3.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard3.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.foulblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 5:
          /*if ((this.imagesArray[index - 1].image.translateX >= -35 && this.imagesArray[index - 1].image.translateX <= -25) && (this.imagesArray[index - 1].image.translateY >= -400 && this.imagesArray[index - 1].image.translateY <= -390)) {
            this.imagesArray[index - 1].image.translateX = -30
            this.imagesArray[index - 1].image.translateY = -400*/
          if ((this.imagesArray[index - 1].image.translateX >= -100 && this.imagesArray[index - 1].image.translateX <= -95) && (this.imagesArray[index - 1].image.translateY >= -330 && this.imagesArray[index - 1].image.translateY <= -320)) {
              this.imagesArray[index - 1].image.translateX = -100
              this.imagesArray[index - 1].image.translateY = -325
            args.state = 3
            if (this.fivelblEnable == true) {
              this.fivelblEnable = false
              var cardImgseclbl= <AbsoluteLayout>this.page.getViewById("fivelbl");//seclbl
              cardImgseclbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard5= <AbsoluteLayout>this.page.getViewById("firstcard5");
              cardfirstcard5.visibility ="hidden";
              cardfirstcard5.opacity=0;
              cardImgseclbl.borderColor="#65e000";


              var cardfirstcard4= <AbsoluteLayout>this.page.getViewById("firstcard4");
              cardfirstcard4.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard4.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var foulvl
                foulvl = <AbsoluteLayout>this.page.getViewById("firstcard4");
                
                foulvl.backgroungRepeat = 'no-repeat';
                foulvl.backgroundPosition =  "-5% 75%";
                foulvl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var foulvl
                foulvl = <AbsoluteLayout>this.page.getViewById("firstcard4");
                
                foulvl.backgroungRepeat = 'no-repeat';
                foulvl.backgroundPosition =  "123% 115%";
                foulvl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard4.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard4.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.fivelblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 6:
          if ((this.imagesArray[index - 1].image.translateX <= 125 && this.imagesArray[index - 1].image.translateX >= 115) && (this.imagesArray[index - 1].image.translateY >= -400 && this.imagesArray[index - 1].image.translateY <= -390)) {
            this.imagesArray[index - 1].image.translateX = 120
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.sixlblEnable == true) {
              this.sixlblEnable = false
              var cardImgfoulbl= <AbsoluteLayout>this.page.getViewById("foulbl");//foulbl
              cardImgfoulbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard6= <AbsoluteLayout>this.page.getViewById("firstcard6");
              cardfirstcard6.visibility ="hidden";
              cardfirstcard6.opacity=0;
              cardImgfoulbl.borderColor="#65e000";


              var cardfirstcard5= <AbsoluteLayout>this.page.getViewById("firstcard5");
              cardfirstcard5.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard5.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var fivelbl
                fivelbl = <AbsoluteLayout>this.page.getViewById("firstcard5");
                
                fivelbl.backgroungRepeat = 'no-repeat';
                fivelbl.backgroundPosition =  "35% -5%";
                fivelbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var fivelbl
                fivelbl = <AbsoluteLayout>this.page.getViewById("firstcard5");
                
                fivelbl.backgroungRepeat = 'no-repeat';
                fivelbl.backgroundPosition =  "-23% 35%";
                fivelbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard5.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard5.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });

              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.sixlblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 7:
          if ((this.imagesArray[index - 1].image.translateX <= 125 && this.imagesArray[index - 1].image.translateX >= 115) && (this.imagesArray[index - 1].image.translateY >= -330 && this.imagesArray[index - 1].image.translateY <= -320)) {
            this.imagesArray[index - 1].image.translateX = 120
            this.imagesArray[index - 1].image.translateY = -325
            args.state = 3
            if (this.sevenlblEnable == true) {
              this.sevenlblEnable = false
              var cardImgeightlbl= <AbsoluteLayout>this.page.getViewById("eightlbl");//eightlbl
              cardImgeightlbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard7= <AbsoluteLayout>this.page.getViewById("firstcard7");
              cardfirstcard7.visibility ="hidden";
              cardfirstcard7.opacity=0;
              cardImgeightlbl.borderColor="#65e000";


              var cardfirstcard6= <AbsoluteLayout>this.page.getViewById("firstcard6");
              cardfirstcard6.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard6.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var sixlbl
                sixlbl = <AbsoluteLayout>this.page.getViewById("firstcard6");
                
                sixlbl.backgroungRepeat = 'no-repeat';
                sixlbl.backgroundPosition =  "115% -5%";
                sixlbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var sixlbl
                sixlbl = <AbsoluteLayout>this.page.getViewById("firstcard6");
                
                sixlbl.backgroungRepeat = 'no-repeat';
                sixlbl.backgroundPosition =  "123% -5%";
                sixlbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard6.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard6.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });

              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.sevenlblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 8:
          if ((this.imagesArray[index - 1].image.translateX <=50 && this.imagesArray[index - 1].image.translateX >= 40) && (this.imagesArray[index - 1].image.translateY >= -255 && this.imagesArray[index - 1].image.translateY <= -245)) {
            this.imagesArray[index - 1].image.translateX = 45
            this.imagesArray[index - 1].image.translateY = -250
            args.state = 3
            if (this.eightlblEnable == true) {
              this.eightlblEnable = false
              var cardImgeleven= <AbsoluteLayout>this.page.getViewById("elevelbl");//elevelbl
              cardImgeleven.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard8= <AbsoluteLayout>this.page.getViewById("firstcard8");
              cardfirstcard8.visibility ="hidden";
              cardfirstcard8.opacity=0;
              cardImgeleven.borderColor="#65e000";


              var cardfirstcard7= <AbsoluteLayout>this.page.getViewById("firstcard7");
              cardfirstcard7.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard7.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var sevenlbl
                sevenlbl = <AbsoluteLayout>this.page.getViewById("firstcard7");
                
                sevenlbl.backgroungRepeat = 'no-repeat';
                sevenlbl.backgroundPosition =  "115% 35%";
                sevenlbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var sevenlbl
                sevenlbl = <AbsoluteLayout>this.page.getViewById("firstcard7");
                
                sevenlbl.backgroungRepeat = 'no-repeat';
                sevenlbl.backgroundPosition =  "123% 35%";
                sevenlbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard7.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard7.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });

            
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.eightlblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 9:
          /*if ((this.imagesArray[index - 1].image.translateX >= -35 && this.imagesArray[index - 1].image.translateX <= -25) && (this.imagesArray[index - 1].image.translateY >= -330 && this.imagesArray[index - 1].image.translateY <= -320)) {
            this.imagesArray[index - 1].image.translateX = -30
            this.imagesArray[index - 1].image.translateY = -325*/
          if ((this.imagesArray[index - 1].image.translateX >= -110 && this.imagesArray[index - 1].image.translateX <= -105) && (this.imagesArray[index - 1].image.translateY >= -180 && this.imagesArray[index - 1].image.translateY <= -170)) {
              this.imagesArray[index - 1].image.translateX = -105
              this.imagesArray[index - 1].image.translateY = -175
            args.state = 3
            if (this.ninelblEnable == true) {
              this.ninelblEnable = false
              var cardImgsixlbl= <AbsoluteLayout>this.page.getViewById("thrteennlbl");//sixlbl
              cardImgsixlbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard9= <AbsoluteLayout>this.page.getViewById("firstcard9");
              cardfirstcard9.visibility ="hidden";
              cardfirstcard9.opacity=0;
              cardImgsixlbl.borderColor="#65e000";


              var cardfirstcard8= <AbsoluteLayout>this.page.getViewById("firstcard8");
              cardfirstcard8.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard8.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var eightlbl
                eightlbl = <AbsoluteLayout>this.page.getViewById("firstcard8");
                
                eightlbl.backgroungRepeat = 'no-repeat';
                eightlbl.backgroundPosition = "75% 75%";
                eightlbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var eightlbl
                eightlbl = <AbsoluteLayout>this.page.getViewById("firstcard8");
                
                eightlbl.backgroungRepeat = 'no-repeat';
                eightlbl.backgroundPosition = "75% 75%";
                eightlbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard8.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard8.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.ninelblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 10:{
          if ((this.imagesArray[index - 1].image.translateX <= 50 && this.imagesArray[index - 1].image.translateX >= 40) && (this.imagesArray[index - 1].image.translateY >= -400 && this.imagesArray[index - 1].image.translateY <= -390)) {
            this.imagesArray[index - 1].image.translateX = 45
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.tenlblEnable == true) {
              this.tenlblEnable = false
              var cardImgtrlbl= <AbsoluteLayout>this.page.getViewById("trlbl");//trlbl
              cardImgtrlbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard10= <AbsoluteLayout>this.page.getViewById("firstcard10");
              cardfirstcard10.visibility ="hidden";
              cardfirstcard10.opacity=0;
              cardImgtrlbl.borderColor="#65e000";


              var cardfirstcard9= <AbsoluteLayout>this.page.getViewById("firstcard9");
              cardfirstcard9.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard9.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var ninelbl
                ninelbl = <AbsoluteLayout>this.page.getViewById("firstcard9");
                
                ninelbl.backgroungRepeat = 'no-repeat';
                ninelbl.backgroundPosition = "35% 35%";
                ninelbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var ninelbl
                ninelbl = <AbsoluteLayout>this.page.getViewById("firstcard9");
                
                ninelbl.backgroungRepeat = 'no-repeat';
                ninelbl.backgroundPosition = "-23% 115%";
                ninelbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard9.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard9.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.ninelblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }

        }
        case 11:{
          if ((this.imagesArray[index - 1].image.translateX >= -35 && this.imagesArray[index - 1].image.translateX <= -25) && (this.imagesArray[index - 1].image.translateY >= -330 && this.imagesArray[index - 1].image.translateY <= -320)) {
            this.imagesArray[index - 1].image.translateX = -30
            this.imagesArray[index - 1].image.translateY = -325
            args.state = 3
            if (this.elevelblEnable == true) {
              this.elevelblEnable = false
              var cardImgtheteenlbl= <AbsoluteLayout>this.page.getViewById("sixlbl");//thrteennlbl
              cardImgtheteenlbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard11= <AbsoluteLayout>this.page.getViewById("firstcard11");
              cardfirstcard11.visibility ="hidden";
              cardfirstcard11.opacity=0;
              cardImgtheteenlbl.borderColor="#65e000";


              var cardfirstcard10= <AbsoluteLayout>this.page.getViewById("firstcard10");
              cardfirstcard10.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard10.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var tenlbl
                tenlbl = <AbsoluteLayout>this.page.getViewById("firstcard10");
                
                tenlbl.backgroungRepeat = 'no-repeat';
                tenlbl.backgroundPosition = "75% -5%";
                tenlbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var tenlbl
                tenlbl = <AbsoluteLayout>this.page.getViewById("firstcard10");
                
                tenlbl.backgroungRepeat = 'no-repeat';
                tenlbl.backgroundPosition = "75% -5%";
                tenlbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard10.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard10.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.ninelblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }

        }
        case 12:{
          if ((this.imagesArray[index - 1].image.translateX <= 125 && this.imagesArray[index - 1].image.translateX >= 115) && (this.imagesArray[index - 1].image.translateY >= -255 && this.imagesArray[index - 1].image.translateY <= -245)) {
            this.imagesArray[index - 1].image.translateX = -30
            this.imagesArray[index - 1].image.translateY = -175
            args.state = 3
            if (this.twellblEnable == true) {
              this.twellblEnable = false
              var cardImgtwellbl= <AbsoluteLayout>this.page.getViewById("twellbl");//twellbl
              cardImgtwellbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard12= <AbsoluteLayout>this.page.getViewById("firstcard12");
              cardfirstcard12.visibility ="hidden";
              cardfirstcard12.opacity=0;
              cardImgtwellbl.borderColor="#65e000";


              var cardfirstcard11= <AbsoluteLayout>this.page.getViewById("firstcard11");
              cardfirstcard11.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard11.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var elevenlbl
                elevenlbl = <AbsoluteLayout>this.page.getViewById("firstcard11");
                
                elevenlbl.backgroungRepeat = 'no-repeat';
                elevenlbl.backgroundPosition = "-5% 115%";
                elevenlbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var elevenlbl
                elevenlbl = <AbsoluteLayout>this.page.getViewById("firstcard11");
                
                elevenlbl.backgroungRepeat = 'no-repeat';
                elevenlbl.backgroundPosition = "25% 35%";
                elevenlbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard11.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard11.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.ninelblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }


        }
        case 13:{
          if ((this.imagesArray[index - 1].image.translateX >= -35 && this.imagesArray[index - 1].image.translateX <= -25) && (this.imagesArray[index - 1].image.translateY >= -180 && this.imagesArray[index - 1].image.translateY <= -170)) {
            this.imagesArray[index - 1].image.translateX = -30
            this.imagesArray[index - 1].image.translateY = -175
            args.state = 3
            if (this.thrteenlblEnable == true) {
              this.thrteenlblEnable = false
              var cardImgforteenlbl= <AbsoluteLayout>this.page.getViewById("forteenlbl");//forteenlbl
              cardImgforteenlbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard13= <AbsoluteLayout>this.page.getViewById("firstcard13");
              cardfirstcard13.visibility ="hidden";
              cardfirstcard13.opacity=0;
              cardImgforteenlbl.borderColor="#65e000";


              var cardfirstcard12= <AbsoluteLayout>this.page.getViewById("firstcard12");
              cardfirstcard12.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard12.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var twellbl
                twellbl = <AbsoluteLayout>this.page.getViewById("firstcard12");
                
                twellbl.backgroungRepeat = 'no-repeat';
                twellbl.backgroundPosition = "115% 75%";
                twellbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var twellbl
                twellbl = <AbsoluteLayout>this.page.getViewById("firstcard12");
                
                twellbl.backgroungRepeat = 'no-repeat';
                twellbl.backgroundPosition = "123% 75%";
                twellbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard12.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard12.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.ninelblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }

        }
        case 14:{
          if ((this.imagesArray[index - 1].image.translateX >= -35 && this.imagesArray[index - 1].image.translateX <= -25) && (this.imagesArray[index - 1].image.translateY >= -255 && this.imagesArray[index - 1].image.translateY <= -245)) {
            this.imagesArray[index - 1].image.translateX = -30
            this.imagesArray[index - 1].image.translateY = -250
            args.state = 3
            if (this.forteenlblEnable == true) {
              this.forteenlblEnable = false
              var cardImgtenlbl= <AbsoluteLayout>this.page.getViewById("tenlbl");//tenlbl
              cardImgtenlbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard14= <AbsoluteLayout>this.page.getViewById("firstcard14");
              cardfirstcard14.visibility ="hidden";
              cardfirstcard14.opacity=0;
              cardImgtenlbl.borderColor="#65e000";


              var cardfirstcard13= <AbsoluteLayout>this.page.getViewById("firstcard13");
              cardfirstcard13.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard13.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var thrteenlbl
                thrteenlbl = <AbsoluteLayout>this.page.getViewById("firstcard13");
                
                thrteenlbl.backgroungRepeat = 'no-repeat';
                thrteenlbl.backgroundPosition = "35% 115%";
                thrteenlbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var thrteenlbl
                thrteenlbl = <AbsoluteLayout>this.page.getViewById("firstcard13");
                
                thrteenlbl.backgroungRepeat = 'no-repeat';
                thrteenlbl.backgroundPosition = "25% 115%";
                thrteenlbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard13.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard13.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.ninelblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        
        }
        case 15:{
          if ((this.imagesArray[index - 1].image.translateX <= 55 && this.imagesArray[index - 1].image.translateX >= 45) && (this.imagesArray[index - 1].image.translateY >= -330 && this.imagesArray[index - 1].image.translateY <= -320)) {
            this.imagesArray[index - 1].image.translateX = 50
            this.imagesArray[index - 1].image.translateY = -325
            args.state = 3
            if (this.fivteenlblEnable == true) {
              this.fivteenlblEnable = false
              var cardImgsevenlbl= <AbsoluteLayout>this.page.getViewById("sevenlbl");//sevenlbl
              cardImgsevenlbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard15= <AbsoluteLayout>this.page.getViewById("firstcard15");
              cardfirstcard15.visibility ="hidden";
              cardfirstcard15.opacity=0;
              cardImgsevenlbl.borderColor="#65e000";


              var cardfirstcard14= <AbsoluteLayout>this.page.getViewById("firstcard14");
              cardfirstcard14.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard14.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var forteenlbl
                forteenlbl = <AbsoluteLayout>this.page.getViewById("firstcard14");
                
                forteenlbl.backgroungRepeat = 'no-repeat';
                forteenlbl.backgroundPosition = "35% 75%";
                forteenlbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var forteenlbl
                forteenlbl = <AbsoluteLayout>this.page.getViewById("firstcard14");
                
                forteenlbl.backgroungRepeat = 'no-repeat';
                forteenlbl.backgroundPosition = "25% 75%";
                forteenlbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard14.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard14.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.ninelblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        }
        case 16:{
          if ((this.imagesArray[index - 1].image.translateX >= -35 && this.imagesArray[index - 1].image.translateX <= -25) && (this.imagesArray[index - 1].image.translateY >= -400 && this.imagesArray[index - 1].image.translateY <= -390)) {
            this.imagesArray[index - 1].image.translateX = -30
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.sixteenlblEnable == true) {
              this.sixteenlblEnable = false
              var cardImgfivelbl= <AbsoluteLayout>this.page.getViewById("seclbl");//fivelbl
              cardImgfivelbl.backgroundImage ="~/app/assets/bunny.jpg";
              var cardfirstcard16= <AbsoluteLayout>this.page.getViewById("firstcard16");
              cardfirstcard16.visibility ="hidden";
              cardfirstcard16.opacity=0;
              cardImgfivelbl.borderColor="#65e000";


              var cardfirstcard15= <AbsoluteLayout>this.page.getViewById("firstcard15");
              cardfirstcard15.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard15.backgroundImage ="~/app/assets/bunny.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var fivteenlbl
                fivteenlbl = <AbsoluteLayout>this.page.getViewById("firstcard15");
                
                fivteenlbl.backgroungRepeat = 'no-repeat';
                fivteenlbl.backgroundPosition = "75% 35%";
                fivteenlbl.backgroundSize = "700px 700px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var fivteenlbl
                fivteenlbl = <AbsoluteLayout>this.page.getViewById("firstcard15");
                
                fivteenlbl.backgroungRepeat = 'no-repeat';
                fivteenlbl.backgroundPosition = "75% 35%";
                fivteenlbl.backgroundSize = "926px 1024px";
                
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard15.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard15.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.ninelblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        }



      }
    }
    else if (args.state === 3) // up
    {

      this.imagesArray[index - 1].image.scaleX = 1
      this.imagesArray[index - 1].image.scaleY = 1

    } else { }

    if (this.scorecounter == 80 && this.firstlblEnable == false) {
      let animal = ""
      var myAbsoluteLayout;
      this.score += this.scorecounter
      myAbsoluteLayout = <AbsoluteLayout>this.page.getViewById("stk");
      setTimeout(() => {
        setInterval(() => {
          myAbsoluteLayout.opacity +=0.25;
      }, 100);
      }, 1000);


      this.firstWordlblEnable = true;
      this.secWordlblEnable = true;
      this.trdWordlblEnable = true;
      this.fiveWordlblEnable = true;
      this.forWordlblEnable = true;
      this.sixWordlblEnable = true;
    }
  }

  }
  onPan6(index: number, args: PanGestureEventData) {

    console.log("Pana" + index + ": [" + this.wordArray[index - 1].lbl.translateX + ", " + this.wordArray[index - 1].lbl.translateY + "] state: " + args.state);
    if (args.state === 1) // down
    {
      this.wordArray[index - 1].prevX = args.deltaX;
      this.wordArray[index - 1].prevY = args.deltaY;
      this.wordArray[index - 1].lbl.scaleX = 1
      this.wordArray[index - 1].lbl.scaleY = 1
    } else if (args.state === 2) // panning
    {
      this.wordArray[index - 1].lbl.scaleX = 1.1
      this.wordArray[index - 1].lbl.scaleY = 1.1
      this.wordArray[index - 1].lbl.translateX += args.deltaX - this.wordArray[index - 1].prevX;
      this.wordArray[index - 1].lbl.translateY += args.deltaY - this.wordArray[index - 1].prevY;
      this.wordArray[index - 1].prevX = args.deltaX;
      this.wordArray[index - 1].prevY = args.deltaY;
      if(index ==1 ){
        if (this.wordArray[index - 1].lbl.translateX <= -30) {
            this.wordArray[index - 1].lbl.translateX = -30
          }
          if (this.wordArray[index - 1].lbl.translateX >= 250) {
            this.wordArray[index - 1].lbl.translateX = 250
          }
          if (this.wordArray[index - 1].lbl.translateY <= -250) {
            this.wordArray[index - 1].lbl.translateY = -250
          }
          if (this.wordArray[index - 1].lbl.translateY >= 100) {
            this.wordArray[index - 1].lbl.translateY = 100
          }
      }
      else{
        if(index == 2){
          if (this.wordArray[index - 1].lbl.translateX <= -30) {
            this.wordArray[index - 1].lbl.translateX = -30
          }
          if (this.wordArray[index - 1].lbl.translateX >= 235) {
            this.wordArray[index - 1].lbl.translateX = 235
          }
          if (this.wordArray[index - 1].lbl.translateY <= -250) {
            this.wordArray[index - 1].lbl.translateY = -250
          }
          if (this.wordArray[index - 1].lbl.translateY >= 100) {
            this.wordArray[index - 1].lbl.translateY = 100
          }
        }
        if(index==3){
          if (this.wordArray[index - 1].lbl.translateX <= -150) {
              this.wordArray[index - 1].lbl.translateX = -150
            }
            if (this.wordArray[index - 1].lbl.translateX >= 150) {
              this.wordArray[index - 1].lbl.translateX = 150
            }
            if (this.wordArray[index - 1].lbl.translateY <= -200) {
              this.wordArray[index - 1].lbl.translateY = -200
            }
            if (this.wordArray[index - 1].lbl.translateY >= 150) {
              this.wordArray[index - 1].lbl.translateY = 150
            }
          }
          if(index==4){
            if (this.wordArray[index - 1].lbl.translateX <= -150) {
                this.wordArray[index - 1].lbl.translateX = -150
              }
              if (this.wordArray[index - 1].lbl.translateX >= 120) {
                this.wordArray[index - 1].lbl.translateX = 120
              }
              if (this.wordArray[index - 1].lbl.translateY <= -200) {
                this.wordArray[index - 1].lbl.translateY = -200
              }
              if (this.wordArray[index - 1].lbl.translateY >= 100) {
                this.wordArray[index - 1].lbl.translateY = 100
              }
            }
        if(index==5){
          if (this.wordArray[index - 1].lbl.translateX <= -230) {
              this.wordArray[index - 1].lbl.translateX = -230
            }
            if (this.wordArray[index - 1].lbl.translateX >= 51) {
              this.wordArray[index - 1].lbl.translateX = 51
            }
            if (this.wordArray[index - 1].lbl.translateY <= -200) {
              this.wordArray[index - 1].lbl.translateY = -200
            }
            if (this.wordArray[index - 1].lbl.translateY >= 150) {
              this.wordArray[index - 1].lbl.translateY = 150
            }
          }
        if(index == 6){
          if (this.wordArray[index - 1].lbl.translateX <= -230) {
            this.wordArray[index - 1].lbl.translateX = -230
          }
          if (this.wordArray[index - 1].lbl.translateX >= 25) {
            this.wordArray[index - 1].lbl.translateX = 25
          }
          if (this.wordArray[index - 1].lbl.translateY <= -250) {
            this.wordArray[index - 1].lbl.translateY = -250
          }
          if (this.wordArray[index - 1].lbl.translateY >= 100) {
            this.wordArray[index - 1].lbl.translateY = 100
          }
        }

      }

      switch (index) {
        case 4:
            
          if (this.wordArray[index - 1].lbl.translateX >= -55 && this.wordArray[index - 1].lbl.translateX <= -35 &&  this.wordArray[index - 1].lbl.translateY >= -210&&  this.wordArray[index - 1].lbl.translateY <= -190) {
            
            this.wordArray[index - 1].lbl.translateX = -46
            this.wordArray[index - 1].lbl.translateY = -200
            args.state = 3
            
            if (this.forWordlblEnable == true) {
              this.forWordlblEnable = false
              setTimeout(() => {
              console.log(this.wordArray[index - 1].isEnable);
              this.wordArray[index - 1].lbl.scaleX = 1
              this.wordArray[index - 1].lbl.scaleY = 1
              
              
            }, 1000);
            }
          
          }
        case 5:
        
            if (this.wordArray[index - 1].lbl.translateX >= -100 && this.wordArray[index - 1].lbl.translateX <= -80 &&  this.wordArray[index - 1].lbl.translateY >= -110&&  this.wordArray[index - 1].lbl.translateY <= -90) {
              
              this.wordArray[index - 1].lbl.translateX = -88
              this.wordArray[index - 1].lbl.translateY = -103
              args.state = 3
              
              if (this.fiveWordlblEnable == true) {
                this.fiveWordlblEnable = false
                setTimeout(() => {
                console.log(this.wordArray[index - 1].isEnable);
                this.wordArray[index - 1].lbl.scaleX = 1
                this.wordArray[index - 1].lbl.scaleY = 1
                this.scorecounter += 3
                
              }, 1000);
              }
            
            }
      }
    }
    else if (args.state === 3) // up
    {

      this.wordArray[index - 1].lbl.scaleX = 1
      this.wordArray[index - 1].lbl.scaleY = 1
      

    } else { }

    if(this.fiveWordlblEnable == false &&  this.forWordlblEnable == false){
      setTimeout(() => {
        console.log(this.wordArray[index - 1].isEnable);
        this.wordArray[index - 1].lbl.scaleX = 1
        this.wordArray[index - 1].lbl.scaleY = 1
        this.scorecounter += 3
        this.navigatorFunc();
      }, 1000);
    }


  }
  back(){
    console.log("back press");
    this.router.navigate(["/main"]);
}
  navigatorFunc(){
    console.log(this.level_Position.length);
    console.log(this.level_Position);
   if(this.level_Position.includes("level3_3")){
    
   }
   else{
    this.level_Position.push("level3_3")
   }
    firebase.getCurrentUser()
      .then(user => {
        const usersCollection = firebaseAPI.firestore().collection("Users");
        usersCollection.doc(user.uid).set({
          name: user.displayName,
          email: user.email,
          level: this.level,
          score: this.score,
          image: user.photoURL,
          levelPosition: this.level_Position
        },
        console.log("this.score == ", this.score));
        this.router.navigate(["/puzzels3/level4three"], {

        });
  });
}


  dialogMessage(animal) {
    dialogs.action({
      message: "Witch animal is on the picture?",
      actions: ["Monkey", "Giraffe", "Zebra"]
    }).then(result => {
      console.log("Dialog result: " + result);
      if (result == "Zebra") {
        this.score +=25
        firebase.getCurrentUser()
          .then(user => {
            const usersCollection = firebaseAPI.firestore().collection("Users");
            usersCollection.doc(user.uid).set({
              name: user.displayName,
              email: user.email,
              level: this.level,
              score: this.score,
              image: user.photoURL
            });


            let NavigationExtras: NavigationExtras = {
              queryParams: {
                "name": user.displayName,
                "image": user.photoURL,
                "level": user.level,
                "score": this.score

              }
            }
            //setString("score",""+this.score)

            this.router.navigate(['/main'], NavigationExtras)
          })
          .catch(error => console.log("Trouble in paradise: " + error))

      }
      if (result == "Monkey" || result == "Giraffe") {
        alert("Try Again :)")
        setTimeout(() => {
          this.dialogMessage(result)
          animal = result
          return animal
        }, 1500)
      }
    })
    return animal
  }

}
