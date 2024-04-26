import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Contribuyente } from '@models/contribuyente';
import { AlertService } from '@services/alert.service';
import { ContribuyenteService } from '@services/contribuyente.service';

import { GenericService } from '@services/generic.service';


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
  form!: FormGroup;
  contribuyente!: Contribuyente;
  isEditMode = false;
  enpoint: string = 'contribuyente';

  constructor(private fb: FormBuilder, private alertService: AlertService, private activatedRoute: ActivatedRoute,
    private contribuyenteService: ContribuyenteService,
    private router: Router, private genericService: GenericService<Contribuyente>) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.findContribuyenteById(id);
        this.isEditMode = true;
      }
    });
    this.registroForm();

  }

  // Metodo para limpiar el formulario
  resetForm = () => {
    this.form.reset();
  }

  // Metodo para inicializar el formulario
  registroForm() {
    this.form = this.fb.group({
      id: [''],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      tipoContribuyente: ['', Validators.required],
      tipoDocumento: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      razonSocial: [''],
      correo: [''],
      telefono: [''],
      direccion: ['']
    });
  }

  // Metodo para guardar un contribuyente
  onSubmit(): void {
    if (this.form.valid) {
      if (this.isEditMode) {
        this.contribuyente = this.form.value;

        // Metodo para actualizar
        this.genericService.update(this.enpoint, this.contribuyente.id, this.contribuyente).subscribe(
          response => {
            this.alertService.success('Contribuyente actualizado con éxito', 'Contribuyente');
            this.resetForm();
            this.router.navigate(['/contribuyente']);
          }
        );
      }
      else {
        this.contribuyente = this.form.value;

        // Metodo para crear un nuevo registro
        this.genericService.create(this.enpoint, this.contribuyente).subscribe(
          response => {
            this.alertService.success('Contribuyente creado con éxito', 'Contribuyente');
            this.resetForm();
            this.router.navigate(['/contribuyente']);
          }
        );
      }
    }
    else {
      // Marcar campos como tocados
      this.markFormGroupTouched(this.form);
    }

  }

  // Metodo para marcar campos como tocados
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // Metodo para buscar un contribuyente por id
  findContribuyenteById(id: number) {

    this.genericService.getById(this.enpoint, id).subscribe(
      response => {
        this.contribuyente = response;
        this.form.patchValue(this.contribuyente);
      }
    );
  }


  /**
 * Validaciones
 */

  get nombresNoValido() {
    const nombresControl = this.form.get('nombres');
    return nombresControl && nombresControl.invalid && nombresControl.touched;
  }

  get apellidosNoValido() {
    const apellidosControl = this.form.get('apellidos');
    return apellidosControl && apellidosControl.invalid && apellidosControl.touched;
  }

  get numeroDocumentoNoValido() {
    const numeroDocumentoControl = this.form.get('numeroDocumento');
    return numeroDocumentoControl && numeroDocumentoControl.invalid && numeroDocumentoControl.touched;
  }


  /**
 * Consumo de servicios TipoContribuyente y TipoDocumento
 */

  get tipoContribuyente() {
    return this.contribuyenteService.tipoContribuyente;
  }

  get tipoDocumento() {
    return this.contribuyenteService.tipoDocumento;
  }



}
