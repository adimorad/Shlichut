import { Component } from '@angular/core';
import { MyserviceService } from './myservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
//import 'rxjs/add/operator/map';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  styles:[`
      div{
         margin: 0 auto;
         text-align: center;
         width:200px;
      }
      .rotate{
         width:100px;
         height:100px;
         border:solid 1px red;
      }
   `],
  animations: [
  trigger('myanimation',[
      state('smaller',style({
        transform : 'translateX(100px)'
      })),
      state('larger',style({
        transform : 'translateX(0px)'
      })),
      transition('smaller <=> larger',animate('300ms ease-in'))
    ])
  ]
})
export class AppComponent {
   myData: Array<any>;
   state: string = "smaller";
   animate() {
      this.state= this.state == 'larger' ? 'smaller' : 'larger';
   }
  title = 'ShlichutProject';
   todaydate;
   componentproperty;
   emailid;
   formdata;
   
   constructor(private myservice: MyserviceService) { }
   ngOnInit() {
      this.todaydate = this.myservice.showTodayDate();
      this.formdata = new FormGroup({
         emailid: new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern("[^ @]*@[^ @]*")
         ])),
         passwd: new FormControl("",this.passwordvalidation)
      });
   }
   passwordvalidation(formcontrol) {
      if (formcontrol.value.length <= 5) {
         return {"passwd" : true};
      }
   }
   onClickSubmit(data) {this.emailid = data.emailid;}
}
