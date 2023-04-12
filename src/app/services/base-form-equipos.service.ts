import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Equipo } from '../models/euipo.model';

@Injectable({
    providedIn: 'root',
})
export class BaseFormEquiposService {
    public baseForm: FormGroup;


    constructor(private fb: FormBuilder) {
        this.baseForm = this.fb.group({
            nombre: [],
            estadio: [],
            sitioWeb: [],
            nacionalidad: [],
            fundacion: [],
            entrenador: [],
            capacidad: ['', Validators.pattern(/^([0-9])*$/)],
            valor: ['',Validators.pattern(/^([0-9])*$/)],
            switchEditar: [false]
        });
    }

    public pathFormData(Equipo: Equipo): void {
        this.baseForm.patchValue({
            ...Equipo
        });
    }

    resetForm() {
        this.baseForm.reset();
    }
}
