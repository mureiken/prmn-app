import json
import pandas as pd
from flask import Blueprint
from apifairy import  body, response, other_responses
from api.functions import get_partner_protection_data

from api.schemas import PartnerProtectionData

partner_protection_data = Blueprint('partner_protection_data', __name__)
partner_protection_data_schema = PartnerProtectionData()


@partner_protection_data.route('/partner-protection-data/<period>/<regions>/<violations>/<perpetrators>', methods=['GET'])
#@partner_protection_data.route('/partner-protection-data/<period>/<regions>/<violations>/<perpetrators>/<start>/<end>', methods=['GET'])
# @body(partner_Protection_data_schema)
# @response(partner_Protection_data_schema, 201)
@other_responses({404: 'Protection data with provided parameters does not exist'})
def all (period, regions, violations, perpetrators):
    """Retrieve Protection data""" 
    
    #args = (regions, violations, perpetrators, period)
    
    allPart = get_partner_protection_data(period, regions, violations, perpetrators)
    
    return allPart



