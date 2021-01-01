from django.shortcuts import render
from rest_framework import generics
from modelos.models import Locador, Propiedad, Inquilino, Garante, Contrato, Proveedor, Pago
from modelos.serializers import  LocadorSerializer, PropiedadSerializer, InquilinoSerializer, GaranteSerializer, ContratoSerializer, ProveedorSerializer, PagoSerializer

class LocadorList(generics.ListCreateAPIView):
    queryset = Locador.objects.all()
    serializer_class = LocadorSerializer

class LocadorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Locador.objects.all()
    serializer_class = LocadorSerializer

class PropiedadList(generics.ListCreateAPIView):
    queryset = Propiedad.objects.all()
    serializer_class = PropiedadSerializer

class PropiedadDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Propiedad.objects.all()
    serializer_class = PropiedadSerializer

class InquilinoList(generics.ListCreateAPIView):
    queryset = Inquilino.objects.all()
    serializer_class = InquilinoSerializer

class InquilinoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Inquilino.objects.all()
    serializer_class = InquilinoSerializer    

class GaranteList(generics.ListCreateAPIView):
    queryset = Garante.objects.all()
    serializer_class = GaranteSerializer

class GaranteDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Garante.objects.all()
    serializer_class = GaranteSerializer

class ProveedorList(generics.ListCreateAPIView):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

class ProveedorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Proveedor.objects.all()
    serializer_class = ProveedorSerializer

class ContratoList(generics.ListCreateAPIView):
    queryset = Contrato.objects.all()
    serializer_class = ContratoSerializer

class ContratoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Contrato.objects.all()
    serializer_class = ContratoSerializer    

class PagoList(generics.ListCreateAPIView):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer

class PagoDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Pago.objects.all()
    serializer_class = PagoSerializer     