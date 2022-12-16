import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public poke: Pokemon | null = null;

  public inputName: string = '';

  public isLoading = false;

  public key = "lastPoke";

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    const tmp = localStorage.getItem(this.key);
    if(tmp)
      this.poke = JSON.parse(tmp);
  }

  clearStorage() {
    this.poke = null;
    localStorage.clear();
  }

  getPokemon(name: string): void {
    this.isLoading = true;
    this.pokemonService.getPokemon(name)
    .pipe(
      //questo finalize è fatto in ogni caso della subscribe -> mentre aspetta che venga preso l'errore manda la scriatta LOADING
      finalize(() => {this.isLoading = false;})
    ).subscribe(
      //la subscribe prende 3 termini -> next, error, complete
      (poke) => {
        this.poke = poke;
        console.log(poke);
        this.inputName = '';
        localStorage.setItem(this.key, JSON.stringify(this.poke));
      },
      (err) => {
        this.poke = null;
      }

    );
  }
}
