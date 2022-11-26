import json
from urllib.parse  import unquote_plus,unquote
import pandas as pd
from flask import Blueprint
from apifairy import  body, response, other_responses
from api.functions import get_total_arrivals, get_top_displacement_regions, get_top_displacement_needs \
    , get_top_displacement_causes, get_filtered_daily_displacement_data, current_settlement_arrival_details \
        , get_weekly_displacement, get_top_displacement_districts, get_top_displacement_settlements

from api.schemas import DisplacementDataSchema, DisplacementDetailsSchema

displacement_data = Blueprint('displacement_data', __name__)
displacement_data_schema = DisplacementDataSchema()
displacement_details_schema = DisplacementDetailsSchema(many=True)

@displacement_data.route('/displacement-data/<current_regions>/<current_districts>/<previous_regions>/<previous_districts>/<needs>/<causes>/<period>', defaults={'start': None, 'end': None}, methods=['GET'])
@displacement_data.route('/displacement-data/<current_regions>/<current_districts>/<previous_regions>/<previous_districts>/<needs>/<causes>/<period>/<start>/<end>', methods=['GET'])
@body(displacement_data_schema)
@response(displacement_data_schema, 201)
@other_responses({404: 'Displacement data with provided parameters does not exist'})
def all(self, current_regions, current_districts, previous_regions, previous_districts, needs, causes, period, *args, **kwargs):
    """Retrieve displacement data""" 
    needs = unquote(unquote_plus(needs))
    causes = unquote(unquote_plus(causes))
    args = (current_regions, current_districts, previous_regions, previous_districts, needs, causes, period)
    total_arrivals = get_total_arrivals(*args, **kwargs)
    top_displacement_needs = json.loads(get_top_displacement_needs(*args, **kwargs))
    if current_regions == 'All' and previous_regions =='All' and current_districts=='All' and previous_districts == 'All':
        top_locations_category = 'Regions'
        top_displacement_locations = json.loads(get_top_displacement_regions(*args, **kwargs))
    elif (not current_regions == 'All' or not previous_regions =='All') and (current_districts=='All' and previous_districts == 'All'):
        top_locations_category = 'Districts'
        top_displacement_locations = json.loads(get_top_displacement_districts(*args, **kwargs))
    elif not current_districts=='All' or not previous_districts == 'All':
        top_locations_category = 'Settlements'
        top_displacement_locations = json.loads(get_top_displacement_settlements(*args, **kwargs))
        

    top_displacement_causes = json.loads(get_top_displacement_causes(*args, **kwargs))
    weekly_displacement = json.loads(get_weekly_displacement(*args, **kwargs))
    geojson = get_filtered_daily_displacement_data(*args, **kwargs)
    
   
    allPart = "{\"total_arrivals\":  " + total_arrivals + ",\"top_needs\":  " + json.dumps(top_displacement_needs) + ",\"top_locations_category\":  " + json.dumps(top_locations_category) + ",\"top_locations\": " + json.dumps(top_displacement_locations) + ",\"top_causes\": " + json.dumps(top_displacement_causes) + ",\"weekly_displacement\": " + json.dumps(weekly_displacement) + ",\"geojson\":"  + json.dumps(geojson) + "}"
    
    return json.loads(allPart)



@displacement_data.route('/displacement-data/details/<currentsettlement>/<arrival_date>', methods=['GET'])
# @body(displacement_details_schema)
# @response(displacement_details_schema, 201)
# @other_responses({404: 'Displacement data with provided parameters does not exist'})
def details(currentsettlement, arrival_date):
    """Retrieve displacement details by current settlement and arrival date"""
    currentsettlement = unquote(unquote_plus(currentsettlement))
    displacement_details = current_settlement_arrival_details(currentsettlement, arrival_date)
    
    return displacement_details