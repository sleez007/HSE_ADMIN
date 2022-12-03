import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectCurrentRoute, selectFragment, selectQueryParam, selectQueryParams, selectRouteData, selectRouteParam, selectRouteParams, selectTitle, selectUrl } from 'src/app/core/store/router/router.selector';
//import { detailActions } from './core/store';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private readonly store: Store, private readonly activatedRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.select(selectRouteParam('category')).subscribe({next: (d)=> console.log(d)});
  }

}
