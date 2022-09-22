import json
from flask import Blueprint
from apifairy import  body, response, other_responses
from api.functions import  get_total_violation_cases, get_top_violation_categories ,\
    get_top_responses, get_top_perpetrator_groups, get_filtered_daily_protection_data, \
    get_daily_protection_cases_series, get_weekly_protection_cases

from api.schemas import ProtectionDataSchema

protection_data = Blueprint('protection_data', __name__)
protection_data_schema = ProtectionDataSchema()

@protection_data.route('/protection-data/<period>/<regions>/<violations>/<perpetrators>', methods=['GET'])
@body(protection_data_schema)
@response(protection_data_schema, 201)
@other_responses({404: 'Protection data with provided parameters does not exist'})
def all(self, period, regions, violations, perpetrators):
    
    geojson = get_filtered_daily_protection_data(period, regions, violations, perpetrators)
    
    total_violation_cases = get_total_violation_cases(period, regions, violations, perpetrators)
    top_violation_categories = json.loads(get_top_violation_categories(period, regions, violations, perpetrators))
    top_responses = json.loads(get_top_responses(period, regions, violations, perpetrators))
    top_perpetrator_groups = json.loads(get_top_perpetrator_groups(period, regions, violations, perpetrators))
    weekly_cases = json.loads(get_weekly_protection_cases(period, regions, violations, perpetrators))
    daily_cases=json.loads(get_daily_protection_cases_series(period, regions, violations, perpetrators))
    
    
    allPart = "{\"total_violation_cases\":  " + json.dumps(total_violation_cases) + ",\"top_violation_categories\":  " + json.dumps(top_violation_categories) + ",\"top_perpetrator_groups\": " + json.dumps(top_perpetrator_groups) + ",\"top_responses\": " + json.dumps(top_responses) +  ",\"z_daily_cases\": " + json.dumps(daily_cases) + ",\"weekly_cases\":  " + json.dumps(weekly_cases) + ",\"geojson\":"  + json.dumps(geojson) + "}"
    return json.loads(allPart)
