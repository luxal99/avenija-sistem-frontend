import { Component } from '@angular/core';
declare var $ : any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sistem-nekretnine';

  ngOnInit(): void {
  }

  watermark(){
    setTimeout(() => {
      $('.watermark').watermark({
        path: 'assets/img/small_watermark.png',
        gravity: 'c',
        margin:20
      });
    }, 300);
  }


}
