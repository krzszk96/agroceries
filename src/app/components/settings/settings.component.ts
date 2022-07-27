import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public selectedTheme: string ='';
  public selectedLanguage: string ='';

  constructor() { }

  ngOnInit(){
    this.selectedTheme ='light';
    this.selectedLanguage ='en';
  } 

  public onThemeChange(val: string) {
    this.selectedTheme = val;
  }

  public onLanguageChange(val: string) {
    this.selectedLanguage = val;
  }

}
