import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList
} from "@angular/core";
import {
  PanGestureEventData
} from "tns-core-modules/ui/gestures";
import * as dialogs from "tns-core-modules/ui/dialogs";
import {
  Image
} from "tns-core-modules/ui/image";
import {
  Label
} from "tns-core-modules/ui/label"
import {
  Page
} from 'tns-core-modules/ui/page';
import {
  RouterExtensions
} from '@nativescript/angular/router';
import { getString, setString } from "tns-core-modules/application-settings";
import { NavigationExtras } from "@angular/router"

import { ActivatedRoute } from "@angular/router";
const firebase = require("nativescript-plugin-firebase");
const firebaseAPI = require("nativescript-plugin-firebase/app");
@Component({
  selector: 'ns-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.css']
})
export class LevelComponent implements OnInit, AfterViewInit {
  public imagesArray;
  @ViewChildren('ref', { read: ElementRef }) elements: QueryList<ElementRef>;

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


  constructor(private page: Page, private router: RouterExtensions, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    firebase.getCurrentUser()
    .then(result => {
        const usersCollection = firebaseAPI.firestore().collection("Users");
        usersCollection.doc(result.uid).get().then(user=>{
                this.name = user.data().name
                this.image = user.data().image
                this.level = user.data().level||1
                this.score = user.data().score||0
        })
    })
    this.imagesArray = new Array(4);

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
        prevX: 150,
        prevY: 400
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
      if (this.imagesArray[index - 1].image.translateX <= -100) {
        this.imagesArray[index - 1].image.translateX = -100
      }
      if (this.imagesArray[index - 1].image.translateX >= 125) {
        this.imagesArray[index - 1].image.translateX = 125
      }
      if (this.imagesArray[index - 1].image.translateY <= -400) {
        this.imagesArray[index - 1].image.translateY = -400
      }
      if (this.imagesArray[index - 1].image.translateY >= -7) {
        this.imagesArray[index - 1].image.translateY = -7
      }
      switch (index) {
        case 1:

          if (this.imagesArray[index - 1].image.translateX >= -85 && this.imagesArray[index - 1].image.translateX <= -75 && this.imagesArray[index - 1].image.translateY == -400) {
            this.imagesArray[index - 1].image.translateX = -85
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.firstlblEnable == true) {
              this.firstlblEnable = false
              this.score += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.imagesArray[index - 1].isEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 2:
          if (this.imagesArray[index - 1].image.translateX == 125 && this.imagesArray[index - 1].image.translateY == -400) {
            this.imagesArray[index - 1].image.translateX = 125
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.seclblEnable == true) {
              this.seclblEnable = false
              this.score += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.seclblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }

          }
        case 3:
          if (this.imagesArray[index - 1].image.translateX == 125 && this.imagesArray[index - 1].image.translateY >= -200 && this.imagesArray[index - 1].image.translateY <= -190) {
            this.imagesArray[index - 1].image.translateX = 125
            this.imagesArray[index - 1].image.translateY = -200
            args.state = 3
            if (this.trlblEnable == true) {
              this.trlblEnable = false
              this.score += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.trlblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1

            }
          }
        case 4:
          if ((this.imagesArray[index - 1].image.translateX >= -85 && this.imagesArray[index - 1].image.translateX <= -75) && (this.imagesArray[index - 1].image.translateY >= -200 && this.imagesArray[index - 1].image.translateY <= -190)) {
            this.imagesArray[index - 1].image.translateX = -85
            this.imagesArray[index - 1].image.translateY = -200
            args.state = 3
            if (this.foulblEnable == true) {
              this.foulblEnable = false
              this.score += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.foulblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 5:
          if ((this.imagesArray[index - 1].image.translateX >= 20 && this.imagesArray[index - 1].image.translateX <= 30) && (this.imagesArray[index - 1].image.translateY == -400)) {
            this.imagesArray[index - 1].image.translateX = 20
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.fivelblEnable == true) {
              this.fivelblEnable = false
              this.score += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.fivelblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 6:
          if ((this.imagesArray[index - 1].image.translateX >= -85 && this.imagesArray[index - 1].image.translateX <= -75) && (this.imagesArray[index - 1].image.translateY >= -300 && this.imagesArray[index - 1].image.translateY <= -290)) {
            this.imagesArray[index - 1].image.translateX = -85
            this.imagesArray[index - 1].image.translateY = -300
            args.state = 3
            if (this.sixlblEnable == true) {
              this.sixlblEnable = false
              this.score += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.sixlblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 7:
          if ((this.imagesArray[index - 1].image.translateX >= 20 && this.imagesArray[index - 1].image.translateX <= 30) && (this.imagesArray[index - 1].image.translateY >= -200 && this.imagesArray[index - 1].image.translateY <= -190)) {
            this.imagesArray[index - 1].image.translateX = 20
            this.imagesArray[index - 1].image.translateY = -200
            args.state = 3
            if (this.sevenlblEnable == true) {
              this.sevenlblEnable = false
              this.score += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.sevenlblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 8:
          if ((this.imagesArray[index - 1].image.translateX >= 20 && this.imagesArray[index - 1].image.translateX <= 30) && (this.imagesArray[index - 1].image.translateY >= -300 && this.imagesArray[index - 1].image.translateY <= -290)) {
            this.imagesArray[index - 1].image.translateX = 20
            this.imagesArray[index - 1].image.translateY = -300
            args.state = 3
            if (this.eightlblEnable == true) {
              this.eightlblEnable = false
            
              this.score += 5
              console.log("sroce =" + this.scorecounter);
              console.log(this.eightlblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 9:
          if ((this.imagesArray[index - 1].image.translateX <= 125 && this.imagesArray[index - 1].image.translateX >= 115) && (this.imagesArray[index - 1].image.translateY >= -300 && this.imagesArray[index - 1].image.translateY <= -290)) {
            this.imagesArray[index - 1].image.translateX = 125
            this.imagesArray[index - 1].image.translateY = -300
            args.state = 3
            if (this.ninelblEnable == true) {
              this.ninelblEnable = false
             
              this.score += 5
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

    if (this.score == 67 && this.firstlblEnable == false) {
      let animal = ""
      this.dialogMessage(animal)
    }

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

