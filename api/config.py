import os
from dotenv import load_dotenv

load_dotenv()
basedir = os.path.abspath(os.path.dirname(__file__))


def as_bool(value):
    if value:
        return value.lower() in ['true', 'yes', 'on', '1']
    return False


class Config:
    # database options
    ALCHEMICAL_DATABASE_URL = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'db.sqlite')
    ALCHEMICAL_ENGINE_OPTIONS = {'echo': as_bool(os.environ.get('SQL_ECHO'))}

    # security options
    SECRET_KEY = os.environ.get('SECRET_KEY', 'top-secret!')
    DISABLE_AUTH = as_bool(os.environ.get('DISABLE_AUTH'))
    ACCESS_TOKEN_MINUTES = int(os.environ.get('ACCESS_TOKEN_MINUTES') or '15')
    REFRESH_TOKEN_DAYS = int(os.environ.get('REFRESH_TOKEN_DAYS') or '7')
    REFRESH_TOKEN_IN_COOKIE = as_bool(os.environ.get(
        'REFRESH_TOKEN_IN_COOKIE') or 'yes')
    REFRESH_TOKEN_IN_BODY = as_bool(os.environ.get('REFRESH_TOKEN_IN_BODY'))
    RESET_TOKEN_MINUTES = int(os.environ.get('RESET_TOKEN_MINUTES') or '15')
    PASSWORD_RESET_URL = os.environ.get('PASSWORD_RESET_URL') or \
        'http://localhost:3000/reset'
    USE_CORS = as_bool(os.environ.get('USE_CORS') or 'yes')
    CORS_SUPPORTS_CREDENTIALS = True

    # API documentation
    APIFAIRY_TITLE = 'PRMN API'
    APIFAIRY_VERSION = '1.0'
    APIFAIRY_UI = os.environ.get('DOCS_UI', 'elements')
    API_KEY_UNHCR=os.environ.get('UNHCR_API_SECRET_KEY')

    # email options
    # MAIL_SERVER = os.environ.get('MAIL_SERVER', 'localhost')
    # MAIL_PORT = int(os.environ.get('MAIL_PORT') or '25')
    # MAIL_USE_TLS = as_bool(os.environ.get('MAIL_USE_TLS'))
    # MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
    # MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
    # MAIL_DEFAULT_SENDER=os.environ.get('MAIL_DEFAULT_SENDER',
    #                                    'donotreply@microblog.example.com')
    
    MAIL_SERVER ='smtp.mailtrap.io'
    MAIL_PORT = 587
    MAIL_USERNAME  = 'b0dd6d5212ef50'
    MAIL_PASSWORD = '4e026b04812db1'
    MAIL_USE_TLS  = True
    MAIL_USE_SSL  = False
    MAIL_DEFAULT_SENDER ='mureiken@gmail.com'
    
    CELERY_BROKER_URL = 'redis://localhost:6379/0'
    CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
