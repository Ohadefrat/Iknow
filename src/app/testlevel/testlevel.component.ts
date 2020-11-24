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
@Component({
  selector: 'ns-testlevel',
  templateUrl: './testlevel.component.html',
  styleUrls: ['./testlevel.component.css']
})
export class TestlevelComponent implements OnInit, AfterViewInit {
  public imagesArray;
  @ViewChildren('ref', { read: ElementRef }) elements: QueryList<ElementRef>;

  @ViewChild("dragImage", {
    static: true
  }) dragImage: ElementRef;
  dragImageItem: Image;
  prevDeltaX: number;
  prevDeltaY: number;
  @ViewChild("dragImage1", {
    static: true
  }) dragImage1: ElementRef;
  dragImageItem1: Image;
  prevDeltaX1: number;
  prevDeltaY1: number;
  @ViewChild("dragImage2", {
    static: true
  }) dragImage2: ElementRef;
  dragImageItem2: Image;
  prevDeltaX2: number;
  prevDeltaY2: number;
  @ViewChild("dragImage3", {
    static: true
  }) dragImage3: ElementRef;
  dragImageItem3: Image;
  prevDeltaX3: number;
  prevDeltaY3: number;
  public progressvalue: number = 0
  public firstlblEnable: boolean
  public seclblEnable: boolean
  public trlblEnable: boolean
  public foulblEnable: boolean
  public scorecounter: number = 0


  constructor(private page: Page, private router: RouterExtensions) {

  }

  ngOnInit(): void {

    this.imagesArray = new Array(4);


    this.dragImageItem = <Image>this.dragImage.nativeElement;
    this.dragImageItem.translateX = 0;
    this.dragImageItem.translateY = 0;
    this.dragImageItem.scaleX = 1;
    this.dragImageItem.scaleY = 1
    this.dragImageItem1 = <Image>this.dragImage1.nativeElement;
    this.dragImageItem1.translateX = 0;
    this.dragImageItem1.translateY = 0;
    this.dragImageItem1.scaleX = 1;
    this.dragImageItem1.scaleY = 1
    this.dragImageItem2 = <Image>this.dragImage2.nativeElement;
    this.dragImageItem2.translateX = 0;
    this.dragImageItem2.translateY = 0;
    this.dragImageItem2.scaleX = 1;
    this.dragImageItem2.scaleY = 1
    this.dragImageItem3 = <Image>this.dragImage3.nativeElement;
    this.dragImageItem3.translateX = 0;
    this.dragImageItem3.translateY = 0;
    this.dragImageItem3.scaleX = 1;
    this.dragImageItem3.scaleY = 1
    this.firstlblEnable = true;
    this.seclblEnable = true;
    this.trlblEnable = true;
    this.foulblEnable = true;
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
        prevX: 75,
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
      if (this.imagesArray[index - 1].image.translateX <= -75) {
        this.imagesArray[index - 1].image.translateX = -75
      }
      if (this.imagesArray[index - 1].image.translateX >= 75) {
        this.imagesArray[index - 1].image.translateX = 75
      }
      if (this.imagesArray[index - 1].image.translateY <= -400) {
        this.imagesArray[index - 1].image.translateY = -400
      }
      if (this.imagesArray[index - 1].image.translateY >= -7) {
        this.imagesArray[index - 1].image.translateY = -7
      }
      switch (index) {
        case 1:
          if (this.imagesArray[index - 1].image.translateX == -75 && this.imagesArray[index - 1].image.translateY == -400) {

            args.state = 3
            if (this.firstlblEnable == true) {
              this.firstlblEnable = false
              this.scorecounter += 1
              console.log("sroce =" + this.scorecounter);
              console.log(this.imagesArray[index - 1].isEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }
          }
        case 2:
          if (this.imagesArray[index - 1].image.translateX == 75 && this.imagesArray[index - 1].image.translateY == -400) {
            this.imagesArray[index - 1].image.translateX = 75
            this.imagesArray[index - 1].image.translateY = -400
            args.state = 3
            if (this.seclblEnable == true) {
              this.seclblEnable = false
              this.scorecounter += 1
              console.log("sroce =" + this.scorecounter);
              console.log(this.seclblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1
            }

          }
        case 3:
          if (this.imagesArray[index - 1].image.translateX <= 75 && this.imagesArray[index - 1].image.translateX >= 70 && this.imagesArray[index - 1].image.translateY >= -200 && this.imagesArray[index - 1].image.translateY <= -190) {
            this.imagesArray[index - 1].image.translateX = 75
            this.imagesArray[index - 1].image.translateY = -200
            args.state = 3
            if (this.trlblEnable == true) {
              this.trlblEnable = false
              this.scorecounter += 1
              console.log("sroce =" + this.scorecounter);
              console.log(this.trlblEnable);
              this.imagesArray[index - 1].image.scaleX = 1
              this.imagesArray[index - 1].image.scaleY = 1

            }
          }
        case 4:
          if ((this.imagesArray[index - 1].image.translateX >= -75 && this.imagesArray[index - 1].image.translateX <= -70) && (this.imagesArray[index - 1].image.translateY >= -200 && this.imagesArray[index - 1].image.translateY <= -190)) {
            this.imagesArray[index - 1].image.translateX = -75
            this.imagesArray[index - 1].image.translateY = -200
            args.state = 3
            if (this.foulblEnable == true) {
              this.foulblEnable = false
              this.scorecounter += 1
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

    if (this.scorecounter == 4 && this.firstlblEnable == false) {

      this.router.navigate(['/main'])
    }

  }

}
