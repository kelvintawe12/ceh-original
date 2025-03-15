from drf_standardized_errors.formatter import ExceptionFormatter
from drf_standardized_errors.types import ErrorResponse
from rest_framework.exceptions import APIException
from rest_framework import status


class MyExceptionFormatter(ExceptionFormatter):
    def format_error_response(self, error_response: ErrorResponse):

        error = error_response.errors[0]
        
        return {"status": "error", "message": error.detail, "field_name": error.attr, "data": None}


class ConflictError(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'Object already exists.'
    default_code = 'conflict_error'
    