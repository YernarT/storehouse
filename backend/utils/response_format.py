from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK,HTTP_201_CREATED,HTTP_202_ACCEPTED,HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND

class ResponseFormatMiddleware:
    '''统一响应数据的格式'''

    response_template = {
        'is_ok': True,
        're_login': False,
        'data': None,
        'message': ''
    }

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        # DRF Level Error
        if isinstance(response, Response):
            if response.status_code not in (HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT):
                self.response_template['is_ok'] = False
                self.response_template = { **self.response_template, **response.data }
            else:
                self.response_template = { **self.response_template, **response.data }
        # Django Level Error
        else:
            self.response_template['is_ok'] = False
            # 404
            if response.status_code == HTTP_404_NOT_FOUND:
                self.response_template['message'] = 'Ресурс жоқ'
            else:
                self.response_template['message'] = 'Серверлік ерекше жағдай'
            
        return JsonResponse(data=self.response_template, status=response.status_code)