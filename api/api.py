from datetime import datetime
import pandas as pd
from flask import Flask, request, abort
from flask_sqlalchemy import SQLAlchemy
from alchemical.flask import Alchemical
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
import json
import uuid

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)

@app.route('/yearly_displacement', methods=['GET'])
@app.route('/yearly_displacement/<start_date>/<end_date>', methods=['GET'])
def get_yearly_displacement(start_date='01-01-2016', end_date='12-31-2022'):
    
    dtypes = {
        "ReasonCategory": "category"
    }
    df = pd.read_csv(
        'data/displacement_data.csv',
        usecols=list(dtypes) + ['Arrival', 'AllPeople'],
        index_col='Arrival', 
        
    )[start_date:end_date]
    
    df = df[df['ReasonCategory'] == 'Drought']
    monthly_data = df.resample('M').sum()
    yearly_data = monthly_data.resample('Y').sum()
    
    return yearly_data.to_json()

@app.route('/displacement_categories')
def get_displacement_categories():
    dtypes = {
        "ReasonCategory": "category"
    }
    df = pd.read_csv(
        'data/displacement_data.csv',
        usecols=list(dtypes) + ['AllPeople'],
    ).groupby('ReasonCategory')['AllPeople'].sum()
    
    return df.to_json()


def get_total_arrivals(period='7D', regions='All', needs='All', causes='All'):
    df = pd.read_csv(
        'data/displacement_data.csv',
        usecols=['CurentRegion', 'Arrival', 'AllPeople', 'CurentRegion', 'Reason',  'Need1', 'Need2', 'AllPeople'],
        parse_dates=['Arrival'], 
    )
    
    #Filter by date
    df = df[df['Arrival'] > pd.Timestamp.today() - pd.Timedelta(period)]
    
    #Filter by regions
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['CurentRegion'].isin(regions_filter_list)]
        
    #needs filter
    if needs != 'All':
        needs_filter_list = needs.split(",")
        df = df[df['Need1'].isin(needs_filter_list) | df['Need2'].isin(needs_filter_list)]
        
    #Filter by causes
    if causes != 'All':
        causes_filter_list = causes.split(",")
        df = df[df['Reason'].isin(causes_filter_list)]
    
    total_arrivals = df['AllPeople'].sum()
    
    return str(total_arrivals)
    
     
#@app.route('/top_displacement_region', methods=['GET'])
def get_top_displacement_regions(period='7D', regions='All', needs='All', causes='All'):
    
    df = pd.read_csv(
        'data/displacement_data.csv',
        usecols=['CurentRegion', 'Arrival', 'CurentRegion', 'Reason',  'Need1', 'Need2', 'AllPeople'],
        parse_dates=['Arrival'], 
    )
    
    #Filter by date
    df = df[df['Arrival'] > pd.Timestamp.today() - pd.Timedelta(period)]
    
    #Filter by regions
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['CurentRegion'].isin(regions_filter_list)]
        
    #needs filter
    if needs != 'All':
        needs_filter_list = needs.split(",")
        df = df[df['Need1'].isin(needs_filter_list) | df['Need2'].isin(needs_filter_list)]
        
    #Filter by causes
    if causes != 'All':
        causes_filter_list = causes.split(",")
        df = df[df['Reason'].isin(causes_filter_list)]
    
    df1 = df.groupby('CurentRegion')['AllPeople'].sum().nlargest(5)
    df1 = (100. * df1 / df1.sum()).round(0)
    
    return df1.to_json()


#@app.route('/top_displacement_needs', methods=['GET'])
def get_top_displacement_needs(period='7D',regions='All', needs='All', causes='All'):
    df = pd.read_csv(
        'data/displacement_data.csv',
        usecols=['CurentRegion', 'Arrival', 'Reason',  'Need1', 'Need2',],
        parse_dates=['Arrival'],
        )
    
    #period filter
    df = df[df['Arrival'] > pd.Timestamp.today() - pd.Timedelta(period)]
    
    #region filter
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['CurentRegion'].isin(regions_filter_list)]
        
    #needs filter
    if needs != 'All':
        needs_filter_list = needs.split(",")
        df = df[df['Need1'].isin(needs_filter_list) | df['Need2'].isin(needs_filter_list)]
        
    #Filter by causes
    if causes != 'All':
        causes_filter_list = causes.split(",")
        df = df[df['Reason'].isin(causes_filter_list)]
    
    df1 = df[['Need1', 'Need2']].melt(var_name='Columns', value_name='Needs')
    df1 = df1[df1['Needs'] != '(null)']
    df2 = df1.groupby('Needs')['Needs'].agg('count').nlargest(5)
    
    df2 =  (100. * df2 / df2.sum()).round(0)
    
    return df2.to_json()


