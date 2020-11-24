import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList,
  ViewContainerRef,
  ViewEncapsulation
} from "@angular/core";


import { Label } from "tns-core-modules//ui/label";
import { ActivatedRoute, NavigationExtras } from "@angular/router"
import { ModalInterface } from "./modalInterface"
import { Page } from 'tns-core-modules/ui/page';
import { StackLayout } from "tns-core-modules/ui";
import {
  PanGestureEventData
} from "tns-core-modules/ui/gestures";
import { CardView } from "nativescript-cardview"
import { ModalDialogService, RouterExtensions } from "@nativescript/angular";
import { Frame } from "tns-core-modules/ui/frame";
import { ModalDialogParams } from "@nativescript/angular/modal-dialog";

const firebase = require("nativescript-plugin-firebase");
const firebaseAPI = require("nativescript-plugin-firebase/app");


@Component({
  selector: 'my-modal',
  templateUrl: './app.modal.html',
  styleUrls: ['./app.modal.css'],
  providers:[{ provide: ModalDialogParams, useValue: {} },ModalDialogService]
})
export class ModalComponent  {
  public prompt: string;
  public wordArray;
  public firstWordlblEnable: boolean
  public secWordlblEnable: boolean
  public scorecounter: number = 0
  public name: string
  public image: string
  public level: number
  public score: number
  public flag: boolean
  public stk;
  //private params: ModalDialogParams;
  
  @ViewChildren('ref', { read: ElementRef }) elements: QueryList<ElementRef>;
  
  constructor(private params: ModalDialogParams , private router: RouterExtensions,private page: Page) {
   

}

onBack(): void {
  this.router.back();
}
onClose(): void {
  this.params.closeCallback("return value");
}
  

  ngOnInit(): void {
    firebase.getCurrentUser()
      .then(result => {
        //console.log("main\n" + result.uid);
        const usersCollection = firebaseAPI.firestore().collection("Users");
        usersCollection.doc(result.uid).get().then(user => {
          //console.log("main\n" + result);
          this.name = user.data().name
          this.image = user.data().image
          this.level = user.data().level || 1
          this.score = user.data().score || 0
        })

      })
    this.wordArray = new Array(2);
    this.firstWordlblEnable = true;
    this.secWordlblEnable = true;

  }

  ngAfterViewInit() {
    console.log(this.elements.length);
    console.log(this.wordArray.length);
    let i = 0
    this.elements.forEach(e => {
      //console.log(e);

      let lbl = <Label>e.nativeElement;
      lbl.translateX = 0
      lbl.translateY = 0
      lbl.scaleX = 1
      lbl.scaleY = 1
      this.wordArray[i++] = {
        elem: e,
        image: lbl,
        isEnable: true,
      }
    })
  }


  onPan5(index: number, args: PanGestureEventData) {
    this.flag = true
    /*console.log(index);
    console.log(this.wordArray[index - 1]);*/
    console.log("Pana" + index + ": [" + this.wordArray[index - 1].image.translateX + ", " + this.wordArray[index - 1].image.translateY + "] state: " + args.state);
    if (args.state === 1) // down
    {
      this.wordArray[index - 1].prevX = args.deltaX;
      this.wordArray[index - 1].prevY = args.deltaY;
      this.wordArray[index - 1].image.scaleX = 1
      this.wordArray[index - 1].image.scaleY = 1
    } else if (args.state === 2) // panning
    {
      this.wordArray[index - 1].image.scaleX = 1.1
      this.wordArray[index - 1].image.scaleY = 1.1
      this.wordArray[index - 1].image.translateX += args.deltaX - this.wordArray[index - 1].prevX;
      this.wordArray[index - 1].image.translateY += args.deltaY - this.wordArray[index - 1].prevY;
      this.wordArray[index - 1].prevX = args.deltaX;
      this.wordArray[index - 1].prevY = args.deltaY;
      if (index == 1) {
        if (this.wordArray[index - 1].image.translateX <= -30) {
          this.wordArray[index - 1].image.translateX = -30
        }
        if (this.wordArray[index - 1].image.translateX >= 220) {
          this.wordArray[index - 1].image.translateX = 220
        }
        if (this.wordArray[index - 1].image.translateY <= -200) {
          this.wordArray[index - 1].image.translateY = -200
        }
        if (this.wordArray[index - 1].image.translateY >= 100) {
          this.wordArray[index - 1].image.translateY = 100
        }
      }
      else {
        if (this.wordArray[index - 1].image.translateX <= -230) {
          this.wordArray[index - 1].image.translateX = -230
        }
        if (this.wordArray[index - 1].image.translateX >= 51) {
          this.wordArray[index - 1].image.translateX = 51
        }
        if (this.wordArray[index - 1].image.translateY <= -200) {
          this.wordArray[index - 1].image.translateY = -200
        }
        if (this.wordArray[index - 1].image.translateY >= 100) {
          this.wordArray[index - 1].image.translateY = 100
        }
      }

      switch (index) {
        case 1:

          if (this.wordArray[index - 1].image.translateX >= 25 && this.wordArray[index - 1].image.translateX <= 40 && this.wordArray[index - 1].image.translateY >= -150 && this.wordArray[index - 1].image.translateY <= -140) {
            this.wordArray[index - 1].image.translateX = 31
            this.wordArray[index - 1].image.translateY = -150
            args.state = 3
            if (this.firstWordlblEnable == true) {
              this.firstWordlblEnable = false
              console.log(this.wordArray[index - 1].isEnable);
              this.wordArray[index - 1].image.scaleX = 1
              this.wordArray[index - 1].image.scaleY = 1



            }
          }

      }
    }
    else if (args.state === 3) // up
    {

      this.wordArray[index - 1].image.scaleX = 1
      this.wordArray[index - 1].image.scaleY = 1
    } else { }

    if (this.firstWordlblEnable == false) {
      this.scorecounter += 10
      this.score = this.scorecounter

      this.nextlevel();
    }
  }

  onClickbtn(){
    this.params.closeCallback();
    this.router.navigate(["/puzzels/level2"]);
  }
  nextlevel() {

    console.log("TRUE");

    console.log("shay");
    
    let stk: StackLayout = <StackLayout>this.page.getViewById('stk');
    let stk2= document.getElementById('modal-container');
    stk2.style.display = 'none';
    
    console.log();
     
    stk.width=0
    //this.onBack();
    this.router.navigate(["/puzzels/level2"]);
    
    /*firebase.getCurrentUser()
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
        
      })

      .catch(error => console.log("Trouble in paradise: " + error))*/

  }



}