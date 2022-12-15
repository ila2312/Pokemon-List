import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Pokemon } from './pokemon';
import { Form, FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  private pokeurl = 'https://pokeapi.co/api/v2/pokemon/';
  //private poke = 'https://pokeapi.co/api/v2/pokemon/ditto';
  private urlToPost = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) { }

  getPokemon(name: string): Observable<Pokemon> {
    if(!name.trim()) {
      return of();
    }
    return this.http.get<Pokemon>(`${this.pokeurl}${name}`);
  }


  postPokemon (pokeName: string, pokeType: string, pokeEv: boolean) {
    const body = {
      pokeName,
      pokeType,
      pokeEv
    };

    return this.http.post(this.urlToPost, body);
  }

}
