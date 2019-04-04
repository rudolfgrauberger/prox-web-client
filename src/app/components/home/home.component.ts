import {Component, OnInit} from '@angular/core';
import {KeyCloakUser} from '../../keycloak/KeyCloakUser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private user: KeyCloakUser, private router: Router) {
  }

  ngOnInit() {
  }


  editProject() {
    if (this.user.isLoggedIn()) {
      this.router.navigate(['/', 'projects']);
    } else {
       this.user.loginRedirect(window.location.href + 'projects');
    }
  }
}
