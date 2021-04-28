import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  routeParams;

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        this.routeParams = this.route.root.firstChild.snapshot;
      }
    });
  }

}
