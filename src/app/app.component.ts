import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NgAzureVideoExample';


  complete(currentTime: any): void {
    console.log('Video Complete');
    console.log(currentTime);
  }

  play(currentTime: any): void {
    console.log('Video play hit');
    console.log(currentTime);
  }

  pause(currentTime: any): void {
    console.log('Video pause hit');
    console.log(currentTime);
  }

}
