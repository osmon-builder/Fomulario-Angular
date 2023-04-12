import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/models/euipo.model';
import { BaseFormEquiposService } from 'src/app/services/base-form-equipos.service';
import { EquioposService } from 'src/app/services/equipos.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { DatePipe } from '@angular/common';

declare let alertify: any; 

@Component({
  selector: 'app-equipos-form',
  templateUrl: './equipos-form.component.html',
  styleUrls: ['./equipos-form.component.scss']
})
export class EquiposFormComponent implements OnInit {

  dataForm!: FormGroup;
  id!: number;
  

  isAddMode!: boolean;
  
  isEditable!: boolean;

  messageValidation =  { type: 'pattern', message: 'Debe contener solo numeros' }
  validation_number = {'valor':[this.messageValidation], 'capacidad': [this.messageValidation]}
  

  constructor(
    private equipoService :EquioposService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public baseFormEquiposService: BaseFormEquiposService
    ,private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
	    
    this.isAddMode = !this.id;
    console.log(this.isAddMode)
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    if(this.id){
      this.findEquipo();
    }
   
  }

  onSubmit(){
    if (this.dataForm.invalid) {

      return;
    }
    this.addEquipo();
  }

  
  goBack() {
    this.router.navigate(['/home/home']);
  }

  setAutoMode(change: MatSlideToggleChange): void {
    console.log("setAutoMode..",change)  
    if(change.checked){
        this.isEditable = true;
    }else{
        this.isEditable = false;
        this.router.navigate(['/home/home/show/'+this.id]);
    }
}  
  
  addEquipo(){
    if( this.isAddMode ){
      console.log(this.baseFormEquiposService.baseForm.value); 
      this.equipoService.createEquipo(this.baseFormEquiposService.baseForm.value).subscribe({
        next:(data:any) =>{
         console.log(data)
          this.router.navigate(['/home/home']);
        }
      }
      
      )
    }else{
      this.equipoService.updateEquipo(this.id, this.baseFormEquiposService.baseForm.value).subscribe({
        next:  data=>{
          console.log(data)
              this.router.navigate(['/home/home']);
        }
      } 
        
      )
  
    }
    
    }

    findEquipo(){
      this.equipoService.getEquipo(this.id).subscribe(
        (data:any) => {
          this.baseFormEquiposService.baseForm.patchValue({
            ...data,
            
         
          });
          this.baseFormEquiposService.pathFormData(data)
          const myDate = new Date(data.fundacion);
          const datePipe = new DatePipe('en-US');
          const formattedDate = datePipe.transform(myDate, 'yyyy-MM-dd');
    
          this.baseFormEquiposService.baseForm.get('fundacion')?.setValue(formattedDate)
      
        }
      
      )
    }
   
    ngOnDestroy() {
      this.baseFormEquiposService.resetForm()
    }

}
