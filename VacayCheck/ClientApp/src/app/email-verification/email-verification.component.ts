import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { User } from '../shared/user.model';
import { faCheckCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }
  verificatedUserId: string;
  verificatedUser = new User();
  faCheckCircle = faCheckCircle;
  timeLeft: number = 3;
  interval;


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.verificatedUserId = params['id']);
    this.api.getUser(this.verificatedUserId).subscribe((user: User)=>{
      this.verificatedUser = user;
      console.log(this.verificatedUser);
    });
    console.log(this.verificatedUserId);
    this.startTimer();
    this.verificatedUser.isMailVerificated = true;
    this.api.updateUserDetails(this.verificatedUser, this.verificatedUserId).subscribe(()=>{
  
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.router.navigate(["/login"]);
        clearInterval(this.interval);
        console.log("dadad")
      }
    },1000)
  }
}
