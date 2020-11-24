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

  Page, ShowModalOptions
} from 'tns-core-modules/ui/page';
import {
  RouterExtensions
} from '@nativescript/angular/router';
import { ActivatedRoute } from "@angular/router";
import { getString } from "tns-core-modules/application-settings";
import { NavigationExtras } from "@angular/router"
import { ModalDialogService, ModalDialogParams, ModalDialogOptions } from "@nativescript/angular/modal-dialog";
import { ModalComponent } from "./app.modal"
import { ExtendedShowModalOptions, ModalStack, overrideModalViewMethod } from "nativescript-windowed-modal"
import { registerElement } from "@nativescript/angular";
import { AbsoluteLayout } from "tns-core-modules/ui";
//overrideModalViewMethod()
//registerElement("ModalStack", () => ModalStack)
const firebase = require("nativescript-plugin-firebase");
const firebaseAPI = require("nativescript-plugin-firebase/app");


@Component({
  selector: 'ns-level1',
  templateUrl: './level1.component.html',
  styleUrls: ['./level1.component.css'],
  providers:[ModalDialogService]
})
export class Level1Component implements OnInit, AfterViewInit {
  public imagesArray;
 
  @ViewChildren('ref', { read: ElementRef }) elements: QueryList<ElementRef>;
  
  public isVisible: boolean = true;
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
  
  public wordArray;
  public firstWordlblEnable: boolean
  public secWordlblEnable: boolean

  




  constructor(private page: Page, private router: RouterExtensions, private route: ActivatedRoute) {
    

  }

  ngOnInit(): void {
    
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

  }


  onPan5(index: number, args: PanGestureEventData) {
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
              this.firstlblEnable = false
              this.scorecounter += 3
              this.score = this.scorecounter
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
              this.seclblEnable = false
              this.scorecounter += 3
              this.score = this.scorecounter
              console.log("sroce =" + this.scorecounter);
              console.log(this.seclblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }

          }
        case 3:
          if (this.imagesArray[index - 1].image.translateX <= 95 && this.imagesArray[index - 1].image.translateX >= 85 && this.imagesArray[index - 1].image.translateY >= -200 && this.imagesArray[index - 1].image.translateY <= -190) {
            this.imagesArray[index - 1].image.translateX = 95
            this.imagesArray[index - 1].image.translateY = -200
            args.state = 3
            if (this.trlblEnable == true) {
              this.trlblEnable = false
              this.scorecounter += 3
              this.score = this.scorecounter
              console.log("sroce =" + this.scorecounter);
              console.log(this.trlblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1

            }
          }
        case 4:
          if ((this.imagesArray[index - 1].image.translateX >= -55 && this.imagesArray[index - 1].image.translateX <= -45) && (this.imagesArray[index - 1].image.translateY >= -200 && this.imagesArray[index - 1].image.translateY <= -190)) {
            this.imagesArray[index - 1].image.translateX = -55
            this.imagesArray[index - 1].image.translateY = -200
            args.state = 3
            if (this.foulblEnable == true) {
              this.foulblEnable = false
              this.scorecounter += 3
              this.score = this.scorecounter
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
      //this.dialogMessage(animal);
      this.isVisible = !this.isVisible;
      this.firstWordlblEnable = true;
      this.secWordlblEnable = true;

      //this.dialogMessage(animal)
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
          if (this.wordArray[index - 1].lbl.translateX >= 220) {
            this.wordArray[index - 1].lbl.translateX = 220
          }
          if (this.wordArray[index - 1].lbl.translateY <= -200) {
            this.wordArray[index - 1].lbl.translateY = -200
          }
          if (this.wordArray[index - 1].lbl.translateY >= 100) {
            this.wordArray[index - 1].lbl.translateY = 100
          }
      }
      else{
        if (this.wordArray[index - 1].lbl.translateX <= -230) {
            this.wordArray[index - 1].lbl.translateX = -230
          }
          if (this.wordArray[index - 1].lbl.translateX >= 51) {
            this.wordArray[index - 1].lbl.translateX = 51
          }
          if (this.wordArray[index - 1].lbl.translateY <= -200) {
            this.wordArray[index - 1].lbl.translateY = -200
          }
          if (this.wordArray[index - 1].lbl.translateY >= 100) {
            this.wordArray[index - 1].lbl.translateY = 100
          }
      }

      switch (index) {
        case 1:
            
          if (this.wordArray[index - 1].lbl.translateX >= 25 && this.wordArray[index - 1].lbl.translateX <= 40 &&  this.wordArray[index - 1].lbl.translateY >= -150&&  this.wordArray[index - 1].lbl.translateY <= -140) {
            this.wordArray[index - 1].lbl.translateX = 31
            this.wordArray[index - 1].lbl.translateY = -150
            args.state = 3
            if (this.firstWordlblEnable == true) {
              this.firstWordlblEnable = false
              console.log(this.wordArray[index - 1].isEnable);
              this.wordArray[index - 1].lbl.scaleX = 1
              this.wordArray[index - 1].lbl.scaleY = 1
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


  dialogMessage(animal) {
    dialogs.action({
      message: "Witch animal is on the picture?",
      actions: ["Monkey", "Giraffe", "Zebra"]
    }).then(result => {
      console.log("Dialog result: " + result);
      if (result == "Monkey") {
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
            this.router.navigate(["/puzzels/level2"]);


            //setString("score",""+this.score)

            
          })
          .catch(error => console.log("Trouble in paradise: " + error))

      }
      if (result == "Zebra" || result == "Giraffe") {
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
  /*public showModal2() {
    let options: ModalDialogOptions = {
      context: { promptMsg: "This is the prompt message!" },
      viewContainerRef: this.vcRef,
      fullscreen: false,
      animated: true,
      stretched: false,
      
    };

    this.modal.showModal(ModalComponent, options).then((response) => {
      console.log("response " + response);
      
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
        this.router.navigate(["/puzzels/level2"], {
          queryParams: response,

        });
        

      }).catch(error => console.log("Trouble in paradise: " + error))


    });

  }*/


}
