import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { PostService } from './services/post.service';
import { AppErrorHandler } from './common/app.error.handler';
import { FollowersComponent } from './followers/followers.component';
import { FollowersService } from './services/followers.service';
import { GithubProfileComponent } from './github-profile/github-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    FollowersComponent,
    GithubProfileComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  // forRoot() => static method, used to define the roor routes for an app
    RouterModule.forRoot([
      {
        path: '', component: HomeComponent
      },
      {
        path: 'followers/:id/:username', component: GithubProfileComponent
      },
      {
        path: 'followers', component: FollowersComponent
      },
      {
        path: 'posts', component: PostsComponent
      },
      {
        path: '**', component: NotFoundComponent
      },
    ])
  ],
  providers: [
    PostService,
    FollowersService,
    AppErrorHandler
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
