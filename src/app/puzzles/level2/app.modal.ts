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
  } from "@angular/core";import { ModalDialogParams } from "@nativescript/angular/directives/dialogs"
import { Label } from "tns-core-modules/ui/label";
import { Page } from 'tns-core-modules/ui/page';
import {
    PanGestureEventData
  } from "tns-core-modules/ui/gestures";
import {CardView}from "nativescript-cardview"

@Component({
    selector: 'my-modal',
    templateUrl:'./app.modal.html' ,
    styleUrls: ['./app.modal.css'],
})
export class ModalComponent implements OnInit, AfterViewInit{
    public prompt: string;
    public wordArray;
    public firstWordlblEnable: boolean
    public secWordlblEnable: boolean
   
    @ViewChildren('ref', { read: ElementRef }) elements: QueryList<ElementRef>;
    
    constructor(private page: Page) {
        
        
    }
    ngOnInit(): void {
        this.wordArray = new Array(2);        
        this.firstWordlblEnable = true;
        this.secWordlblEnable = true;
         
    }

    ngAfterViewInit() {
        console.log('test')
        console.log(this.elements.length);
        console.log(this.wordArray.length);
        let i = 0
        this.elements.forEach(e => {
            console.log(e);
            
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
          if(index ==1 ){
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
          else{
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
                
              if (this.wordArray[index - 1].image.translateX >= 25 && this.wordArray[index - 1].image.translateX <= 40 &&  this.wordArray[index - 1].image.translateY >= -150&&  this.wordArray[index - 1].image.translateY <= -140) {
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
    

      }

}