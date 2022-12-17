from flask import Blueprint
from apifairy import  body, response, other_responses


from api import db
from api.models import Donor
from api.schemas import DonorSchema



donors = Blueprint('donors', __name__)
donor_schema = DonorSchema()
donors_schema = DonorSchema(many=True)


@donors.route('/donors', methods=['POST'])
@body(donor_schema)
@response(donor_schema, 201)
def new(args):
    """Create a new donor"""
    donor = Donor(**args)
    db.session.add(donor)
    db.session.commit()

    return donor

@donors.route('/donors', methods=['GET'])
@response(donors_schema)
def all():
    """Retrieve all donors"""
    all_donors = db.session.query(Donor).order_by('donor_name').all()
    return all_donors

@donors.route('/donors/<int:id>', methods=['DELETE'])
# @authenticate(token_auth)
@other_responses({403: 'Not allowed to delete the donor'})
def delete(id):
    """Delete a donor"""
    donor = db.session.get(Donor, id)

    db.session.delete(donor)
    db.session.commit()
    return '', 204



         