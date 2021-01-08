import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pdfviewer';
  type = "scroll"
  // list = [{ value: 'scroll', 'name': 'Scroll' }, { value: 'page', 'name': 'Page' }];
  change(type) {
    if (type == 'page') {
      this.type = 'scroll';
    }
    if (type == 'scroll') {
      this.type = 'page';
    }
  }
}
