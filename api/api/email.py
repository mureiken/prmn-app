from threading import Thread

from flask import current_app, render_template
from flask_mail import Message


from api.app import mail
from api.app import celery

@celery.task
def send_async_email(app, to, subject, body, **kwargs):
    with app.app_context():  # pragma: no cover
        msg = Message(subject, recipients=[to])
        msg.body = body
        #msg.html = render_template(template + '.html', **kwargs)
        mail.send(msg)


def send_email(to, subject, body, **kwargs):  # pragma: no cover
    app = current_app._get_current_object()
    thread = Thread(target=send_async_email, args=(app, to, subject, body),
                    kwargs=kwargs)
    thread.start()
    return thread
