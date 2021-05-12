import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }
  verificatedUserId: string;
  verificatedUser = new User();

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => this.verificatedUserId = params['id']);
    console.log(this.verificatedUserId);
    this.verificatedUser.isMailVerificated = true;
    this.api.updateUserDetails(this.verificatedUser, this.verificatedUserId).subscribe(()=>{
      setTimeout(() => {
        this.router.navigate(["/login"]);
      }, 4000);
    });
  }

}
