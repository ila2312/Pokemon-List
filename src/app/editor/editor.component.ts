import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Validator } from '@angular/forms';
import { finalize } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {

  requestOk: boolean = false;

  //currentStyles: Record<string, string> = {};

  pokeForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    evolutions: new FormControl(false, Validators.required),
  });

  constructor(private pokemonService: PokemonService) {}

  setNotOk(): void {
    this.requestOk = false;
    // this.currentStyles = {
    //   'background-color': 'red'
    // }
    console.log(this.requestOk);
  }

  onSubmit() {
    this.pokemonService
      .postPokemon(
        this.pokeForm.value.name ? this.pokeForm.value.name : '',
        this.pokeForm.value.type ? this.pokeForm.value.type : "",
        this.pokeForm.value.evolutions ? this.pokeForm.value.evolutions : false
      )
      // .pipe(finalize(() => {this.requestOk = false;}))

      .subscribe((value) => {
        console.log(value);
        //this.pokeForm.reset(); -> resetta tutti i valori del formi de va bene ma non mette il type a value=""
        this.pokeForm.setValue({
          name: "",
          type: "",
          evolutions: false
        });
        //se la risposta e positiva (e se sono qui nella next lo è) devo mettere il flag a true
        this.requestOk = true;
        // this.currentStyles = {
        //   'background-color': 'green'
        // }
        setTimeout(()=>{
          this.setNotOk()
        }, 1000);
      },
      err => console.error('ERRORE')
      );

  }
}
