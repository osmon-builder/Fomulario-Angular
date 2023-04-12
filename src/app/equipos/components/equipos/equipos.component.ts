import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from 'src/app/models/euipo.model';
import { EquioposService } from 'src/app/services/equipos.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

import { EquiposPorFechaComponent } from './equipos-por-fecha/equipos-por-fecha.component';


@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss']
})
export class EquiposComponent implements OnInit {
      
      isLogged: boolean = false;

      dataSource = new MatTableDataSource<Equipo>();    
      dataList: Equipo[] = new Array();
      
      equipos!: any[];

      labelTableDelete: string = 'Eliminar';
      labelDialogConfirm: string = 'Aceptar';
      labelDialogCancel: string = 'Cancelar';




  constructor(
    private equiposServices : EquioposService,
    private router: Router,
    private authSevice: AuthService,

  ) { }


  ngOnInit(): void {
    this.equiposList()
    this.authentication()
  }

  displayedColumns: string[] = [
    'Nombre',
    'Estadio',
    'SitioWeb',
    'Nacionalidad',
    'AñodeFundación',
    'Entrenador',
    'Capacidad',
    'Valor',
    'action'
 ];


  equiposList(){
    this.equiposServices.getAll().subscribe({
      next:  (data:any) => {
       
        this.equipos= data.content
        this.dataList = this.equipos
        console.log(this.dataList)
  
        this.dataSource = new MatTableDataSource<Equipo>(this.dataList)
      }
    }
     
    )
  }

  agregar(){
    this.router.navigate(['/home/home/add'])
  }

  login(){
    this.router.navigate(['/login'])
  }

  delete( Equipo: Equipo) {
    Swal.fire({
          title: this.labelTableDelete,
          text: `¿Desea eliminar Registro ${Equipo.id}?`,
          //icon: 'question',
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonColor: '',
          confirmButtonText: this.labelDialogConfirm,
          confirmButtonColor: '#1FAEEF',
          cancelButtonText: this.labelDialogCancel,
          reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.equiposServices.deleteEquipo(Equipo.id).subscribe({
                  next: (data:any) => {
                     this.equiposList()
                  },
                  error: (err) => {
                     
                  },
              });
          }
      });
  }

  logout(){
    Swal.fire({
      title: this.labelTableDelete,
      text: `¿Desea cerra sesión?`,
      //icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonColor: '',
      confirmButtonText: this.labelDialogConfirm,
      confirmButtonColor: '#1FAEEF',
      cancelButtonText: this.labelDialogCancel,
      reverseButtons: true,
}).then((result)=>{
  if(result.value){
    this.authSevice.logout().subscribe(
      data =>{
       
      }
    )
    this.router.navigate(['/home/home']);
    localStorage.clear()
    this.isLogged=false
  }
})
 
  }



  authentication(){
    if(localStorage.getItem('logged')== 'true'){
      this.isLogged=true
    }else{
      this.isLogged=false
    }
  }
  
  listByDate( ) {
    this.router.navigate(['/home/home/getdate']);
   }

  
  
}
