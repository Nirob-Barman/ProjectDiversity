from django.urls import path
from .views import UploadedFileListCreateView, FileListView, download_file

urlpatterns = [
    path('files/', UploadedFileListCreateView.as_view(), name='file-list-create'),
    path('file-list/', FileListView.as_view(), name='file-list'),
    path('file-download/<int:file_id>/', download_file, name='file-download'),
]
