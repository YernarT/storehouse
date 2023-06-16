from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK,HTTP_201_CREATED,HTTP_202_ACCEPTED,HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND

class ResponseFormatMiddleware:
    '''统一响应数据的格式'''

    def __init__(self, get_response):
        self.get_response = get_response
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        response_template = self.response_template

        # DRF Level Error
        if isinstance(response, Response):
            if response.status_code not in (HTTP_200_OK, HTTP_201_CREATED, HTTP_202_ACCEPTED, HTTP_204_NO_CONTENT):
                response_template['is_ok'] = False
                response_template = { **response_template, **response.data }
            else:
                if not isinstance(response.data, dict):
                    response.data = { 'data': response.data }
                response_template = { **response_template, **response.data }
        # Django Level Error
        else:
            response_template['is_ok'] = False
            # 404
            if response.status_code == HTTP_404_NOT_FOUND:
                response_template['message'] = 'Ресурс жоқ'
            else:
                response_template['message'] = 'Серверлік ерекше жағдай'
            
        return JsonResponse(data=response_template, status=response.status_code)

    @property
    def response_template(self):
        return {
        'is_ok': True,
        're_login': False,
        'data': None,
        'message': ''
    }