#@app.route('/top_displacement_causes', methods=['GET'])
def get_top_displacement_causes(period='7D',regions='All', needs='All', causes='All'):
    df = pd.read_csv(
        'data/displacement_data.csv',
        usecols=['CurentRegion', 'Arrival', 'Reason',  'Need1', 'Need2',],
        parse_dates=['Arrival'],
        )
    
    #period filter
    df = df[df['Arrival'] > pd.Timestamp.today() - pd.Timedelta(period)]
    
    #region filter
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['CurentRegion'].isin(regions_filter_list)]
          
    #needs filter
    if needs != 'All':
        needs_filter_list = needs.split(",")
        df = df[df['Need1'].isin(needs_filter_list) | df['Need2'].isin(needs_filter_list)]
        
    #Filter by causes
    if causes != 'All':
        causes_filter_list = causes.split(",")
        df = df[df['Reason'].isin(causes_filter_list)]
    
    
    df1 = df.groupby('Reason')['Reason'].agg('count').nlargest(5)
    df1 =  (100. * df1 / df1.sum()).round(0)
    
    return df1.to_json()



def df_to_geojson(df, properties, lat='CurrentSettLon', lon='CurrentSettLat'):
    # create a new python dict to contain our geojson data, using geojson format
    
    geojson = {'type':'FeatureCollection', 'features':[]}

    # loop through each row in the dataframe and convert each row to geojson format
    #print (df.index[0])
    for _, row in df.iterrows():
        # create a feature template to fill in
        feature = {'type':'Feature',
                   'id': str(uuid.uuid4()),
                   'properties':{},
                   'geometry':{'type':'Point',
                               'coordinates':[]}}
        
        # fill in the coordinates
        feature['geometry']['coordinates'] =  [row[lat], row[lon]]

        # for each column, get the value and add it as a new feature property
        for prop in properties:
            feature['properties'][prop] = row[prop]
        
        # add this feature (aka, converted dataframe row) to the list of features inside our dict
        geojson['features'].append(feature)
    
    return geojson


@app.route('/daily_displacement_map/<period>/<regions>/<needs>/<causes>', methods=['GET'])
@app.route('/daily_displacement_map', methods=['GET'])
def get_daily_displacement(
    period='7D', 
    regions='All', 
    needs='All', 
    causes='All'
    ):
    
    df = pd.read_csv(
            'data/displacement_data.csv',
            usecols=[
                'CurrentSettlement', 
                'CurrentDistrict', 
                'CurentRegion', 
                'Reason',
                'Need1',
                'Need2', 
                'Arrival', 
                'CurrentSettLon', 
                'CurrentSettLat', 
                'AllPeople'
                ],
            parse_dates=['Arrival'],
        )
    df['Needs'] = df['Need1'] + ',' + df['Need2'] 
    df['Date'] = df['Arrival'].astype(str)
    df['key'] = df['CurrentSettlement'] + "-" + df['Arrival'].astype(str)
    df['CurrentSettLon'] = df['CurrentSettLon'].astype(float)
    df['CurrentSettLat'] = df['CurrentSettLat'].astype(float)
    
    
    #Filter by period
    df = df[df['Arrival'] > pd.Timestamp.today() - pd.Timedelta(period)]
    
    #Filter by regions
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['CurentRegion'].isin(regions_filter_list)]
        
    #needs filter
    if needs != 'All':
        needs_filter_list = needs.split(",")
        df = df[df['Need1'].isin(needs_filter_list) | df['Need2'].isin(needs_filter_list)]
        
    #Filter by causes
    if causes != 'All':
        causes_filter_list = causes.split(",")
        df = df[df['Reason'].isin(causes_filter_list)]
    
    df_grouped =  df.groupby(
        ['key', 'CurrentSettlement', 'CurrentDistrict', 'CurentRegion', 'Reason', 'CurrentSettLon', 'CurrentSettLat', 'Date'], 
        dropna=True)['AllPeople'].sum().to_frame().reset_index()
    
    cols = ['key', 'CurrentSettlement', 'CurrentDistrict', 'CurentRegion', 'Reason', 'Date', 'AllPeople']
    
    geojson = df_to_geojson(df_grouped, cols)
    
    total_arrivals = get_total_arrivals(period, regions, needs, causes)
    top_displacement_needs = json.loads(get_top_displacement_needs(period, regions, needs, causes))
    top_displacement_regions = json.loads(get_top_displacement_regions(period, regions, needs, causes))
    top_displacement_causes = json.loads(get_top_displacement_causes(period, regions, needs, causes))
    #displacement_data = json.loads(geojson)
    
    
    allPart = "{\"total_arrivals\":  " + total_arrivals + ",\"top_needs\":  " + json.dumps(top_displacement_needs) + ",\"top_regions\": " + json.dumps(top_displacement_regions) + ",\"top_causes\": " + json.dumps(top_displacement_causes) + ",\"geojson\":"  + json.dumps(geojson) + "}"
    return json.loads(allPart)

