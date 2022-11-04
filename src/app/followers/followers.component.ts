import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { combineLatest, switchMap, map } from 'rxjs';

import { FollowersService } from '../services/followers.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers: any;

  constructor(
    private route: ActivatedRoute,
    private service: FollowersService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe();
    let id = this.route.snapshot.paramMap.get('id');

    this.route.queryParamMap.subscribe()
    let page = this.route.snapshot.queryParamMap.get('page');

    this.service.getAll()
      .subscribe(followers => this.followers = followers);
  }

}
