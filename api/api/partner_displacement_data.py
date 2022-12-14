import json
from urllib.parse  import unquote_plus,unquote
import pandas as pd
from flask import Blueprint
from apifairy import  body, response, other_responses
from api.functions import get_partner_displacement_data

from api.schemas import PartnerDisplacementData

partner_displacement_data = Blueprint('partner_displacement_data', __name__)
partner_displacement_data_schema = PartnerDisplacementData()


@partner_displacement_data.route('/partner-displacement-data/<current_regions>/<current_districts>/<previous_regions>/<previous_districts>/<needs>/<causes>/<period>', defaults={'start': None, 'end': None}, methods=['GET'])
@partner_displacement_data.route('/partner-displacement-data/<current_regions>/<current_districts>/<previous_regions>/<previous_districts>/<needs>/<causes>/<period>/<start>/<end>', methods=['GET'])
# @body(partner_displacement_data_schema)
# @response(partner_displacement_data_schema, 201)
@other_responses({404: 'Partner Displacement data with provided parameters does not exist'})
def all (current_regions, current_districts, previous_regions, previous_districts, needs, causes, period, *args, **kwargs):
    """Retrieve displacement data""" 
    needs = unquote(unquote_plus(needs))
    causes = unquote(unquote_plus(causes))
    args = (current_regions, current_districts, previous_regions, previous_districts, needs, causes, period)
    
    allPart = get_partner_displacement_data(*args, **kwargs)
    
    return allPart



