import json
from flask import Blueprint
from apifairy import  body, response, other_responses
from api.functions import  get_total_violation_cases, get_top_violation_categories ,\
    get_top_responses, get_top_perpetrator_groups, get_filtered_daily_protection_data, \
    get_daily_protection_cases_series, get_weekly_protection_cases

from api.schemas import ProtectionDataSchema

protection_data = Blueprint('protection_data', __name__)
protection_data_schema = ProtectionDataSchema()

@protection_data.route('/protection-data/<regions>/<violations>/<perpetrators>/<period>', defaults={'start': None, 'end': None}, methods=['GET'])
@protection_data.route('/protection-data/<regions>/<violations>/<perpetrators>/<period>/<start>/<end>', methods=['GET'])

@body(protection_data_schema)
@response(protection_data_schema, 201)
@other_responses({404: 'Protection data with provided parameters does not exist'})
def all(self, regions, violations, perpetrators, period,  *args, **kwargs):
    
    args = (regions, violations, perpetrators, period)
    
    geojson = get_filtered_daily_protection_data(*args, **kwargs)
    
    total_violation_cases = get_total_violation_cases(*args, **kwargs)
    top_violation_categories = json.loads(get_top_violation_categories(*args, **kwargs))
    top_responses = json.loads(get_top_responses(*args, **kwargs))
    top_perpetrator_groups = json.loads(get_top_perpetrator_groups(*args, **kwargs))
    weekly_cases = json.loads(get_weekly_protection_cases(*args, **kwargs))
    daily_cases=json.loads(get_daily_protection_cases_series(*args, **kwargs))
    
    
    allPart = "{\"total_violation_cases\":  " + json.dumps(total_violation_cases) + ",\"top_violation_categories\":  " + json.dumps(top_violation_categories) + ",\"top_perpetrator_groups\": " + json.dumps(top_perpetrator_groups) + ",\"top_responses\": " + json.dumps(top_responses) +  ",\"z_daily_cases\": " + json.dumps(daily_cases) + ",\"weekly_cases\":  " + json.dumps(weekly_cases) + ",\"geojson\":"  + json.dumps(geojson) + "}"
    return json.loads(allPart)
