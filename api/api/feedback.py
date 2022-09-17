from flask import Blueprint
from apifairy import  body, response

from api.decorators import paginated_response
from api.schemas import FeedbackSchema
from api.email import send_email

feedback = Blueprint('feedback', __name__)
feedback_schema = FeedbackSchema()


@feedback.route('/feedback', methods=['POST'])
@body(feedback_schema)
@response(feedback_schema, 201)
def new(args):
    """Send feedback email"""
    
    # send email
    email_data = {
        'subject': 'Hello from PRMN',
        'to': 'test@test.com',
        'body': 'You have succesfuly subscribed to recieve displacement alerts.'
    }
    send_email('mureiken@gmail.com', "Feedback Form", "Testing")
    
    return None


