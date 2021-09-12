import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  selectedTab = 1;
  routes = {'/profile': 0 ,'/': 1, '/settings': 2, '/donation': 3}

  constructor(private router: Router, private authService: AuthService) {
    
  }

  ngOnInit(): void {
    switch (this.router.url) {
      case '/profile':
        this.selectedTab = this.routes['/profile'];
        break;
      case '/':
        this.selectedTab = this.routes['/'];
        break;
      case '/settings':
        this.selectedTab = this.routes['/settings'];
        break;
      case '/donation':
        this.selectedTab = this.routes['/donation'];
        break;     
      default:
        this.selectedTab = this.routes['/'];
        break;
    }
  }

  async onSignout() {
    const resp = await this.authService.signOut();
    if(resp) {
      console.log(resp);
      this.router.navigate(['/auth']);
    }
  }

}
