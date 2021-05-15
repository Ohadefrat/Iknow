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
  selector: 'ns-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit, AfterViewInit {
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
  public scorecounter: number = 0
  public name: string
  public image: string
  public level: number
  public score: number
  public firstWordlblEnable: boolean
  public secWordlblEnable: boolean
  public trdWordlblEnable:boolean
  public level_Position: any
  public btnActionActive: boolean =false;



  constructor(private page: Page, private router: RouterExtensions, private route: ActivatedRoute) {
    this.page.on(application.AndroidApplication.activityBackPressedEvent, this.onBackButtonTap, this);


  }
  onBackButtonTap(data: EventData) {
      
          this.router.navigate(['/puzzels/level2']);
     
  }

  ngOnInit(): void {
    console.log(`screen.mainScreen.widthDIPs ${screen.mainScreen.widthDIPs}`);
    var cardImgfoulbl= <AbsoluteLayout>this.page.getViewById("foulbl");
    var cardImgtrlbl = <AbsoluteLayout>this.page.getViewById("trlbl");
    var cardImgfirstlbl = <AbsoluteLayout>this.page.getViewById("firstlbl");
    var cardImgseclbl = <AbsoluteLayout>this.page.getViewById("seclbl");

    var cardImgfivelbl = <AbsoluteLayout>this.page.getViewById("fivelbl");
    var cardImgsixlbl = <AbsoluteLayout>this.page.getViewById("sixlbl");
    var cardImgsevenlbl = <AbsoluteLayout>this.page.getViewById("sevenlbl");
    var cardImgeightlbl = <AbsoluteLayout>this.page.getViewById("eightlbl");
    var cardImgninelbl = <AbsoluteLayout>this.page.getViewById("ninelbl");
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
      this.btnActionActive=true;

    },2600)

    var firstcard9= <AbsoluteLayout>this.page.getViewById("firstcard9");
    firstcard9.backgroundImage ="~/app/assets/elephent.jpg";
    
    if(screen.mainScreen.widthDIPs > 360){
      var ninelbl
      ninelbl = <Label>this.page.getViewById("firstcard9");
      ninelbl.backgroundSize = "626px 724px";
      ninelbl.backgroundPosition = "120% 50%";
      console.log("true");
      
    }
    if(screen.mainScreen.widthDIPs <= 360){
      var ninelbl
      ninelbl = <Label>this.page.getViewById("firstcard9");
      ninelbl.backgroundSize = "926px 1024px";
      ninelbl.backgroundPosition = "120% 50%";
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

          if (this.imagesArray[index - 1].image.translateX >= -110 && this.imagesArray[index - 1].image.translateX <= -100 && this.imagesArray[index - 1].image.translateY == -400) {
            this.imagesArray[index - 1].image.translateX = -105
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.firstlblEnable == true) {
              var cardImgfirstlbl= <AbsoluteLayout>this.page.getViewById("firstlbl");

              cardImgfirstlbl.backgroundImage ="~/app/assets/elephent.jpg";
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
          if (this.imagesArray[index - 1].image.translateX <= 100 && this.imagesArray[index - 1].image.translateX >= 95  && this.imagesArray[index - 1].image.translateY >= -400 && this.imagesArray[index - 1].image.translateY <= -390) {
            this.imagesArray[index - 1].image.translateX = 95
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.seclblEnable == true) {
              this.seclblEnable = false
              var cardImgtrlbl= <AbsoluteLayout>this.page.getViewById("trlbl");
              cardImgtrlbl.backgroundImage ="~/app/assets/elephent.jpg";
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
              cardfirstcard1.backgroundImage ="~/app/assets/elephent.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var firstlbl
                firstlbl = <AbsoluteLayout>this.page.getViewById("firstcard1");
                
                firstlbl.backgroungRepeat = 'no-repeat';
                firstlbl.backgroundPosition =  "-30% -10%";
                firstlbl.backgroundSize = "626px 724px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var firstlbl
                firstlbl = <AbsoluteLayout>this.page.getViewById("firstcard1");
                
                firstlbl.backgroungRepeat = 'no-repeat';
                firstlbl.backgroundPosition =  "-30% -15%";
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
          if (this.imagesArray[index - 1].image.translateX <= 100 && this.imagesArray[index - 1].image.translateX >= 95 && this.imagesArray[index - 1].image.translateY >= -200 && this.imagesArray[index - 1].image.translateY <= -190) {
            this.imagesArray[index - 1].image.translateX = 95
            this.imagesArray[index - 1].image.translateY = -200
            args.state = 3
            if (this.trlblEnable == true) {
              this.trlblEnable = false
              var cardImgninelbl= <AbsoluteLayout>this.page.getViewById("ninelbl");
              cardImgninelbl.backgroundImage ="~/app/assets/elephent.jpg";
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
              cardfirstcard2.backgroundImage ="~/app/assets/elephent.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var seclbl
                seclbl = <AbsoluteLayout>this.page.getViewById("firstcard2");
                
                seclbl.backgroungRepeat = 'no-repeat';
                seclbl.backgroundPosition =  "120% -10%";
                seclbl.backgroundSize = "626px 724px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var seclbl
                seclbl = <AbsoluteLayout>this.page.getViewById("firstcard2");
                
                seclbl.backgroungRepeat = 'no-repeat';
                seclbl.backgroundPosition =  "120% -10%";
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
          if ((this.imagesArray[index - 1].image.translateX >= -110 && this.imagesArray[index - 1].image.translateX <= -100) && (this.imagesArray[index - 1].image.translateY >= -200 && this.imagesArray[index - 1].image.translateY <= -190)) {
            this.imagesArray[index - 1].image.translateX = -105
            this.imagesArray[index - 1].image.translateY = -200
            args.state = 3
            if (this.foulblEnable == true) {
              this.foulblEnable = false
              var cardImgsevenlbl= <AbsoluteLayout>this.page.getViewById("sevenlbl");
              cardImgsevenlbl.backgroundImage ="~/app/assets/elephent.jpg";
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
              cardfirstcard3.backgroundImage ="~/app/assets/elephent.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var trdlvl
                trdlvl = <AbsoluteLayout>this.page.getViewById("firstcard3");
                
                trdlvl.backgroungRepeat = 'no-repeat';
                trdlvl.backgroundPosition =  "120% 110%";
                trdlvl.backgroundSize = "626px 724px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var trdlvl
                trdlvl = <AbsoluteLayout>this.page.getViewById("firstcard3");
                
                trdlvl.backgroungRepeat = 'no-repeat';
                trdlvl.backgroundPosition =  "120% 110%";
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
          if ((this.imagesArray[index - 1].image.translateX >= -10 && this.imagesArray[index - 1].image.translateX <= 0) && (this.imagesArray[index - 1].image.translateY == -400)) {
            this.imagesArray[index - 1].image.translateX = -5
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.fivelblEnable == true) {
              this.fivelblEnable = false
              var cardImgseclbl= <AbsoluteLayout>this.page.getViewById("seclbl");
              cardImgseclbl.backgroundImage ="~/app/assets/elephent.jpg";
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
              cardfirstcard4.backgroundImage ="~/app/assets/elephent.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var foulvl
                foulvl = <AbsoluteLayout>this.page.getViewById("firstcard4");
                
                foulvl.backgroungRepeat = 'no-repeat';
                foulvl.backgroundPosition =  "-30% 110%";
                foulvl.backgroundSize = "626px 724px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var foulvl
                foulvl = <AbsoluteLayout>this.page.getViewById("firstcard4");
                
                foulvl.backgroungRepeat = 'no-repeat';
                foulvl.backgroundPosition =  "-30% 110%";
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
          if ((this.imagesArray[index - 1].image.translateX >= -110 && this.imagesArray[index - 1].image.translateX <= -100) && (this.imagesArray[index - 1].image.translateY >= -300 && this.imagesArray[index - 1].image.translateY <= -290)) {
            this.imagesArray[index - 1].image.translateX = -105
            this.imagesArray[index - 1].image.translateY = -300
            args.state = 3
            if (this.sixlblEnable == true) {
              this.sixlblEnable = false
              var cardImgfoulbl= <AbsoluteLayout>this.page.getViewById("foulbl");
              cardImgfoulbl.backgroundImage ="~/app/assets/elephent.jpg";
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
              cardfirstcard5.backgroundImage ="~/app/assets/elephent.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var fivelbl
                fivelbl = <AbsoluteLayout>this.page.getViewById("firstcard5");
                
                fivelbl.backgroungRepeat = 'no-repeat';
                fivelbl.backgroundPosition =  "45% -10%";
                fivelbl.backgroundSize = "626px 724px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var fivelbl
                fivelbl = <AbsoluteLayout>this.page.getViewById("firstcard5");
                
                fivelbl.backgroungRepeat = 'no-repeat';
                fivelbl.backgroundPosition =  "45% -10%";
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
          if ((this.imagesArray[index - 1].image.translateX >= -10 && this.imagesArray[index - 1].image.translateX <= 0) && (this.imagesArray[index - 1].image.translateY >= -200 && this.imagesArray[index - 1].image.translateY <= -190)) {
            this.imagesArray[index - 1].image.translateX = -5
            this.imagesArray[index - 1].image.translateY = -200
            args.state = 3
            if (this.sevenlblEnable == true) {
              this.sevenlblEnable = false
              var cardImgeightlbl= <AbsoluteLayout>this.page.getViewById("eightlbl");
              cardImgeightlbl.backgroundImage ="~/app/assets/elephent.jpg";
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
              cardfirstcard6.backgroundImage ="~/app/assets/elephent.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var sixlbl
                sixlbl = <AbsoluteLayout>this.page.getViewById("firstcard6");
                
                sixlbl.backgroungRepeat = 'no-repeat';
                sixlbl.backgroundPosition =  "-30% 50%";
                sixlbl.backgroundSize = "626px 724px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var sixlbl
                sixlbl = <AbsoluteLayout>this.page.getViewById("firstcard6");
                
                sixlbl.backgroungRepeat = 'no-repeat';
                sixlbl.backgroundPosition =  "-30% 50%";
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
          if ((this.imagesArray[index - 1].image.translateX >=-10 && this.imagesArray[index - 1].image.translateX <= 0) && (this.imagesArray[index - 1].image.translateY >= -300 && this.imagesArray[index - 1].image.translateY <= -290)) {
            this.imagesArray[index - 1].image.translateX = -5
            this.imagesArray[index - 1].image.translateY = -300
            args.state = 3
            if (this.eightlblEnable == true) {
              this.eightlblEnable = false
              var cardImgfivelbl= <AbsoluteLayout>this.page.getViewById("fivelbl");
              cardImgfivelbl.backgroundImage ="~/app/assets/elephent.jpg";
              var cardfirstcard8= <AbsoluteLayout>this.page.getViewById("firstcard8");
              cardfirstcard8.visibility ="hidden";
              cardfirstcard8.opacity=0;
              cardImgfivelbl.borderColor="#65e000";


              var cardfirstcard7= <AbsoluteLayout>this.page.getViewById("firstcard7");
              cardfirstcard7.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard7.backgroundImage ="~/app/assets/elephent.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var sevenlbl
                sevenlbl = <AbsoluteLayout>this.page.getViewById("firstcard7");
                
                sevenlbl.backgroungRepeat = 'no-repeat';
                sevenlbl.backgroundPosition =  "45% 110%";
                sevenlbl.backgroundSize = "626px 724px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var sevenlbl
                sevenlbl = <AbsoluteLayout>this.page.getViewById("firstcard7");
                
                sevenlbl.backgroungRepeat = 'no-repeat';
                sevenlbl.backgroundPosition =  "45% 110%";
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
          if ((this.imagesArray[index - 1].image.translateX <= 100 && this.imagesArray[index - 1].image.translateX >= 95) && (this.imagesArray[index - 1].image.translateY >= -300 && this.imagesArray[index - 1].image.translateY <= -290)) {
            this.imagesArray[index - 1].image.translateX = 95
            this.imagesArray[index - 1].image.translateY = -300
            args.state = 3
            if (this.ninelblEnable == true) {
              this.ninelblEnable = false
              var cardImgsixlbl= <AbsoluteLayout>this.page.getViewById("sixlbl");
              cardImgsixlbl.backgroundImage ="~/app/assets/elephent.jpg";
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
              cardfirstcard8.backgroundImage ="~/app/assets/elephent.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var eightlbl
                eightlbl = <AbsoluteLayout>this.page.getViewById("firstcard8");
                
                eightlbl.backgroungRepeat = 'no-repeat';
                eightlbl.backgroundPosition = "45% 50%";
                eightlbl.backgroundSize = "626px 724px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var eightlbl
                eightlbl = <AbsoluteLayout>this.page.getViewById("firstcard8");
                
                eightlbl.backgroungRepeat = 'no-repeat';
                eightlbl.backgroundPosition = "45% 50%";
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




      }
    }
    else if (args.state === 3) // up
    {

      this.imagesArray[index - 1].image.scaleX = 1
      this.imagesArray[index - 1].image.scaleY = 1

    } else { }

    if (this.scorecounter == 45 && this.firstlblEnable == false) {
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
          if (this.wordArray[index - 1].lbl.translateY <= -200) {
            this.wordArray[index - 1].lbl.translateY = -200
          }
          if (this.wordArray[index - 1].lbl.translateY >= 100) {
            this.wordArray[index - 1].lbl.translateY = 100
          }
      }
      else{
        if(index == 2 ){
          if (this.wordArray[index - 1].lbl.translateX <= -150) {
            this.wordArray[index - 1].lbl.translateX = -150
          }
          if (this.wordArray[index - 1].lbl.translateX >= 130) {
            this.wordArray[index - 1].lbl.translateX = 130
          }
          if (this.wordArray[index - 1].lbl.translateY <= -250) {
            this.wordArray[index - 1].lbl.translateY = -250
          }
          if (this.wordArray[index - 1].lbl.translateY >= 100) {
            this.wordArray[index - 1].lbl.translateY = 100
          }
        }
        else{
        if (this.wordArray[index - 1].lbl.translateX <= -230) {
            this.wordArray[index - 1].lbl.translateX = -230
          }
          if (this.wordArray[index - 1].lbl.translateX >= 13) {
            this.wordArray[index - 1].lbl.translateX = 13
          }
          if (this.wordArray[index - 1].lbl.translateY <= -200) {
            this.wordArray[index - 1].lbl.translateY = -200
          }
          if (this.wordArray[index - 1].lbl.translateY >= 100) {
            this.wordArray[index - 1].lbl.translateY = 100
          }
        }
      }

      switch (index) {
        case 3:
            
          if (this.wordArray[index - 1].lbl.translateX >= -195 && this.wordArray[index - 1].lbl.translateX <= -175 &&  this.wordArray[index - 1].lbl.translateY >= -150&&  this.wordArray[index - 1].lbl.translateY <= -140) {
            this.wordArray[index - 1].lbl.translateX = -185
            this.wordArray[index - 1].lbl.translateY = -150
            args.state = 3
            if (this.trdWordlblEnable == true) {
              this.trdWordlblEnable = false
              setTimeout(() => {
                console.log(this.wordArray[index - 1].isEnable);
                this.wordArray[index - 1].lbl.scaleX = 1
                this.wordArray[index - 1].lbl.scaleY = 1
                this.scorecounter += 3
                this.navigatorFunc();
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


  }

  navigatorFunc(){
    console.log(this.level_Position.length);
    console.log(this.level_Position);
   if(this.level_Position.includes("level2_1")){
    
   }
   else{
    this.level_Position.push("level2_1")
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
        this.router.navigate(["/puzzels2/level2two"], {

        });
  });
}

back(){
  console.log("back press");
  this.router.navigate(["/main"]);
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

