import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  title: string;

  constructor() {
    this.title = "SeriesSmart.com"
  }

  ngOnInit(): void {
  }

}
