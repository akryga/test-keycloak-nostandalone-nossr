import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'test-keycloak-nostandalone-nossr';
  
  public isLoggedIn: boolean = false;
  public userProfile?: KeycloakProfile;

  constructor(private readonly keycloak: KeycloakService){}
  
  public ngOnInit() {

    this.isLoggedIn = this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.keycloak.loadUserProfile()
      .then(p => {this.userProfile = p})
      .catch(e => {console.error(e)});
    }
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }
}
