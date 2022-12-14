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

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {}

  getPokemon(name: string): void {
    this.isLoading = true;
    this.pokemonService.getPokemon(name)
    .pipe(
      //questo finalize è fatto in ogni caso della subscribe -> mentre aspetta che venga preso l'errore manda la scriatta LOADING
      finalize(() => {this.isLoading = false;})
    )
    //la subscribe prende 3 termini -> next, error, complete
    .subscribe(
      (poke) => {
        this.poke = poke;
        console.log(poke);
      },
      (err) => {
        this.poke = null;
      }
    );

    this.inputName = '';
  }
}
