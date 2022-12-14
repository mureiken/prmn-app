from flask import Flask, redirect, url_for, request
from alchemical.flask import Alchemical
from flask_migrate import Migrate
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from flask_mail import Mail
from apifairy import APIFairy
from celery import Celery
from config import Config




db = Alchemical()
migrate = Migrate()
ma = Marshmallow()
cors = CORS()
mail = Mail()
apifairy = APIFairy()
celery = Celery(__name__, broker=Config.CELERY_BROKER_URL)


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # extensions
    from api import models
    db.init_app(app)
    migrate.init_app(app, db)
    ma.init_app(app)
    if app.config['USE_CORS']:  # pragma: no branch
        cors.init_app(app)
    mail.init_app(app)
    apifairy.init_app(app)
    celery.conf.update(app.config)
   

    # blueprints
    from api.errors import errors
    app.register_blueprint(errors)
    from api.tokens import tokens
    app.register_blueprint(tokens, url_prefix='/api')
    from api.users import users
    app.register_blueprint(users, url_prefix='/api')
    # from api.posts import posts
    # app.register_blueprint(posts, url_prefix='/api')
    from api.donors import donors
    app.register_blueprint(donors, url_prefix='/api')
    from api.publications import publications
    app.register_blueprint(publications, url_prefix='/api')
    from api.displacement_data import displacement_data
    app.register_blueprint(displacement_data, url_prefix='/api')
    from api.partner_displacement_data import partner_displacement_data
    app.register_blueprint(partner_displacement_data, url_prefix='/api')
    from api.protection_data import protection_data
    app.register_blueprint(protection_data, url_prefix='/api')
    from api.partner_protection_data import partner_protection_data
    app.register_blueprint(partner_protection_data, url_prefix='/api')
    from api.subscribers import subscribers
    app.register_blueprint(subscribers, url_prefix='/api')
    from api.feedback import feedback
    app.register_blueprint(feedback, url_prefix='/api')
    from api.fake import fake
    app.register_blueprint(fake)
    
    # Debugging.
    # if app.debug:
    #     from werkzeug.middleware.profiler import ProfilerMiddleware
    #     app.config["PROFILE"] = True
    #     app.wsgi_app = ProfilerMiddleware(app.wsgi_app, restrictions=[30],  profile_dir='./profile')

    # define the shell context
    @app.shell_context_processor
    def shell_context():  # pragma: no cover
        ctx = {'db': db}
        for attr in dir(models):
            model = getattr(models, attr)
            if hasattr(model, '__bases__') and \
                    db.Model in getattr(model, '__bases__'):
                ctx[attr] = model
        return ctx

    @app.route('/')
    def index():  # pragma: no cover
        return redirect(url_for('apifairy.docs'))

    @app.after_request
    def after_request(response):
        # Werkzeu sometimes does not flush the request body so we do it here
        request.get_data()
        return response

    return app
