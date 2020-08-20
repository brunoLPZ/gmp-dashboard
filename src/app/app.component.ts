import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sections = [
    {
      title: "dashboard",
      subsections: [
        {
          url: "/dashboard/start",
          label: "start"
        }, {
          url: "/dashboard/weekly",
          label: "weekly"
        }
      ]
    },
    {
      title: "contribute",
      subsections: [
        {
          url: "/contribute",
          label: "start"
        },
        {
          url: "/contribute/suggest",
          label: "suggest"
        }
      ]
    }
  ];
}
