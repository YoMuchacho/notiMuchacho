import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, AfterViewInit{

  categorias: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  @ViewChild(IonSegment) ionSegment: IonSegment;



  constructor( private noticiasService: NoticiasService) {}

  ngOnInit() {
    // this.ionSegment.value = this.categorias[0];
  }

  ngAfterViewInit(){
    this.ionSegment.value = this.categorias[0];
    this.consultarNoticias(this.categorias[0]);
  }

  cambiarCategoria( event ){
    this.noticias = [];
    this.consultarNoticias(event.detail.value);
  }

  consultarNoticias(categoria: string, event?){
    this.noticiasService.getTopHeadLinesCategoria(categoria).subscribe( respuesta => {
      if (respuesta.articles.length === 0) {
        event.target.complete();
        event.target.disabled = true;
      }

      this.noticias.push( ...respuesta.articles);

      if ( event ) {
        event.target.complete();
      }
    });
  }

  loadData( event ){
    this.consultarNoticias(this.ionSegment.value , event);
  }
}