@app.route('/displacement_arrivals_details/<currentsettlement>/<arrival_date>', methods=['GET'])
def get_displacement_data_details(currentsettlement, arrival_date):
    
    df = pd.read_csv(
            'data/displacement_data.csv',
            usecols=[
                'CurrentSettlement',
                'PreviousSettlement', 
                'PreviousDistrict', 
                'PreviousRegion', 
                'Reason',
                'Need1',
                'Need2', 
                'Arrival',
                'AllPeople'
                ],
            index_col='CurrentSettlement'
    )
    df['Needs'] = df['Need1'] + ',' + df['Need2'] 
    #@df['key'] = df['CurrentSettlement'] + "-" + df['Arrival'].astype(str)
    
    
    #Filter by key
    df = df[df['Arrival'] == arrival_date]
    
    #Filter By Current settlement
    df1 = df[df.index == currentsettlement]
    df_grouped =  df1.groupby(
        ['PreviousSettlement', 'PreviousDistrict', 'PreviousRegion', 'Reason', 'Needs'], 
        dropna=True)['AllPeople'].sum().to_frame().reset_index()
  
    
    return df_grouped.to_json(orient='records')


# -----------------------------------------------------------
# Protection Cases API
#
# Functions below are for protection data
# all data is found in csv file called protection_cases.csv
# found in the data folder
# -----------------------------------------------------------

#This function returns the total number of violation categories
def get_total_violation_cases(period='7D',regions='All', violations='All', perpetrators='All'):
   
    """Get the total number of violation cases"""
    
    df = pd.read_csv(
            'data/protection_data.csv',
        usecols=['ReportDate', 'VictimId', 'ReportDate', 'ViolationRegion', 'ViolationGroup', 'PerpetratorGroup'],
        parse_dates=['ReportDate'], 
    )
   
    #period filter
    df = df[df['ReportDate'] > pd.Timestamp.today() - pd.Timedelta(period)]
    
    #region filter
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['ViolationRegion'].isin(regions_filter_list)]
        
    
    #Filter by violations
    if violations != 'All':
        violations_filter_list = violations.split(",")
        df = df[df['ViolationGroup'].isin(violations_filter_list)]
        
        
    #Filter by perpetrators
    if perpetrators != 'All':
        perpetrators_filter_list = perpetrators.split(",")
        df = df[df['PerpetratorGroup'].isin(perpetrators_filter_list)]
        
    df1= df.groupby('VictimId')['VictimId'].count()
        
    
    return str(len(df1))


