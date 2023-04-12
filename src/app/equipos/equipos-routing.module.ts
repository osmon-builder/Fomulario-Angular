import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquiposComponent } from './components/equipos/equipos.component';
import { EquiposFormComponent } from './components/equipos-form/equipos-form.component';
import { EquiposDetailComponent } from './components/equipos-detail/equipos-detail.component';
import { EquiposPorFechaComponent } from './components/equipos/equipos-por-fecha/equipos-por-fecha.component';


const routes : Routes= [
    {
        path: "home",
        children: [
            {
                path: "",
                component: EquiposComponent
            },
            {
                path:"add",
                component: EquiposFormComponent
            },
            {
                path:"show/:id",
                component: EquiposDetailComponent
            },
            {
                path:"edit/:id",
                component: EquiposFormComponent
            },
            {
                path:"getdate",
                component: EquiposPorFechaComponent
            }
        ]
    
    
}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class EquiposRoutingModule { }
  