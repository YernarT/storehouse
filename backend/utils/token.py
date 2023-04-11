from base64 import b64encode, b64decode

from user.models import User


def create_token(user_id: int) -> str:
    user_id_bytes = str(user_id).encode('ascii')
    base64_bytes = b64encode(user_id_bytes)
    return base64_bytes.decode('ascii')


def check_token(encoded: str):

    base64_bytes = encoded.encode('ascii')
    user_id_bytes = b64decode(base64_bytes)
    user_id = user_id_bytes.decode('ascii')
    
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return False
