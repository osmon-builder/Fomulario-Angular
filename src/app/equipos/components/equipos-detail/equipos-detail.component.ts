import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/models/euipo.model';
import { EquioposService } from 'src/app/services/equipos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { BaseFormEquiposService } from 'src/app/services/base-form-equipos.service';

@Component({
  selector: 'app-equipos-detail',
  templateUrl: './equipos-detail.component.html',
  styleUrls: ['./equipos-detail.component.scss']
})
export class EquiposDetailComponent implements OnInit {


  isAddMode!: boolean
  id!: number;
  formattedDate!:Date
  dataForm!: FormGroup;

  isEditable!: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private equiposServices : EquioposService,
    private formBuilder: FormBuilder,
    public baseFormEquiposService: BaseFormEquiposService
  ) { }

  ngOnInit( ): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.initFrom();
  }

  initFrom(){
    this.findEquipo();
  }





  findEquipo(){
    if(this.id){
      this.equiposServices.getEquipo(this.id).subscribe({
        next: (data:any) =>{
          console.log(data.fundacion)
          const fecha = data.fundacion
          const dateObj = new Date(fecha);
          const formattedDate = dateObj.toLocaleDateString('es-ES', {day: 'numeric', month: 'numeric', year: 'numeric'});
          this.baseFormEquiposService.baseForm.patchValue({ 
            ...data,
            fundacion: formattedDate
          });
        }
      })
    }
  }

  goBack(){
    this.router.navigate(['/home/home']);
  }

  setAutoMode(change: MatSlideToggleChange): void {
  	console.log("setAutoMode..",change)
   
    if(change.checked){
        this.isEditable = true;
        this.router.navigate(['/home/home/edit/'+this.id]);
       
    }else{
        this.isEditable = false;
        
    }
	}  

}
