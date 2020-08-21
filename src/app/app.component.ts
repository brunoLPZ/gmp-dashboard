import { Component } from '@angular/core';
import { AuthenticationService } from "./auth/authentication.service";

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

  constructor(private readonly authService: AuthenticationService) {}

  logout() {
    this.authService.logout();
  }
}
