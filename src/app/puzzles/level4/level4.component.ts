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
import * as application from "tns-core-modules/application";
import * as enums from "tns-core-modules/ui/enums";

import { ExtendedShowModalOptions, ModalStack, overrideModalViewMethod } from "nativescript-windowed-modal"
import { registerElement } from "@nativescript/angular";
import { AbsoluteLayout } from "tns-core-modules/ui";
//overrideModalViewMethod()
//registerElement("ModalStack", () => ModalStack)
const firebase = require("nativescript-plugin-firebase");
const firebaseAPI = require("nativescript-plugin-firebase/app");
var orientation = require('nativescript-orientation');
orientation.disableRotation();


@Component({
  selector: 'ns-level4',
  templateUrl: './level4.component.html',
  styleUrls: ['./level4.component.css']
})
export class Level4Component implements OnInit {

  public imagesArray;
  
  public wordArray;
  public isVisible: boolean;
  public level_Position: any
  @ViewChildren('ref', { read: ElementRef }) elements: QueryList<ElementRef>;
  
  
  @ViewChildren('word', { read: ElementRef }) words: QueryList<ElementRef>;
  public progressvalue: number = 0
  public firstlblEnable: boolean
  public seclblEnable: boolean
  public trlblEnable: boolean
  public foulblEnable: boolean
  public scorecounter: number = 0
  public name: string
  public image: string
  public level: number
  public score: number
  
  public firstWordlblEnable: boolean
  public secWordlblEnable: boolean
  public trdWordlblEnable:boolean
  public forWordlblEnable:boolean
  public btnActionActive: boolean =false;


  




  constructor(private page: Page, private router: RouterExtensions, private route: ActivatedRoute) {
    this.page.on(application.AndroidApplication.activityBackPressedEvent, this.onBackButtonTap, this);


  }
  onBackButtonTap(data: EventData) {
      
          this.router.navigate(['/puzzels/level4']);
     
  }

  ngOnInit(): void {



    var firstcard4= <AbsoluteLayout>this.page.getViewById("firstcard4");
    firstcard4.backgroundImage ="~/app/assets/lion.jpg";
    console.log(`screen.mainScreen.widthDIPs ${screen.mainScreen.widthDIPs}`);
    if(screen.mainScreen.widthDIPs > 360){
      var foulbl
      foulbl = <AbsoluteLayout>this.page.getViewById("firstcard4");
      
      foulbl.backgroundPosition = "35% 150%";
      foulbl.backgroundSize = "1280px 800px"
      console.log("true");
      
    }
    if(screen.mainScreen.widthDIPs <= 360){
      var foulbl
      foulbl = <AbsoluteLayout>this.page.getViewById("firstcard4");
      foulbl.backgroundSize = "1000px 1100px";

      foulbl.backgroundPosition = "125% 220%";
      console.log("true");
      
    }

      var myAbsoluteLayout;

    firebase.getCurrentUser()
      .then(result => {
        //console.log("main\n" +result.uid);
        const usersCollection = firebaseAPI.firestore().collection("Users");
        usersCollection.doc(result.uid).get().then(user => {
          //console.log("main\n" +result);
          this.name = user.data().name
          this.image = user.data().image
          this.level = user.data().level || 1
          this.score = user.data().score || 0
          this.level_Position = user.data().levelPosition
        })

      })
    this.imagesArray = new Array(4);

    this.firstlblEnable = true;
    this.seclblEnable = true;
    this.trlblEnable = true;
    this.foulblEnable = true;
    let state = 0
    this.wordArray = new Array(2);        
    this.firstWordlblEnable = true;
    this.secWordlblEnable = true;
    this.trdWordlblEnable = true;
    this.forWordlblEnable =true;

  }


