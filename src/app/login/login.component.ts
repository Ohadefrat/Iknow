import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular/router';
import { NavigationExtras } from "@angular/router"
import { setString } from 'tns-core-modules/application-settings';


const firebase = require("nativescript-plugin-firebase");
const firebaseAPI = require("nativescript-plugin-firebase/app");

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
  constructor(private router: RouterExtensions) {


  }


  ngOnInit(): void {
    firebase.getCurrentUser()
    .then(result => {
        if(result.uid !=undefined){
          this.router.navigate(['/main'])
        }
        
    })

  }

  loginWithGoogle() {
    

    firebase.login({
      type: firebase.LoginType.GOOGLE,
      googleOptions: {
        scopes: ['https://www.googleapis.com/auth/user.birthday.read', 'https://www.googleapis.com/auth/userinfo.profile']
      }
    }).then((result) => {
      JSON.stringify(result);
      if(result.uid ==undefined){
      const usersCollection = firebaseAPI.firestore().collection("Users");

      usersCollection.doc(result.uid).set({
        name: result.displayName,
        email: result.email,
        level: result.level,
        score: 0,
        image: result.photoURL
      });

    }
    else{
      firebase.getCurrentUser()
      .then(result => {
          console.log("main\n" +result.uid);
          const usersCollection = firebaseAPI.firestore().collection("Users");
          usersCollection.doc(result.uid).get().then(user=>{
              console.log("main\n" +result);
                  this.name = user.data().name
                  this.image = user.data().image
                  this.level = user.data().level
                  this.score = user.data().score
          })
      })
      this.router.navigate(['/main'])
    }

      //console.log(JSON.stringify(result));
      // let t = result;
      // t.providers = []
      // console.log(t);



    },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
    
  }
}
