from django.db import models

class Locador (models.Model):

    nombre=models.CharField(max_length=30, null=True)
    apellido=models.CharField(max_length=30, null=True)
    DNI=models.CharField(max_length=30, null=True)
    CUIT=models.IntegerField(null=True)
    telefono=models.IntegerField(null=True)
    direccion=models.CharField(max_length=30, null=True)
    email=models.EmailField(max_length=30, null=True)
    cuenta_bancaria=models.CharField(max_length=30, null=True)

    def __str__(self):
        return (self.nombre)

class Propiedad (models.Model):

    ubicacion=models.CharField(max_length=30, null=True)
    estado=models.CharField(max_length=30, null=True)
    tipo=models.CharField(max_length=30, null=True)
  
    def __str__(self):
        return (self.ubicacion)

class Inquilino (models.Model):

    nombre=models.CharField(max_length=30, null=True)
    apellido=models.CharField(max_length=30, null=True)
    DNI=models.CharField(max_length=30, null=True)
    CUIT=models.IntegerField(null=True)
    telefono=models.IntegerField(null=True)
    direccion=models.CharField(max_length=30,null=True)
    email=models.EmailField(max_length=30,null=True)
    cuenta_bancaria=models.CharField(max_length=30,null=True)
    
    def __str__(self):
        return (self.nombre)

class Garante (models.Model):

    nombre=models.CharField(max_length=30,null=True)
    apellido=models.CharField(max_length=30,null=True)
    DNI=models.CharField(max_length=30,null=True)
    CUIT=models.IntegerField(null=True)
    telefono=models.IntegerField(null=True)
    direccion=models.CharField(max_length=30,null=True)
    email=models.EmailField(max_length=30,null=True)
    cuenta_bancaria=models.CharField(max_length=30,null=True)
    
    def __str__(self):
        return (self.nombre)  

class Proveedor (models.Model):
    nombre=models.CharField(max_length=30,null=True)
    apellido=models.CharField(max_length=30,null=True)
    DNI=models.CharField(max_length=30,null=True)
    CUIT=models.IntegerField(null=True)
    telefono=models.IntegerField(null=True)
    direccion=models.CharField(max_length=30,null=True)
    email=models.EmailField(max_length=30,null=True)
    cuenta_bancaria=models.CharField(max_length=30,null=True)
    
    def __str__(self):
        return (self.nombre)  

class Contrato (models.Model):

    valor=models.FloatField(max_length=30,null=True)
    honorarios=models.FloatField(max_length=30,null=True)
    punitorios=models.FloatField(max_length=30,null=True, blank=True)
    fecha_ingreso=models.DateField(null=True)
    fecha_egreso=models.DateField(null=True)
    fecha_rescision=models.DateField(null=True,blank=True)
    tipo_contrato=models.CharField(max_length=30,null=True)
    vencimiento_pago=models.DateField(null=True)
    
    propiedad = models.ForeignKey(
        Propiedad, 
        on_delete=models.CASCADE,
      
    )
    
    locador = models.ForeignKey(
        Locador, 
        on_delete=models.CASCADE,
        
    )
    
    inquilino = models.ForeignKey(
        Inquilino, 
        on_delete=models.CASCADE,
       
    )
    
    garante = models.ForeignKey(
        Garante, 
        on_delete=models.CASCADE,
      
    )
    
class Pago (models.Model):

    monto=models.FloatField(max_length=30,null=True)
    honorarios=models.FloatField(max_length=30,null=True)
    punitorios=models.FloatField(max_length=30,null=True)
    fecha_pago=models.DateField()
    agua=models.FloatField(max_length=30,null=True, blank=True)
    luz=models.FloatField(max_length=30,null=True, blank=True)
    gas=models.FloatField(max_length=30,null=True, blank=True)
    expensas=models.FloatField(max_length=30,null=True, blank=True)
    
    contrato=models.ForeignKey(Contrato, on_delete=models.CASCADE)

class Cierre_de_caja (models.Model):

    ingreso=models.FloatField(max_length=30,null=True)
    egreso=models.FloatField(max_length=30,null=True)
    descripcion=models.CharField(max_length=100,null=True, blank=True)
    fecha=models.DateField()

    propiedad = models.ForeignKey(
        Propiedad, 
        on_delete=models.CASCADE,
      
    )
    
    locador = models.ForeignKey(
        Locador, 
        on_delete=models.CASCADE,
        
    )
    
    inquilino = models.ForeignKey(
        Inquilino, 
        on_delete=models.CASCADE,
       
    )
    
class Reporte (models.Model):
    descripcion=models.CharField(max_length=100,null=True)
    estado=models.CharField(max_length=30,null=True)
    fecha=models.DateField()

    proveedor=models.ForeignKey(Proveedor,on_delete=models.CASCADE)
    propiedad = models.ForeignKey(Propiedad, on_delete=models.CASCADE)

class Aviso (models.Model):
    locador = models.ForeignKey(
        Locador, 
        on_delete=models.CASCADE, 
    )
    
    inquilino = models.ForeignKey(Inquilino,on_delete=models.CASCADE)

    motivo=models.CharField(max_length=30, null=True)
    descripcion=models.CharField(max_length=100,null=True)
    fecha=models.DateField()

class Comprobante_electronico(models.Model):
    tipo_de_comprobante=models.CharField(max_length=30, null=True)
    tipo_de_documento=models.CharField(max_length=30,null=True)
    DNI=models.CharField(max_length=30,null=True)
    CUIL=models.CharField(max_length=30, null=True)
    IVA=models.CharField(max_length=30, null=True)
    
    inquilino = models.ForeignKey(
        Inquilino, 
        on_delete=models.CASCADE  
    )