from django.db import models

# Create your models here.


class Contact(models.Model):
    name = models.CharField(max_length=100, null=False)
    email = models.EmailField(max_length=254, null=False)
    subject = models.CharField(max_length=100, null=True)
    message = models.TextField()


class FileAdmin(models.Model):
    adminupload = models.FileField(upload_to='media')
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title
