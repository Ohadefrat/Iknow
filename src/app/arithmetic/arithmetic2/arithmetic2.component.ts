import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from '@angular/router';
import { Progress } from "tns-core-modules/ui/progress";
import { EventData, Page } from 'tns-core-modules/ui/page';
import * as application from "tns-core-modules/application";

@Component({
  selector: 'ns-arithmetic2',
  templateUrl: './arithmetic2.component.html',
  styleUrls: ['./arithmetic2.component.css']
})
export class Arithmetic2Component implements OnInit {
  public level: number =2 
  public question: number
  public number1: number
  public number2: number
  public operator:string
  public result:number 
  public questionlist:any
  public progressvalue:number = 0

  constructor(private router: RouterExtensions,private page: Page) {
    this.page.on(application.AndroidApplication.activityBackPressedEvent, this.onBackButtonTap, this);


  }
  onBackButtonTap(data: EventData) {
      
          this.router.navigate(['/arithmetic/arithmetic2']);
     
  }


  ngOnInit(): void {
    const operatorlist = ['+','-','*','/'];
    this.questionlist = new Array(16)
    for (let i = 0; i < this.questionlist.length; i++) {
      let q = {
        n1: Math.floor(Math.random()*(10)),
        n2: Math.floor(Math.random()*(10)),
        op: operatorlist[Math.floor(Math.random()*(2-0)-0)]
        }
        if(i==0){
          if( q.op != "-"){
            q.op = "-"
          }
        }
        if(q.n1 < q.n2){
          q.n2=Math.floor(Math.random()*(10))
          i--
        }
        else{
          this.questionlist[i]=q
        }
        
      
    }
    this.setQuestion(1)
      
  }

  setQuestion(q){
    this.question = q
    this.number1 = this.questionlist[q-1].n1

    this.number2 = this.questionlist[q-1].n2
    this.operator = this.questionlist[q-1].op
  }

  submitBtn(){
    
    let progressvalue: Progress = <Progress>this.page.getViewById<Progress>('progress');
    try {
      if(this.progressvalue<100){
      const operatorlist = ['+','-','*','/'];
      if(this.operator == operatorlist[0]){
        console.log("you are ok");
        //console.log(`${this.answerSCR}`);
        
        if( this.number1 + this.number2==this.result){
          this.progressvalue+=6.25
          this.setQuestion(this.question+1)
          console.log("you are ok");
          this.result=null
          
        }
      }
      if(this.operator == operatorlist[1]){
        console.log("you are ok");
        //console.log(`${this.answerSCR}`);
        
        if( this.number1 - this.number2==this.result){
          this.progressvalue+=6.25
          this.setQuestion(this.question+1)
          console.log("you are ok");
          this.result=null
          
        }
      }
      if(this.operator == operatorlist[2]){
        console.log("you are ok");
        //console.log(`${this.answerSCR}`);
        
        if( this.number1 * this.number2==this.result){
          this.progressvalue+=6.25
          this.setQuestion(this.question+1)
          console.log("you are ok");
          this.result=null
        }
      }
      if(this.operator == operatorlist[3]){
        console.log("you are ok");
        //console.log(`${this.answerSCR}`);
        
        if( this.number1 / this.number2==this.result){
          this.progressvalue+=6.25
          this.setQuestion(this.question+1)
          console.log("you are ok");
          this.result=null
        }
      }
    }

    } catch (error) {
      if(this.progressvalue>=100){
       
        this.router.navigate(['/arithmetic/arithmetic3'])
      }
      else{
      alert("Numbers only! :)")
      }
    }
    console.log(this.result);
    

  }
  back(){
    console.log("back press");
    this.router.navigate(["/main"]);
}
  /*onProgressBarLoaded(args) {
    let myProgressBar = args.object as Progress;

    myProgressBar.value = 0; // Initial value
    myProgressBar.maxValue = 100; // Maximum value

    // Forcing progress value change (for demonstration)
    setInterval(() => {
        myProgressBar.value += 10;
    }, 1000);
}

onValueChanged(args) {
    let myProgressBar = args.object as Progress;

    // TIP: args (for valueChange of Progress) is extending EventData with oldValue & value parameters
    console.log("Old Value: " + args.oldValue);
    console.log("New Value: " + args.value);
}*/

}  
