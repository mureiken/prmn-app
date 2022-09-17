import json
import pandas as pd
from flask import Blueprint
from apifairy import  body, response, other_responses
from api.functions import get_total_arrivals, get_top_displacement_regions, get_top_displacement_needs \
    , get_top_displacement_causes, get_filtered_daily_displacement_data, current_settlement_arrival_details \
        , get_weekly_displacement

from api.schemas import DisplacementDataSchema, DisplacementDetailsSchema

displacement_data = Blueprint('displacement_data', __name__)
displacement_data_schema = DisplacementDataSchema()
displacement_details_schema = DisplacementDetailsSchema(many=True)

@displacement_data.route('/displacement-data/<regions>/<needs>/<causes>/<period>', defaults={'start': None, 'end': None}, methods=['GET'])
@displacement_data.route('/displacement-data/<regions>/<needs>/<causes>/<period>/<start>/<end>', methods=['GET'])
@body(displacement_data_schema)
@response(displacement_data_schema, 201)
@other_responses({404: 'Displacement data with provided parameters does not exist'})
def all(self, regions, needs, causes, period, *args, **kwargs):
    """Retrieve displacement data""" 
    
    args = (regions, needs, causes, period)
    total_arrivals = get_total_arrivals(*args, **kwargs)
    top_displacement_needs = json.loads(get_top_displacement_needs(*args, **kwargs))
    top_displacement_regions = json.loads(get_top_displacement_regions(*args, **kwargs))
    top_displacement_causes = json.loads(get_top_displacement_causes(*args, **kwargs))
    weekly_displacement = json.loads(get_weekly_displacement(*args, **kwargs))
    geojson = get_filtered_daily_displacement_data(*args, **kwargs)
    
    allPart = "{\"total_arrivals\":  " + total_arrivals + ",\"top_needs\":  " + json.dumps(top_displacement_needs) + ",\"top_regions\": " + json.dumps(top_displacement_regions) + ",\"top_causes\": " + json.dumps(top_displacement_causes) + ",\"weekly_displacement\": " + json.dumps(weekly_displacement) + ",\"geojson\":"  + json.dumps(geojson) + "}"
    return json.loads(allPart)



@displacement_data.route('/displacement-data/details/<currentsettlement>/<arrival_date>', methods=['GET'])
# @body(displacement_details_schema)
# @response(displacement_details_schema, 201)
# @other_responses({404: 'Displacement data with provided parameters does not exist'})
def details(currentsettlement, arrival_date):
    """Retrieve displacement details by current settlement and arrival date"""
    displacement_details = current_settlement_arrival_details(currentsettlement, arrival_date)
    
    return displacement_details