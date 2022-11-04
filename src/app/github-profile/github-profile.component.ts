import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-github-profile',
  templateUrl: './github-profile.component.html',
  styleUrls: ['./github-profile.component.css']
})
export class GithubProfileComponent implements OnInit {

// ActivatedRouter(class) in order to get access to route parameters
  constructor(private route: ActivatedRoute, private router: Router) {
// when the user navigates away to get data
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);

// when the user stays on the same page and data changes
    // this.route.paramMap
    //   .subscribe((params: ParamMap) => {
    //     let id = params.get('id');
    //     console.log(id)
    //   });
  }

  submit() {
    this.router.navigate(['/followers'], {
      queryParams: { page: 1, order: 'newest'}
    })
  }

  ngOnInit() {
  }

}
