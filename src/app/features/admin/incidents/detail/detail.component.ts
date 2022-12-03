import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentRoute, selectFragment, selectQueryParam, selectQueryParams, selectRouteData, selectRouteParam, selectRouteParams, selectTitle, selectUrl } from 'src/app/core/store/router/router.selector';
import { DetailModel } from './core/model';
import { detailFeature } from './core/store';
//import { detailActions } from './core/store';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  projectData$ : Observable<DetailModel[]>
  isLoading$: Observable<boolean>

  constructor(private readonly store: Store, private readonly activatedRouter: ActivatedRoute) { 
    this.projectData$ = this.store.select(detailFeature.selectItemDetail);
    this.isLoading$ = this.store.select(detailFeature.selectIsLoading)
  }

  ngOnInit(): void {
    
  }

}
