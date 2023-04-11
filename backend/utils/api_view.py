from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View

from json import loads as json_loads


class APIView(View):

    @classmethod
    def as_view(cls, **initkwargs):

        view = super().as_view(**initkwargs)
        view.cls = cls
        view.initkwargs = initkwargs

        return csrf_exempt(view)

    def get_params(self, request):
        pass

    def get_data(self, request):
        return json_loads(request.body)
