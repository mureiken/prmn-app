from flask import Blueprint
from apifairy import  body, response

from api import db
from api.models import Subscriber
from api.decorators import paginated_response
from api.schemas import SubscriberSchema
from api.email import send_email
from api.schemas import DateTimePaginationSchema
from api.functions import get_filtered_daily_displacement_alerts

subscribers = Blueprint('subscribers', __name__)
subscriber_schema = SubscriberSchema()
subscribers_schema = SubscriberSchema(many=True)


@subscribers.route('/subscribers', methods=['POST'])
@body(subscriber_schema)
@response(subscriber_schema, 201)
def new(args):
    """Create a new subscriber"""
    subscriber = Subscriber(**args)
    db.session.add(subscriber)
    db.session.commit()
    
    # send email
    email_data = {
        'subject': 'Hello from PRMN',
        'to': 'test@test.com',
        'body': 'You have succesfuly subscribed to recieve displacement alerts.'
    }
    
    #send_email(email_data['to'], email_data['subject'], email_data['body'])
    send_email('mureiken@gmail.com', "Hello test", "subscriber")
    
    return subscriber

@subscribers.route('/subscribers', methods=['GET'])
@response(subscribers_schema)
def all():
    """Retrieve all subscribers"""
    all_subscribers = db.session.query(Subscriber).all()
    return  all_subscribers



@subscribers.route('/subscribers/send', methods=['GET'])
def daily_subs():
    subscribers = db.session.query(Subscriber).where(Subscriber.active==True and Subscriber.daily==True )
     
    for subscriber in subscribers:
        email = subscriber.email

        message = "Daily displacement alerts from PRMN"
        body = get_filtered_daily_displacement_alerts()
        send_email(email, message, body)
    
    return None
    
         