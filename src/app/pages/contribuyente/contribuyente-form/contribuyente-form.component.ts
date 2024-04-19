import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Contribuyente } from '@models/contribuyente';
import { ContribuyenteService } from '@services/contribuyente.service';

@Component({
  selector: 'app-contribuyente-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './contribuyente-form.component.html',
  styleUrl: './contribuyente-form.component.css',
  
})

export default class ContribuyenteFormComponent { 
  form: FormGroup;
  contribuyente!: Contribuyente;

  constructor(private fb: FormBuilder, private contribuyenteService: ContribuyenteService) { 
    this.form = this.fb.group({
      id: [''],
      nombres: ['',Validators.required],
      apellidos: ['',Validators.required],
      tipoContribuyente: ['',Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      razonSocial: [''],
      correo: [''],
      telefono: [''],
      direccion: ['']
    });
  }

  ngOnInit() {

  }

  onSubmit(): void{
    if (this.form.valid) {
      
      this.contribuyente = this.form.value;

      console.log(this.contribuyente);
    }else{
      this.markFormGroupTouched(this.form);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }


  /**
 * Validaciones
 */
  
  get nombresNoValido(){
    const nombresControl = this.form.get('nombres');
    return nombresControl && nombresControl.invalid && nombresControl.touched;
  }

  get apellidosNoValido(){
    const apellidosControl = this.form.get('apellidos');
    return apellidosControl && apellidosControl.invalid && apellidosControl.touched;
  }

  get numeroDocumentoNoValido(){
    const numeroDocumentoControl = this.form.get('numeroDocumento');
    return numeroDocumentoControl && numeroDocumentoControl.invalid && numeroDocumentoControl.touched;
  }

  
  /**
 * Consumo de servicios
 */

  get tipoContribuyente(){
    return this.contribuyenteService.tipoContribuyente;
  }

  get tipoDocumento(){
    return this.contribuyenteService.tipoDocumento;
  }



}
