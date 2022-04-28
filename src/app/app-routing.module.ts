import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio/inicio.component';

const routes: Routes = [
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'home',
    children: [
      {
        path: ':usuarioId',
        loadChildren: () => import('./home/home-routing.module').then(m => m.HomePageRoutingModule)
    },
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'registrar',
    loadChildren: () => import('./registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'contrato-update',
    children: [
      {
        path: ':contratoId',
        loadChildren: () => import('./contratos/contrato-update/contrato-update.module').then(m => m.ContratoUpdatePageModule)
    },
    ]
  },
  {
    path: 'propiedades',
    children: [
      {
        path: '',
        loadChildren: () => import('./propiedades/propiedades.module').then( m => m.PropiedadesPageModule)
      },
       {
        path: ':propiedadId',
        loadChildren: () => import('./propiedades/propiedad-detalle/propiedad-detalle.module').then(m => m.PropiedadDetallePageModule)
      },
    ]
  },

  {
    path: 'proveedores',
    children: [
      {
        path: '',
        loadChildren: () => import('./proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
      },
       {
        path: ':proveedorId',
       loadChildren: () => import('./proveedores/proveedor-detalle/proveedor-detalle.module').then(m => m.ProveedorDetallePageModule)
      }
    ]
  },

  {
    path: 'locadores',
    children: [
      {
        path: '',
        loadChildren: () => import('./locadores/locadores.module').then( m => m.LocadoresPageModule)
      },
       {
        path: ':locadorId',
       loadChildren: () => import('./locadores/locador-detalle/locador-detalle.module').then(m => m.LocadorDetallePageModule)
      }
    ]
  },

  {
    path: 'inquilinos',
    children: [
      {
        path: '',
        loadChildren: () => import('./inquilinos/inquilinos.module').then( m => m.InquilinosPageModule)
      },
       {
        path: ':inquilinoId',
        loadChildren: () => import('./inquilinos/inquilino-detalle/inquilino-detalle.module').then(m => m.InquilinoDetallePageModule)
      }
    ]
  },
  {
    path: 'garantes',
    children: [
      {
        path: '',
        loadChildren: () => import('./garantes/garantes.module').then( m => m.GarantesPageModule)
      },
       {
        path: ':garanteId',
       loadChildren: () => import('./garantes/garante-detalle/garante-detalle.module').then(m => m.GaranteDetallePageModule)
      },
    ]
  },
  {
    path: 'contratos',
    children: [
      {
        path: '',
        loadChildren: () => import('./contratos/contratos.module').then( m => m.ContratosPageModule)
      },
       {
        path: ':contratoId',
        loadChildren: () => import('./contratos/contrato-detalle/contrato-detalle.module').then(m => m.ContratoDetallePageModule)
      },
    ]
  },

  {
    path: 'new-place',
    loadChildren: () => import('./propiedades/propiedad-add/propiedad-add.module').then(m => m.PropiedadAddPageModule)

  },
  {
    path: 'propiedad-update',
    children: [
      {
        path: ':propiedadId',
        loadChildren: () => import('./propiedades/propiedad-update/propiedad-update.module').then(m => m.PropiedadUpdatePageModule)
    },
    ]
  },
  {
    path: 'pagos',
    children: [
      {
        path: ':contratoId',
        loadChildren: () => import('../app/pagos/pagos.module').then(m => m.PagosPageModule)
      },
    ]
  },

  {
    path: 'locadores',
    loadChildren: () => import('./locadores/locadores.module').then( m => m.LocadoresPageModule)
  },

  {
    path: 'contratos',
    loadChildren: () => import('./contratos/contratos.module').then( m => m.ContratosPageModule)
  },

  {
    path: 'garantes',
    loadChildren: () => import('./garantes/garantes.module').then( m => m.GarantesPageModule)
  },

  {
    path: 'inquilinos',
    loadChildren: () => import('./inquilinos/inquilinos.module').then( m => m.InquilinosPageModule)
  },

  {
    path: 'proveedores',
    loadChildren: () => import('./proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
  },

  {
    path: 'detalle_caja',
    loadChildren: () => import('./caja/caja.module').then( m => m.CajaPageModule)
  },

  {
    path: 'lista_alquileres',
    loadChildren: () => import('./lista-alquileres/lista-alquileres.module').then( m => m.ListaAlquileresPageModule)
  },

  {
    path: 'reportes',
    loadChildren: () => import('./reportes/reporte.module').then( m => m.ReportePageModule)
  },

  {
    path: 'avisos',
    loadChildren: () => import('./avisos/aviso.module').then( m => m.AvisoPageModule)
  },

  {
    path: 'pagos',
    children: [
      {
        path: ':contratoId',
        children: [
          {
          path: ':pagoId',
          loadChildren: () => import('./pagos/pago-detalle/pago-detalle.module').then(m => m.PagoDetallePageModule)
          },
        ]
    },
    ],
  },

  {
    path: 'pago-update',
    children: [
      {
        path: ':contratoId',
        children: [
          {
          path: ':pagoId',
          loadChildren: () => import('./pagos/pago-update/pago-update.module').then(m => m.PagoUpdatePageModule)
          },
        ]
    },
    ],
  },
  {
    path: 'locador-detalle',
    loadChildren: () => import('./locadores/locador-detalle/locador-detalle.module').then( m => m.LocadorDetallePageModule)
  },
  {
    path: 'locador-add',
    loadChildren: () => import('./locadores/locador-add/locador-add.module').then( m => m.LocadorAddPageModule)
  },
  {
    path: 'locador-update',
    children: [
      {
        path: ':locadorId',
        loadChildren: () => import('./locadores/locador-update/locador-update.module').then(m => m.LocadorUpdatePageModule)
    },
    ]
  },

  {
    path: 'garante-detalle',
    loadChildren: () => import('./garantes/garante-detalle/garante-detalle.module').then( m => m.GaranteDetallePageModule)
  },
  {
    path: 'garante-add',
    loadChildren: () => import('./garantes/garante-add/garante-add.module').then( m => m.GaranteAddPageModule)
  },
   {
    path: 'garante-update',
    children: [
      {
        path: ':garanteId',
        loadChildren: () => import('./garantes/garante-update/garante-update.module').then(m => m.GaranteUpdatePageModule)
    },
    ]
  },

  {
    path: 'inquilino-add',
    loadChildren: () => import ('./inquilinos/inquilino-add/inquilino-add.module').then ( m => m.InquilinoAddPageModule)
  },
  {
    path: 'inquilino-update',
    children: [
      {
        path: ':inquilinoId',
        loadChildren: () => import('./inquilinos/inquilino-update/inquilino-update.module').then(m => m.InquilinoUpdatePageModule)
    },
    ]
  },

  {
    path: 'proveedor-add',
    loadChildren: () => import ('./proveedores/proveedor-add/proveedor-add.module').then ( m => m.ProveedorAddPageModule)
  },
  {
    path: 'proveedor-update',
    children: [
      {
        path: ':proveedorId',
        loadChildren: () => import('./proveedores/proveedor-update/proveedor-update.module').then(m => m.ProveedorUpdatePageModule)
    },
    ]
  },

  {
    path: 'contrato-add',
    loadChildren: () => import ('./contratos/contrato-add/contrato-add.module').then (m => m.ContratoAddPageModule)
  },

  {
    path: 'pago-add',
    children: [
      {
        path: ':pagoId',
        loadChildren: () => import('./pagos/pago-add/pago-add.module').then(m => m.PagoAddPageModule)
    },
    ]
  },

  {
    path: 'movimientos',
    loadChildren: () => import('./caja/movimientos/movimientos.module').then( m => m.MovimientosPageModule)
  },
  {
    path: 'caja-pagos',
    loadChildren: () => import('./caja/pagos/pagos.module').then( m => m.PagosPageModule),
  },

  {
    path: 'reporte-update',
    children: [
      {
        path: ':reporteId',
        loadChildren: () => import('./reportes/reporte-update/reporte-update.module').then(m => m.ReporteUpdatePageModule)
      }
    ]
  },
  {
    path: 'reportes',
    children: [
      {
        path: ':reporteId',
        loadChildren: () => import('./reportes/reporte-detalle/reporte-detalle.module').then(m => m.ReporteDetallePageModule)
      }
    ]
  },
  {
    path: 'reporte-add',
    loadChildren: () => import('./reportes/reporte-add/reporte-add.module').then(m => m.ReporteAddPageModule)
  },

  {
    path: 'aviso-add',
    loadChildren: () => import('./avisos/aviso-add/aviso-add.module').then( m => m.AvisoAddPageModule)
  },
  {
    path: 'avisos',
    children: [
      {
        path: ':avisoId',
        loadChildren: () => import('./avisos/aviso-detalle/aviso-detalle.module').then(m => m.AvisoDetallePageModule)
      }
    ]
  },
  {
    path: 'aviso-update',
    children: [
      {
        path: ':avisoId',
        loadChildren: () => import('./avisos/aviso-update/aviso-update.module').then(m => m.AvisoUpdatePageModule)
      }
    ]
  },

  {
    path: 'alquiler-c',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./lista-alquileres/alquileres-cobrados/alquileres-cobrados.module').then(m => m.AlquileresCobradosPageModule)
  },
  {
    path: 'alquiler-p',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./lista-alquileres/alquileres-pendientes/alquileres-pendientes.module').then(m => m.AlquileresPendientesPageModule)
  },
  {
    path: 'alquiler-v',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./lista-alquileres/alquileres-vencimiento/alquileres-vencimiento.module').then(m => m.AlquileresVencimientoPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
