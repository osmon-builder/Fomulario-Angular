import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Equipo } from 'src/app/models/euipo.model';
import { EquioposService } from 'src/app/services/equipos.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipos-por-fecha',
  templateUrl: './equipos-por-fecha.component.html',
  styleUrls: ['./equipos-por-fecha.component.scss']
})
export class EquiposPorFechaComponent implements OnInit {
  fechaInicial!: string;
  fechaFinal!: string;
  equiposDate!: Equipo
  dataSource = new MatTableDataSource<Equipo>();
  dataList: Equipo[] = new Array();

  equipos!: any[];
  constructor(
    private equiposServices: EquioposService,
     private router: Router,
  ) { }

  ngOnInit(

  ): void {
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

  ];

  onFechaInicialSeleccionada(event: MatDatepickerInputEvent<Date>) {
    if (event.value instanceof Date) {
      this.fechaInicial = event.value.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    
    } else {
      console.error('Fecha inicial no válida');
    }
  }
  

  onFechaFinalSeleccionada(event: MatDatepickerInputEvent<Date>) {
    if (event.value instanceof Date) {
      this.fechaFinal = event.value.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'}).replace(/\//g, '-');
    } else {
      console.error('Fecha final no válida');
    }
  }


  consultarEquipos() {
    // let fechaInicial = new Date(this.fechaInicial.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}))
    // let fechaFinal = new Date(this.fechaFinal.toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}))
    this.equiposServices.getByDate(this.fechaInicial, this.fechaFinal).subscribe({
      next:  (data:any) => {
       console.log(data)
        this.equipos= data
        this.dataList = this.equipos
        console.log(this.dataList)
  
        this.dataSource = new MatTableDataSource<Equipo>(this.dataList)
      }
    }
     
    )
  }

  back(){
    this.router.navigate(['/home/home']);
  }


}
