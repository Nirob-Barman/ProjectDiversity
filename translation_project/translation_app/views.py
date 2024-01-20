from rest_framework import generics
from .models import UploadedFile
from .serializers import UploadedFileSerializer
from django.views.generic import TemplateView
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from django.views import View
from .models import UploadedFile


class UploadedFileListCreateView(generics.ListCreateAPIView):
    queryset = UploadedFile.objects.all()
    serializer_class = UploadedFileSerializer


class FileListView(TemplateView):
    template_name = 'file_list.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['files'] = UploadedFile.objects.all()
        return context


class FileDownloadView(View):
    def get(self, request, file_id):
        uploaded_file = get_object_or_404(UploadedFile, id=file_id)
        response = FileResponse(uploaded_file.file)
        response['Content-Disposition'] = f'attachment; filename="{
            uploaded_file.file.name}"'
        return response


download_file = FileDownloadView.as_view()
