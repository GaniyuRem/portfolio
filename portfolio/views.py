from django.shortcuts import render
from django.views import generic
from django.http import JsonResponse, HttpResponse
from django.core.mail import send_mail
from portfolio.models import Contact, FileAdmin
# Create your views here.


def index(request):
    context = {'file': FileAdmin.objects.all()}
    template = 'index.html'
    if request.method == "POST":
        full_name = request.POST.get("name")
        email = request.POST.get("email")
        subject = request.POST.get("subject")
        message = request.POST.get("message_box")
        Contact(name=full_name, email=email,
                subject=subject, message=message).save()
        message = f'{full_name} has sent you a Message !\n\n\n\n\n{message}\n\n\nFrom: {email}\n\n\n\n'
        send_mail(subject, message, '', ['gospelearth@gmail.com'])
        return JsonResponse({"result": "success", "message": "We have <Strong> successfully </Strong> received your message. We'll get back to you soon."})
    return render(request, template, context)


def download(request, path):
    file_path = os.path.join(settings.MEDIA_ROOT, path)
    print(path)
    if os.path.exists(file_path):
        with open(file_path, 'rb')as fh:
            response = HttpResponse(
                fh.read(), content_type="application/adminupload")
            response['Content-Dispostion'] = 'inline;filename=' + \
                os.path.basename(file_path)
            return response

    raise Http404
