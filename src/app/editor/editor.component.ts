import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Validator } from '@angular/forms';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  pokeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    evolutions: new FormControl(false, Validators.required),
  });

  constructor(private pokemonService: PokemonService) {}

  onSubmit() {
    this.pokemonService
      .postPokemon(
        this.pokeForm.value.name ? this.pokeForm.value.name : '',
        this.pokeForm.value.type ? this.pokeForm.value.type : "",
        this.pokeForm.value.evolutions ? this.pokeForm.value.evolutions : false
      )
      .subscribe((value) => {
        console.log(value);
      });
  }
}
