from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^locador$', views.LocadorList.as_view()),
    url(r'^locador/(?P<pk>[0-9]+)$', views.LocadorDetail.as_view()),
    url(r'^propiedad$', views.PropiedadList.as_view()),
    url(r'^propiedad/(?P<pk>[0-9]+)$', views.PropiedadDetail.as_view()),
    url(r'^inquilino$', views.InquilinoList.as_view()),
    url(r'^inquilino/(?P<pk>[0-9]+)$', views.InquilinoDetail.as_view()),
    url(r'^garante$', views.GaranteList.as_view()),
    url(r'^garante/(?P<pk>[0-9]+)$', views.GaranteDetail.as_view()),
    url(r'^contrato$', views.ContratoList.as_view()),
    url(r'^contrato/(?P<pk>[0-9]+)$', views.ContratoDetail.as_view()),
    url(r'^proveedor$', views.ProveedorList.as_view()),
    url(r'^proveedor/(?P<pk>[0-9]+)$', views.ProveedorDetail.as_view()),
    url(r'^pago$', views.PagoList.as_view()),
    url(r'^pago/(?P<pk>[0-9]+)$', views.PagoDetail.as_view()),
    
]