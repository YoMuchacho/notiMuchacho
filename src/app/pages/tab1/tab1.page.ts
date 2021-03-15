import { Component, OnInit } from '@angular/core';

import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit {

  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {}

  ngOnInit() {
    this.consultarNoticias();
  }

  loadData( event ){
    this.consultarNoticias( event );
  }

  consultarNoticias( event? ){
    this.noticiasService.getTopHeadLines().subscribe( respuesta => {
      if (respuesta.articles.length === 0) {
        event.target.complete();
        event.target.disabled = true;
      }

      this.noticias.push( ...respuesta.articles );

      if ( event ) {
        event.target.complete();
      }
    });
  }
}
