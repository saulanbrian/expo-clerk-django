from django.urls import re_path

from .consumers import UserChannelConsumer

ws_urlpatterns = [
    re_path('ws/user_channel',UserChannelConsumer.as_asgi())
]