#@app.route('/daily_protection_cases', methods=['GET'])
#@app.route('/daily_protection_cases/<period>/<regions>/<violations>/<perpetrators>', methods=['GET'])
def get_daily_protection_cases_series(period='7D',regions='All', violations='All', perpetrators='All'):
    
    dtypes = {
        "ReasonCategory": "category"
    }
    df = pd.read_csv(
        'data/protection_data.csv',
        usecols=['ReportDate', 'VictimId', 'ViolationRegion', 'ViolationGroup', 'PerpetratorGroup'],
        parse_dates=['ReportDate'], 
    )
   
    #period filter
    df = df[df['ReportDate'] > pd.Timestamp.today() - pd.Timedelta(period)]
    
    #region filter
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['ViolationRegion'].isin(regions_filter_list)]
        
    
    #Filter by violations
    if violations != 'All':
        violations_filter_list = violations.split(",")
        df = df[df['ViolationGroup'].isin(violations_filter_list)]
        
        
    #Filter by perpetrators
    if perpetrators != 'All':
        perpetrators_filter_list = perpetrators.split(",")
        df = df[df['PerpetratorGroup'].isin(perpetrators_filter_list)]
    
    df = df[['ReportDate', 'VictimId']]
    df = df.set_index('ReportDate')
    
    df.columns = ['Cases']   
    daily_data = df.resample('D').count()
    return daily_data.to_json()


# This functions returns the top viloation categories
def get_top_violation_categories(period='7D',regions='All', violations='All', perpetrators='All'):
   
    """Get top 5 violation group categories""" 
    
    df = pd.read_csv(
        'data/protection_data.csv',
        usecols=['ViolationRegion', 'ReportDate', 'ViolationGroup', 'PerpetratorGroup'],
        parse_dates=['ReportDate'],
        )
    
    #period filter
    df = df[df['ReportDate'] > pd.Timestamp.today() - pd.Timedelta(period)]
    
    #region filter
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['ViolationRegion'].isin(regions_filter_list)]
        
    
    #Filter by violations
    if violations != 'All':
        violations_filter_list = violations.split(",")
        df = df[df['ViolationGroup'].isin(violations_filter_list)]
        
        
    #Filter by perpetrators
    if perpetrators != 'All':
        perpetrators_filter_list = perpetrators.split(",")
        df = df[df['PerpetratorGroup'].isin(perpetrators_filter_list)]
        
    df1 = df.groupby('ViolationGroup')['ViolationGroup'].agg('count').nlargest(5)
    df1 =  (100. * df1 / df1.sum()).round(0)
    
    return df1.to_json()
    

# This functions returns the top perpetrators 
def get_top_perpetrator_groups(period='7D',regions='All', violations='All', perpetrators='All'):
   
    """Get top 5 perpetrator groups""" 
    
    df = pd.read_csv(
        'data/protection_data.csv',
        usecols=['ViolationRegion', 'ReportDate', 'ViolationGroup', 'PerpetratorGroup'],
        parse_dates=['ReportDate'],
        )
    
    #period filter
    df = df[df['ReportDate'] > pd.Timestamp.today() - pd.Timedelta(period)]
    
    #region filter
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['ViolationRegion'].isin(regions_filter_list)]
        
    
    #Filter by violations
    if violations != 'All':
        violations_filter_list = violations.split(",")
        df = df[df['ViolationGroup'].isin(violations_filter_list)]
        
        
    #Filter by perpetrators
    if perpetrators != 'All':
        perpetrators_filter_list = perpetrators.split(",")
        df = df[df['PerpetratorGroup'].isin(perpetrators_filter_list)]
    
    #Remove null values    
    df = df[df['PerpetratorGroup'] != '(null)']
        
    df1 = df.groupby('PerpetratorGroup')['PerpetratorGroup'].agg('count').nlargest(5)
    df1 =  (100. * df1 / df1.sum()).round(0)
    
    return df1.to_json()

    
#This function returns the top 5 responses by agencies regarding violation cases    
def get_top_responses(period='7D',regions='All', violations='All', perpetrators='All'):
    
    """Get top 5 response categories by agencies""" 
      
    df = pd.read_csv(
        'data/protection_data.csv',
         usecols=[
            'ReportDate', 
            'RefVictimToMedicalService',
            'RefVictimToPsychosocialAid',
            'RefVictimForLegalAssistance',
            'InformedPolice',
            'InformedElders',
            'PaidForMedicalCheckup',
            'PaidForTransport',
            'OtherResponse',
        ],
        parse_dates=['ReportDate'],
    )
    
    #period filter
    df = df[df['ReportDate'] > pd.Timestamp.today() - pd.Timedelta(period)]
    
     #period filter
    df = df[df['ReportDate'] > pd.Timestamp.today() - pd.Timedelta(period)]
    
    #region filter
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['ViolationRegion'].isin(regions_filter_list)]
        
    
    #Filter by violations
    if violations != 'All':
        violations_filter_list = violations.split(",")
        df = df[df['ViolationGroup'].isin(violations_filter_list)]
        
        
    #Filter by perpetrators
    if perpetrators != 'All':
        perpetrators_filter_list = perpetrators.split(",")
        df = df[df['PerpetratorGroup'].isin(perpetrators_filter_list)]
        
    
    df1 = df[[
            'RefVictimToMedicalService',
            'RefVictimToPsychosocialAid',
            'RefVictimForLegalAssistance',
            'InformedPolice',
            'InformedElders',
            'PaidForMedicalCheckup',
            'PaidForTransport',
            'OtherResponse',
        ]].melt(var_name='Responses', value_name='Bool')
    
    
    df1 = df1[df1['Bool'] != 0]
    
    df2 =  df1.groupby('Responses')['Responses'].agg('count').nlargest(5)
    df2 =  (100. * df2 / df2.sum()).round(0)
    
    return df2.to_json()


