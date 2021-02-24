import { Component, OnInit, ViewChild } from "@angular/core";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Property } from "../../shared/property.model";
import { City } from "../../shared/city.model";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-detail-modal",
  templateUrl: "./detail-modal.component.html",
  styleUrls: ["./detail-modal.component.css"],
})
export class DetailModalComponent implements OnInit {
  @ViewChild("detailModal") modal: ModalDirective;
  property = new Property();

  constructor(private api: ApiService) {}

  ngOnInit() {}

  initialize(id: number): void {
    this.getProperty(id);
    this.modal.show();
  }

  getProperty(id: number) {
    this.api.getProperty(id).subscribe(
      (data: Property) => {
        this.property = data;
        console.log(this.property);
      });
  }
}
