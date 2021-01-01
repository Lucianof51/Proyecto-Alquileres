from rest_framework import serializers

from modelos.models import Locador, Propiedad, Inquilino, Garante, Contrato, Proveedor, Pago

class LocadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Locador
        fields = ('id', 'nombre', 'apellido', 'DNI', 'CUIT', 'telefono', 'direccion', 
        'email', 'cuenta_bancaria')

class PropiedadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Propiedad
        fields = ('id', 'ubicacion', 'estado', 'tipo')

        
class InquilinoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquilino
        fields = ('id', 'nombre', 'apellido', 'DNI', 'CUIT', 'telefono', 'direccion', 
        'email', 'cuenta_bancaria')

class GaranteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Garante
        fields = ('id', 'nombre', 'apellido', 'DNI', 'CUIT', 'telefono', 'direccion', 
        'email', 'cuenta_bancaria') 
        
class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = ('id', 'nombre', 'apellido', 'DNI', 'CUIT', 'telefono', 'direccion', 
        'email', 'cuenta_bancaria')   
        
               
class ContratoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contrato
        fields = ('id', 'valor', 'honorarios', 'punitorios', 'fecha_ingreso', 'fecha_egreso', 'fecha_rescision', 
        'tipo_contrato', 'vencimiento_pago', 'propiedad', 'locador', 'inquilino', 'garante')

class PagoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pago
        fields = ('id', 'monto', 'honorarios', 'punitorios', 'fecha_pago', 'agua', 'luz', 'gas', 'expensas', 'contrato')
