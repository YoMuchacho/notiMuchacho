import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

import { RespuestaTopHeadLines } from '../interfaces/interfaces';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;
const top = '/top-headlines?country=us';
const headers = new Headers ({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  topHeadLinesPages = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor( private httpClient: HttpClient) { }

  getTopHeadLines(){
    this.topHeadLinesPages++;
    return this.httpClient.get<RespuestaTopHeadLines>(`${apiUrl}/top-headlines?country=co&page=${this.topHeadLinesPages}&category=business&apiKey=${apiKey}`);
  }

  getTopHeadLinesCategoria( categoria: string ){
    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.httpClient.get<RespuestaTopHeadLines>(`${apiUrl}/top-headlines?country=co&category=${categoria}&page=${this.categoriaPage}&apiKey=${apiKey}`);
  }
}