  ngAfterViewInit() {

    console.log('test')
    console.log(this.elements.length);
    console.log(this.imagesArray.length);
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
        prevX: 75,
        prevY: 400
      }
    })
    
    
    console.log(this.words.length);
    console.log(this.wordArray.length);
    let j = 0
    
    this.words.forEach(e2 => {
      console.log(e2);
      let lbl = <Label>e2.nativeElement;
      lbl.translateX = 0
      lbl.translateY = 0
      lbl.scaleX = 1
      lbl.scaleY = 1
      this.wordArray[j++] = {
        elem: e2,
        lbl: lbl,
        isEnable: true,

        
      }
    })
    var cardImgfoulbl= <AbsoluteLayout>this.page.getViewById("foulbl");
    var cardImgtrlbl = <AbsoluteLayout>this.page.getViewById("trlbl");
    var cardImgfirstlbl = <AbsoluteLayout>this.page.getViewById("firstlbl");
    var cardImgseclbl = <AbsoluteLayout>this.page.getViewById("seclbl");
    
      
      cardImgfoulbl.background= "black";
  
      cardImgtrlbl.background= "black";
  
      cardImgfirstlbl.background= "black";
  
      cardImgseclbl.background= "black";
  
        setTimeout(()=>{
          
            //cardImgfoulbl.background= "white";
            cardImgfoulbl.backgroundImage= "black";
            
            //cardImgtrlbl.background= "white";
            cardImgtrlbl.backgroundImage= "white";
        
            //cardImgfirstlbl.background= "white";
            cardImgfirstlbl.backgroundImage= "white";
        
            //cardImgseclbl.background= "white";
            cardImgseclbl.backgroundImage= "white";
            this.btnActionActive=true;

        },2200)

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
      if (this.imagesArray[index - 1].image.translateX <= -75) {
        this.imagesArray[index - 1].image.translateX = -75
      }
      if (this.imagesArray[index - 1].image.translateX >= 110) {
        this.imagesArray[index - 1].image.translateX = 110
      }
      if (this.imagesArray[index - 1].image.translateY <= -400) {
        this.imagesArray[index - 1].image.translateY = -400
      }
      if (this.imagesArray[index - 1].image.translateY >= -7) {
        this.imagesArray[index - 1].image.translateY = -7
      }
      switch (index) {
        case 1:
          if (this.imagesArray[index - 1].image.translateX >= -55 && this.imagesArray[index - 1].image.translateX >= -45 && this.imagesArray[index - 1].image.translateY == -400) {
            this.imagesArray[index - 1].image.translateX = -55
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.firstlblEnable == true) {
              var cardImgfirstlbl= <AbsoluteLayout>this.page.getViewById("firstlbl");

              cardImgfirstlbl.backgroundImage ="~/app/assets/lion.jpg";
              var cardfirstcard12= <AbsoluteLayout>this.page.getViewById("firstcard1");
              cardfirstcard12.visibility ="hidden";
              cardfirstcard12.opacity =0;
              cardImgfirstlbl.borderColor="#65e000";

              this.firstlblEnable = false
              this.scorecounter += 3
              console.log("sroce =" + this.scorecounter);
              console.log(this.imagesArray[index - 1].isEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 2:
          if (this.imagesArray[index - 1].image.translateX <= 95 && this.imagesArray[index - 1].image.translateX >= 85 && this.imagesArray[index - 1].image.translateY == -400) {
            this.imagesArray[index - 1].image.translateX = 95
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.seclblEnable == true) {
              var cardImgseclbl= <Label>this.page.getViewById("seclbl");

              cardImgseclbl.backgroundImage ="~/app/assets/lion.jpg";
              var cardfirstcard2= <Label>this.page.getViewById("firstcard2");
              cardfirstcard2.visibility ="hidden";
              cardfirstcard2.opacity =0;
              cardImgseclbl.borderColor="#65e000";

              var cardfirstcard1= <Label>this.page.getViewById("firstcard1");
              cardfirstcard1.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard1.backgroundImage ="~/app/assets/lion.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var firstlbl
                firstlbl = <AbsoluteLayout>this.page.getViewById("firstcard1");
                
                firstlbl.backgroungRepeat = 'no-repeat';
                firstlbl.backgroundPosition = "35% -40% ";
                firstlbl.backgroundSize = "1280px 800px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var firstlbl
                firstlbl = <AbsoluteLayout>this.page.getViewById("firstcard1");
                firstlbl.backgroungRepeat = 'no-repeat';
                firstlbl.backgroundPosition = "-25% -45%";
                firstlbl.backgroundSize = "1000px 1100px";

                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard1.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard1.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.seclblEnable = false
              this.scorecounter += 3
              console.log("sroce =" + this.scorecounter);
              console.log(this.seclblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }

          }
        case 3:
          if ((this.imagesArray[index - 1].image.translateX >= -55 && this.imagesArray[index - 1].image.translateX <= -45) && (this.imagesArray[index - 1].image.translateY >= -200 && this.imagesArray[index - 1].image.translateY <= -190)) {
            this.imagesArray[index - 1].image.translateX = -55
            this.imagesArray[index - 1].image.translateY = -200

            args.state = 3
            if (this.trlblEnable == true) {
              var cardImgtrlbl= <Label>this.page.getViewById("foulbl");

              cardImgtrlbl.backgroundImage ="~/app/assets/lion.jpg";
              var cardfirstcard3= <Label>this.page.getViewById("firstcard3");
              cardfirstcard3.opacity =0;
              cardfirstcard3.visibility ="hidden";
              cardImgtrlbl.borderColor="#65e000";

              this.trlblEnable = false
              var cardfirstcard2= <Label>this.page.getViewById("firstcard2");
              cardfirstcard2.animate({
                rotate: 360,
                duration: 1000,

                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard2.backgroundImage ="~/app/assets/lion.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var seclbl
                seclbl = <AbsoluteLayout>this.page.getViewById("firstcard2");
                
                seclbl.backgroungRepeat = 'no-repeat';
                seclbl.backgroundPosition = "80% -40%";
                seclbl.backgroundSize = "1280px 800px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var seclbl
                seclbl = <AbsoluteLayout>this.page.getViewById("firstcard2");
                seclbl.backgroungRepeat = 'no-repeat';
                seclbl.backgroundPosition = "125% -45%";
                seclbl.backgroundSize = "1000px 1100px";

                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard2.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard2.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.scorecounter += 3
              console.log("sroce =" + this.scorecounter);
              console.log(this.trlblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1

            }
          }
        case 4:
          if (this.imagesArray[index - 1].image.translateX <= 95 && this.imagesArray[index - 1].image.translateX >= 85 && this.imagesArray[index - 1].image.translateY >= -200 && this.imagesArray[index - 1].image.translateY <= -190) {
            this.imagesArray[index - 1].image.translateX = 95
            this.imagesArray[index - 1].image.translateY = -200
            args.state = 3
            if (this.foulblEnable == true) {
              var cardImgfoulbl= <Label>this.page.getViewById("trlbl");
              cardImgfoulbl.backgroundImage ="~/app/assets/lion.jpg";
              var cardfirstcard4= <Label>this.page.getViewById("firstcard4");
              cardfirstcard4.visibility ="hidden";
              cardfirstcard4.opacity=0;
              cardImgfoulbl.borderColor="#65e000";

              var cardfirstcard3= <Label>this.page.getViewById("firstcard3");
              cardfirstcard3.animate({
                rotate: 360,
                duration: 1000,
                
                iterations: 1,
                curve: enums.AnimationCurve.easeInOut
            }).then(() => {
              cardfirstcard3.backgroundImage ="~/app/assets/lion.jpg";
              if(screen.mainScreen.widthDIPs > 360){
                var trlbl
                trlbl = <AbsoluteLayout>this.page.getViewById("firstcard3");
                
                trlbl.backgroungRepeat = 'no-repeat';
                trlbl.backgroundPosition = "80% 150%";
                trlbl.backgroundSize = "1280px 800px";
                
                console.log("true");
                
              }
              if(screen.mainScreen.widthDIPs <= 360){
                var trlbl
                trlbl = <AbsoluteLayout>this.page.getViewById("firstcard3");
                trlbl.backgroungRepeat = 'no-repeat';
                trlbl.backgroundPosition = "-25% 220%";
                trlbl.backgroundSize = "1000px 1100px";
                console.log("true");
                
              }
                console.log("Animation finished.");
            })   .then(function () { return cardfirstcard3.animate({ scale: { x: 3, y: 3 } }); })
            .then(function () { return cardfirstcard3.animate({ scale: { x: 1, y: 1 } }); }).catch((e) => {
                console.log(e.message);
            });
              this.foulblEnable = false
              this.scorecounter += 3
              console.log("sroce =" + this.scorecounter);
              console.log(this.foulblEnable);
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

    if (this.scorecounter == 12 && this.firstlblEnable == false) {
      let animal = ""
      var myAbsoluteLayout;
      this.score += this.scorecounter;
      myAbsoluteLayout = <AbsoluteLayout>this.page.getViewById("stk");
      setTimeout(() => {
        setInterval(() => {
          myAbsoluteLayout.opacity +=0.25;
      }, 100);
      }, 1000);


      this.firstWordlblEnable = true;
      this.secWordlblEnable = true;

      //this.dialogMessage(animal)
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
        if(index == 4){
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
        if(index==3){
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
      }

      switch (index) {
        case 2:
            
          if (this.wordArray[index - 1].lbl.translateX >= 10 && this.wordArray[index - 1].lbl.translateX <= 20 &&  this.wordArray[index - 1].lbl.translateY >= -200&&  this.wordArray[index - 1].lbl.translateY <= -190) {
            
            this.wordArray[index - 1].lbl.translateX = 13
            this.wordArray[index - 1].lbl.translateY = -200
            args.state = 3
            
            if (this.secWordlblEnable == true) {
              this.secWordlblEnable = false
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
  back(){
    console.log("back press");
    this.router.navigate(["/main"]);
    this.isVisible = false;
}

  navigatorFunc(){
    console.log(this.level_Position.length);
    console.log(this.level_Position);
   if(this.level_Position.includes("level1_4")){
    
   }
   else{
    this.level_Position.push("level1_4")
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
        });
        this.router.navigate(["/main"], {

        });
  });
}

}
