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

  constructor( private httpClient: HttpClient) { }

  getTopHeadLines(){
    return this.httpClient.get<RespuestaTopHeadLines>(`${apiUrl}/top-headlines?country=co&category=business&apiKey=${apiKey}`);
  }

  getTopHeadLinesCategoria( categoria: string ){
    return this.httpClient.get<RespuestaTopHeadLines>(`${apiUrl}/top-headlines?country=co&category=${categoria}&apiKey=${apiKey}`);
  }
}
