import { Component, OnInit } from '@angular/core';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.css']
})
export class EmailSentComponent implements OnInit {

  constructor() { }
  faEnvelope = faEnvelope;

  ngOnInit(): void {
  }

}
