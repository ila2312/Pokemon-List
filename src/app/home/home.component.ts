import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  poke: Pokemon | null = null;

  constructor(private pokemonService: PokemonService) {

  }

  ngOnInit(): void {
  }

  getPokemon(name: string): void {
    this.pokemonService.getPokemon(name)
    .subscribe(poke => {
      this.poke = poke;
      console.log(poke);
    });
  }
}