#This function is an API that returns all data including geojson data for the front-end
@app.route('/daily_protection_map_data/<period>/<regions>/<violations>/<perpetrators>', methods=['GET'])
@app.route('/daily_protection_map_data', methods=['GET'])
def get_protection_map_data(period='7D',regions='All', violations='All', perpetrators='All'):
    
    df = pd.read_csv(
            'data/protection_data.csv',
            usecols=[
                'VictimId',
                'ReportDate', 
                'CurrentRegion', 
                'CurrentDistrict', 
                'CurrentSettlement', 
                'CurrentLongitude', 
                'CurrentLatitude',
                'RefVictimToMedicalService',
                'RefVictimToPsychosocialAid',
                'RefVictimForLegalAssistance',
                'InformedPolice',
                'InformedElders',
                'PaidForMedicalCheckup',
                'PaidForTransport',
                'OtherResponse',
                'ViolationGroup',
                'ViolationRegion', 
                'ViolationDistrict', 
                'ViolationSettlement', 
                'ViolationLongitude', 
                'ViolationLatitude',
                'PerpetratorGroup'
                ],
            parse_dates=['ReportDate'],
        )
  
    df['Date'] = df['ReportDate'].astype(str)
    df['key'] = df['CurrentSettlement'] + "-" + df['ReportDate'].astype(str)
    df['CurrentLongitude'] = df['CurrentLongitude'].astype(float)
    df['CurrentLatitude'] = df['CurrentLatitude'].astype(float)
    
    
    #period filter
    df = df[df['ReportDate'] > pd.Timestamp.today() - pd.Timedelta(period)]
    
    #region filter
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['ViolationRegion'].isin(regions_filter_list)]
        
    
    #Filter by violations
    if violations != 'All':
        violations_filter_list = violations.split(",")
        df = df[df['ViolationGroup'].isin(violations_filter_list)]
        
        
    #Filter by perpetrators
    if perpetrators != 'All':
        perpetrators_filter_list = perpetrators.split(",")
        df = df[df['PerpetratorGroup'].isin(perpetrators_filter_list)]
    
    df.rename(columns = {'CurrentLongitude':'CurrentSettLon', 'CurrentLatitude':'CurrentSettLat'}, inplace = True)
   
   
    cols = ['key', 'CurrentSettlement', 'CurrentDistrict', 'CurrentRegion', 'Date', 'ViolationGroup']
    
    geojson = df_to_geojson(df, cols)
    
    total_violation_cases = get_total_violation_cases(period, regions, violations, perpetrators)
    top_violation_categories = json.loads(get_top_violation_categories(period, regions, violations, perpetrators))
    top_responses = json.loads(get_top_responses(period, regions, violations, perpetrators))
    top_perpetrator_groups = json.loads(get_top_perpetrator_groups(period, regions, violations, perpetrators))
    daily_cases=json.loads(get_daily_protection_cases_series(period, regions, violations, perpetrators))
    
    
    allPart = "{\"total_violation_cases\":  " + json.dumps(total_violation_cases) + ",\"top_violation_categories\":  " + json.dumps(top_violation_categories) + ",\"top_perpetrator_groups\": " + json.dumps(top_perpetrator_groups) + ",\"top_responses\": " + json.dumps(top_responses) +  ",\"z_daily_cases\": " + json.dumps(daily_cases) + ",\"geojson\":"  + json.dumps(geojson) + "}"
    return json.loads(allPart)
