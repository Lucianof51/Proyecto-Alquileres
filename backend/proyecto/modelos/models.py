from django.db import models

def upload_path(instance, filname):
    return '/'.join(['covers', str(instance.descripcion), filname])

def upload_path2(instance, filname):
    return '/'.join(['covers', str(instance.ubicacion), filname])

class Locador (models.Model):
    id=models.AutoField(primary_key=True)
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
    id=models.AutoField(primary_key=True)
    ubicacion=models.CharField(max_length=30, null=True)
    estado=models.CharField(max_length=30, null=True)
    tipo=models.CharField(max_length=30, null=True)
    locador = models.ForeignKey(
        Locador, 
        on_delete=models.CASCADE, 
    )
    inventario=models.CharField(max_length=100000, null=True, blank=True)
    imagen = models.ImageField(blank=True, null=True, upload_to=upload_path2)
    imagen2 = models.ImageField(blank=True, null=True, upload_to=upload_path2)
    imagen3 = models.ImageField(blank=True, null=True, upload_to=upload_path2)
    imagen4 = models.ImageField(blank=True, null=True, upload_to=upload_path2)
  
    def __str__(self):
        return (self.ubicacion)

class Inquilino (models.Model):
    id=models.AutoField(primary_key=True)
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
    id=models.AutoField(primary_key=True)
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
    id=models.AutoField(primary_key=True)
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
    id=models.AutoField(primary_key=True)
    valor=models.FloatField(max_length=30,null=True)
    honorarios=models.FloatField(max_length=30,null=True)
    punitorios=models.FloatField(max_length=30,null=True, blank=True)
    fecha_ingreso=models.DateField(null=True)
    fecha_egreso=models.DateField(null=True)
    fecha_rescision=models.DateField(null=True,blank=True)
    tipo_contrato=models.CharField(max_length=30,null=True, blank=True)
    vencimiento_pago=models.FloatField(null=True)
    
    propiedad = models.OneToOneField(
        Propiedad, 
        on_delete=models.DO_NOTHING,
      
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
    id=models.AutoField(primary_key=True)
    monto=models.FloatField(max_length=30,null=True)
    honorarios=models.FloatField(max_length=30,null=True)
    punitorios=models.FloatField(max_length=30,null=True)
    fecha_pago=models.DateField()
    agua=models.FloatField(max_length=30,null=True, blank=True)
    luz=models.FloatField(max_length=30,null=True, blank=True)
    gas=models.FloatField(max_length=30,null=True, blank=True)
    expensas=models.FloatField(max_length=30,null=True, blank=True)
    tasas1desc=models.CharField(max_length=30,null=True, blank=True)
    tasas1=models.FloatField(max_length=30,null=True, blank=True)
    tasas2desc=models.CharField(max_length=30,null=True, blank=True)
    tasas2=models.FloatField(max_length=30,null=True, blank=True)
    tasas3desc=models.CharField(max_length=30,null=True, blank=True)
    tasas3=models.FloatField(max_length=30,null=True, blank=True)
    tasas4desc=models.CharField(max_length=30,null=True, blank=True)
    tasas4=models.FloatField(max_length=30,null=True, blank=True)
    
    contrato=models.ForeignKey(Contrato, on_delete=models.CASCADE)

class Cierre_de_caja (models.Model):
    id=models.AutoField(primary_key=True)
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
    id=models.AutoField(primary_key=True)
    descripcion=models.CharField(max_length=100,null=True)
    estado=models.CharField(max_length=30,null=True)
    fecha=models.DateField()
    proveedor=models.ForeignKey(Proveedor,on_delete=models.CASCADE)
    propiedad = models.ForeignKey(Propiedad, on_delete=models.CASCADE)
    costo=models.FloatField(max_length=30,null=True)
    imagenNombre = models.CharField(max_length=100, null=True)

class Aviso (models.Model):
    id=models.AutoField(primary_key=True)
    locador = models.ForeignKey(
        Locador, 
        on_delete=models.CASCADE, 
    )
    
    inquilino = models.ForeignKey(Inquilino,on_delete=models.CASCADE)

    motivo=models.CharField(max_length=30, null=True)
    descripcion=models.CharField(max_length=100,null=True)
    fecha=models.DateField()

class Comprobante_electronico(models.Model):
    id=models.AutoField(primary_key=True)
    tipo_de_comprobante=models.CharField(max_length=30, null=True)
    tipo_de_documento=models.CharField(max_length=30,null=True)
    DNI=models.CharField(max_length=30,null=True)
    CUIL=models.CharField(max_length=30, null=True)
    IVA=models.CharField(max_length=30, null=True)
    
    inquilino = models.ForeignKey(
        Inquilino, 
        on_delete=models.CASCADE  
    )

class ReportePrueba (models.Model):
    id=models.AutoField(primary_key=True)
    descripcion=models.CharField(max_length=100,null=True)
    estado=models.CharField(max_length=30,null=True)
    fecha=models.DateField()
    proveedor=models.ForeignKey(Proveedor,on_delete=models.CASCADE)
    propiedad = models.ForeignKey(Propiedad, on_delete=models.CASCADE)
    costo=models.FloatField(max_length=30,null=True)
    cover = models.ImageField(blank=True, null=True, upload_to=upload_path)



class Data(models.Model):
    Nombre = models.CharField(max_length=32, blank=False)
    Edad=models.CharField(max_length=32, blank=False)
    
