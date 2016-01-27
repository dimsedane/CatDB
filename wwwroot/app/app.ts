import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { FeedComponent } from './feed/feed';

@Component({
    directives: [ROUTER_DIRECTIVES],
    selector: 'cats-db',
    templateUrl: 'app/app.html'
})
@RouteConfig([
  { component: FeedComponent, name: 'Feed', path: '/feed',  useAsDefault: true },
  { component: FeedComponent, name: 'MyCats', path: '/mycats' }
])
export class AppComponent { }
