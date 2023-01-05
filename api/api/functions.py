from data_cache import pandas_cache
from datetime import datetime
from xml.dom import WRONG_DOCUMENT_ERR
import pandas as pd
from datetime import date, timedelta
from urllib.parse import quote
from config import Config

custom_date_parser = lambda x: datetime.strptime(x, "%d-%-%Y %H:%M:%S")

today = date.today()
t = today.strftime("%d/%m/%Y")
# -------------------------------------------------------------------
# Helper functions
# -------------------------------------------------------------------

#Params with character "/" (e.g. regions=Berbera/Wada Jir), cannot by handled by flask,
# we sanitise it with this function by replacing it with ** 

# Function for filtering displacement data pandas dataframe by provided params
def df_filters_displacement(df, cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs):
    
    if period == 'd':
        #Filter by dates
        start = kwargs.get('start', '00-00-0000')
        end = kwargs.get('end', '00-00-0000');
        df = df.loc[(df.Arrival >= start)
                     & (df.Arrival < end)]
    else:
        #Filter by period
        df = df[df.Arrival >= pd.Timestamp.today() - pd.Timedelta(period)]
    
    #Filter by current regions
    if cregions != 'All':
        cregions = cregions
        cregions_filter_list = cregions.split(",")
        #df = df[df['CurentRegion'].isin(cregions_filter_list)]
        df=df.loc[df.CurentRegion.isin(cregions_filter_list)]
        
    #Filter by current districts
    if cdistricts != 'All':
        cdistricts = cdistricts
        cdistricts_filter_list = cdistricts.split(",")
        #df = df[df['CurrentDistrict'].isin(cdistricts_filter_list)]
        df=df.loc[df.CurrentDistrict.isin(cdistricts_filter_list)]
        
    #Filter by previous regions
    if pregions != 'All':
        pregions = pregions
        pregions_filter_list = pregions.split(",")
        #df = df[df['PreviousRegion'].isin(pregions_filter_list)]
        df=df.loc[df.PreviousRegion.isin(pregions_filter_list)]
        
    #Filter by previous districts
    if pdistricts != 'All':
        pdistricts = pdistricts
        pdistricts_filter_list = pdistricts.split(",")
        #df = df[df['PreviousDistrict'].isin(pdistricts_filter_list)]
        df=df.loc[df.PreviousDistrict.isin(pdistricts_filter_list)]
        
    #needs filter
    if needs != 'All':
        needs = needs
        needs_filter_list = needs.split(",")
        df = df.loc[df.Need1.isin(needs_filter_list) | df['Need2'].isin(needs_filter_list)]
        
    #Filter by causes
    if causes != 'All':
        causes = causes
        causes_filter_list = causes.split(",")
        df = df.loc[df.Category.isin(causes_filter_list)]
        
    return df

# help func to get from_date for function displacement_filters_protection(df,...)
def _from_date(period):
    n_days_ago = int(period.rstrip(period[-1]))
    to_date = date.today()
    from_date = to_date - timedelta(days=n_days_ago)
    return from_date.strftime('%d-%m-%Y')

#help func to get from_date for the function displacement_filters_protection(df,...)
def _to_date(period):
    to_date = date.today()
    return to_date.strftime('%d-%m-%Y')

# Function for filtering protection data pandas dataframe by provided params
def displacement_filters_protection(df, regions, violations, perpetrators, period, *args, **kwargs):
    #period filter
    if period == 'd':
        #Filter by dates
        start = kwargs.get('start', '00-00-0000')
        end = kwargs.get('end', '00-00-0000');
        df = df.loc[(df.ReportDate >= start)
                     & (df.ReportDate < end)]
        df["FromDate"] = start
        df["ToDate"] = end
    else:
        #Filter by period 
        df = df[df.ReportDate > pd.Timestamp.today() - pd.Timedelta(period)]
        df["FromDate"] = _from_date(period)
        df["ToDate"] = _to_date(period)
        
    #Trim rows with (null)values for DistrictX OR District Y
    df = df.loc[(df['DistrictX'] != '(null)') | (df['DistrictY'] != '(null)')]
   
    df['Date'] = df['ReportDate'].astype(str)
    #df['key'] = df['ViolationSettlement'] + "-" + df['ReportDate'].astype(str)
    df['DistrictX'] = df['DistrictX'].astype(float)
    df['DistrictY'] = df['DistrictY'].astype(float)
     
    
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df.loc[df['ViolationRegion'].isin(regions_filter_list)]
     
    
    #Filter by violations
    if violations != 'All':
        violations_filter_list = violations.split(",")
        df = df.loc[df['ViolationGroup'].isin(violations_filter_list)]
        
        
    #Filter by perpetrators
    if perpetrators != 'All':
        perpetrators_filter_list = perpetrators.split(",")
        df = df.loc[df['PerpetratorGroup'].isin(perpetrators_filter_list)]
        
    return df

#This function geojson for daily displacement data
@pandas_cache
def get_daily_displacement_data():
    """Retrieve displacement data"""
    # read data
    # df = pd.read_sql_table("approved_displacement",  Config.MB_PRMN_DATABASE_URL)
    df = pd.read_csv(
            'data/displacement_data.csv',
            # usecols=[
            #     'PreviousSettlement', 
            #     'PreviousDistrict', 
            #     'PreviousRegion',
            #     'CurrentSettlement', 
            #     'CurrentDistrict', 
            #     'CurentRegion', 
            #     'Reason',
            #     'Category',
            #     'Need1',
            #     'Need2', 
            #     'Arrival', 
            #     'CurrentSettLon', 
            #     'CurrentSettLat', 
            #     'AllPeople',
            #     'TotalM',
            #     'TotalF',
            #     '0-4M',
            #     '0-4F',	
            #     '5-11M',
            #     '5-11F',	
            #     '12-17M',	
            #     '12-17F',	
            #     '18_59M',	
            #     '18_59F',	
            #     '60+M',	
            #     '60+F',
            #     ],
            engine='c',
            sep=',',
            parse_dates=['Arrival'],
            # iterator=True, 
            # chunksize=50000,
            # dtype={
            #     'PreviousSettlement': 'str', 
            #     'PreviousDistrict': 'str',  
            #     'PreviousRegion': 'str', 
            #     'CurrentSettlement': 'str', 
            #     'CurrentDistrict': 'str', 
            #     'CurentRegion': 'str', 
            #     'Reason': 'str', 
            #     'Category': 'str', 
            #     'Need1': 'str', 
            #     'Need2': 'str', 
            #     'CurrentSettLon': 'float32',  
            #     'CurrentSettLat': 'float32',  
            #     'AllPeople': 'int32',
            #     'TotalM': 'int32',
            #     'TotalF': 'int32',
            #     '0-4M': 'int16',
            #     '0-4F': 'int16',	
            #     '5-11M': 'int16',
            #     '5-11F': 'int16',	
            #     '12-17M': 'int16',	
            #     '12-17F': 'int16',	
            #     '18_59M': 'int16',	
            #     '18_59F':'int16',	
            #     '60+M': 'int16',	
            #     '60+F':'int16',
            # }
        )
    
    
    # columns = ['CurentRegion', 'CurrentDistrict', 'CurrentSettlement',
    #    'PreviousRegion', 'PreviousDistrict', 'PreviousSettlement', 'Reason',
    #    'Category', 'Need1', 'Need2']
    
    # df = df.loc[:,columns] = df[columns].applymap(str)
    
    return df

@pandas_cache
def get_daily_protection_data():
    tp = pd.read_csv(
        'data/protection_data.csv',
        usecols=[
            'VictimId',
            'ReportDate', 
            'OrganisationAcronym',
            'RefVictimToMedicalService',
            'RefVictimToPsychosocialAid',
            'RefVictimForLegalAssistance',
            'InformedPolice',
            'InformedElders',
            'PaidForMedicalCheckup',
            'PaidForTransport',
            'OtherResponse',
            'Violation',
            'ViolationGroup',
            'ViolationRegion',
            'ViolationDistrict',
            'DistrictX', 
            'DistrictY',
            'PerpetratorGroup',
            'IncidentDate',
            'Age',
            'Sex'
            ],
        engine='c',
        sep=',',
        parse_dates=['ReportDate'],
        dtype={
            'VictimId': 'int32',
            'OrganisationAcronym': 'str',
            'RefVictimToMedicalService': 'int8',
            'RefVictimToPsychosocialAid': 'int8',
            'RefVictimForLegalAssistance': 'int8',
            'InformedPolice': 'int8',
            'InformedElders': 'int8',
            'PaidForMedicalCheckup': 'int8',
            'PaidForTransport': 'int8',
            'OtherResponse': 'int8',
            'Violation': 'str',
            'ViolationGroup': 'str',
            'ViolationRegion': 'str',
            'ViolationDistrict': 'str',
            'ViolationSettlement': 'str',
            # 'DistrictX': 'float32', 
            # 'DistrictY': 'float32',
            'PerpetratorGroup': 'str',
            'Age': 'int8',
            'Sex': 'str'
        },
        iterator=True, 
        chunksize=20000
    )
    
    df = pd.concat(tp, ignore_index=True)
    
    return df
    
# -----------------------------------------------------------
# Functions below are for displacement data
# all data is found in csv file called protection_cases.csv
# found in the data folder
# -----------------------------------------------------------


def get_total_arrivals(cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs):
    
    df = get_daily_displacement_data()
    
    df = df_filters_displacement(df, cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs)
    
    total_arrivals = df['AllPeople'].sum()
    
    return str(total_arrivals)
    
    
def get_top_displacement_regions(cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs):
    
    df = get_daily_displacement_data()
    
    df = df_filters_displacement(df, cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs)
    
    df1 = df.groupby('CurentRegion')['AllPeople'].sum().nlargest(5)
    # df1 = (100. * df1 / df1.sum()).round(0)
    
    return df1.to_json()

def get_top_displacement_districts(cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs):
    
    df = get_daily_displacement_data()
    
    df = df_filters_displacement(df, cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs)
    
    df1 = df.groupby('CurrentDistrict')['AllPeople'].sum().nlargest(5)
    # df1 = (100. * df1 / df1.sum()).round(0)
    
    return df1.to_json()

def get_top_displacement_settlements(cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs):
    
    df = get_daily_displacement_data()
    
    df = df_filters_displacement(df, cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs)
    
    df1 = df.groupby('CurrentSettlement')['AllPeople'].sum().nlargest(5)
    # df1 = (100. * df1 / df1.sum()).round(0)
    
    return df1.to_json()

def get_top_displacement_needs(cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs):
    
    df = get_daily_displacement_data()
    
    df = df_filters_displacement(df, cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs)
    
    df1 = df[['Need1', 'Need2']].melt(var_name='Columns', value_name='Needs')
    df1 = df1[df1['Needs'] != '(null)']
    df2 = df1.groupby('Needs')['Needs'].agg('count').nlargest(5)
    
    df2 =  (100. * df2 / df2.sum()).round(0)
    
    return df2.to_json()


def get_top_displacement_causes(cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs):
    
    df = get_daily_displacement_data()
    
    df = df_filters_displacement(df, cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs)
    
    df1 = df.groupby('Category')['AllPeople'].sum().nlargest(5)
    # df1 =  (100. * df1 / df1.sum()).round(0)
    
    return df1.to_json()



def df_to_geojson(df, properties, lat='CurrentSettLon', lon='CurrentSettLat'):
    # create a new python dict to contain our geojson data, using geojson format
    
    geojson = {'type':'FeatureCollection', 'features':[]}

    # loop through each row in the dataframe and convert each row to geojson format
    #print (df.index[0])
    for _, row in df.iterrows():
        # create a feature template to fill in
        feature = {'type':'Feature',
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
    



#This function geojson for filtered daily displacement data based on passed parameters
def get_filtered_daily_displacement_data(cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs):
    """filter displacement data"""
    df = get_daily_displacement_data()
    
    df['Needs'] = df['Need1'] + ',' + df['Need2'] 
    df['Date'] = df['Arrival'].astype(str)
    df['key'] = df['CurrentSettlement'] + "-" + df['Arrival'].astype(str)
    df['CurrentSettLon'] = df['CurrentSettLon'].astype(float)
    df['CurrentSettLat'] = df['CurrentSettLat'].astype(float)
    
    
    df = df_filters_displacement(df, cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs)
    
    df_grouped =  df.groupby(
        ['key', 'CurrentSettlement', 'CurrentDistrict', 'CurentRegion', 'PreviousRegion', 'PreviousDistrict', 'Category', 'CurrentSettLon', 'CurrentSettLat', 'Date'], 
        dropna=True)['AllPeople'].sum().to_frame().reset_index()
    
    cols = ['key', 'CurrentSettlement', 'CurrentDistrict', 'CurentRegion', 'Category', 'Date', 'AllPeople']
    
    daily_displacement_data = df_to_geojson(df_grouped, cols)
    
    return daily_displacement_data

def get_weekly_displacement(cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs):
   """filter displacement data"""
   df = get_daily_displacement_data()
   df = df_filters_displacement(df, cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs)
   df['Week_Number'] = df['Arrival'].dt.isocalendar().week
   
   df_grouped =  df.groupby(
        ['Week_Number'], 
        dropna=True)['AllPeople'].sum().to_frame().reset_index()
   return df_grouped.to_json(orient="records") 

def get_partner_displacement_data(cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs):              
    """filter displacement data"""
    df = get_daily_displacement_data()
    
    df['Needs'] = df['Need1'] + ',' + df['Need2'] 
    df['ArrivalDate'] = df['Arrival'].astype(str)
    df['Week'] = df['Arrival'].dt.week
    df['key'] = df['CurrentSettlement'] + "-" + df['Arrival'].astype(str)
    df['IntraRegion'] = df['CurentRegion'].eq(df['PreviousRegion'])
    df['Boys'] = df['0-4M'] + df['5-11M'] + df['12-17M']
    df['Girls'] =  df['0-4F'] + df['5-11F'] + df['12-17F']

    
    df.rename(columns = {'18_59M':'Men', '18_59F':'Women', '60+M':'ElderlyMen', '60+F':'ElderlyWomen'}, inplace = True)
    df = df.drop(['0-4M', '0-4F', '5-11M', '5-11F', '12-17M', '12-17F', 'CurrentSettLon', 'CurrentSettLat'], axis=1)
    df = df_filters_displacement(df, cregions, cdistricts, pregions, pdistricts, needs, causes, period, *args, **kwargs)
    
    return df.to_json(orient='records')


#This function returns daily displacement data based on regions
def get_filtered_daily_displacement_alerts():
    """daily displacement data based on region"""
    df = get_daily_displacement_data()
    
    df['Needs'] = df['Need1'] + ',' + df['Need2'] 
    df['Date'] = df['Arrival'].astype(str)
    
    
    #Filter by period
    df = df[df['Arrival'] > pd.Timestamp.today() - pd.Timedelta('1D')]
    
    df_grouped =  df.groupby(
        ['CurrentSettlement', 'CurrentDistrict', 'CurentRegion', 'Reason', 'Arrival'], 
        dropna=True)['AllPeople'].sum().to_frame().reset_index()
    
    per = df_grouped.Arrival.dt.to_period("D")
    
    g = df_grouped.groupby([per, 'CurrentSettlement', 'CurrentDistrict', 'CurentRegion', 'Reason'])
    
    daily_data = g.sum()
    
    return daily_data.to_html()


#This function geojson for filtered weekly displacement data based on passed parameters
def get_filtered_weekly_displacement_alerts(regions='Middle Juba'):
    """weekly displacement data based on region"""
    df = get_daily_displacement_data()
    
    df['Needs'] = df['Need1'] + ',' + df['Need2'] 
    df['Date'] = df['Arrival'].astype(str)
    
    
    #Filter by period
    df = df[df['Arrival'] > pd.Timestamp.today() - pd.Timedelta('7D')]
    
    #Filter by regions
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['CurentRegion'].isin(regions_filter_list)]
        
    df_grouped =  df.groupby(
        ['CurrentSettlement', 'CurrentDistrict', 'CurentRegion', 'Reason', 'Arrival'], 
        dropna=True)['AllPeople'].sum().to_frame().reset_index()
    
    per = df_grouped.Arrival.dt.to_period("W")
    
    g = df_grouped.groupby([per, 'CurrentSettlement', 'CurrentDistrict', 'CurentRegion', 'Reason'])
    
    weekly_data = g.sum()
    
    return weekly_data.to_html()

#This function geojson for filtered weekly displacement data based on passed parameters
def get_filtered_monthly_displacement_alerts(regions='Middle Juba'):
    """monthly displacement data based on region"""
    df = get_daily_displacement_data()
    
    df['Needs'] = df['Need1'] + ',' + df['Need2'] 
    df['Date'] = df['Arrival'].astype(str)
    
    
    #Filter by period
    df = df[df['Arrival'] > pd.Timestamp.today() - pd.Timedelta('30D')]
    
    #Filter by regions
    if regions != 'All':
        regions_filter_list = regions.split(",")
        df = df[df['CurentRegion'].isin(regions_filter_list)]
        
    df_grouped =  df.groupby(
        ['CurrentSettlement', 'CurrentDistrict', 'CurentRegion', 'Reason', 'Arrival'], 
        dropna=True)['AllPeople'].sum().to_frame().reset_index()
    
    per = df_grouped.Arrival.dt.to_period("M")
    
    g = df_grouped.groupby([per, 'CurrentSettlement', 'CurrentDistrict', 'CurentRegion', 'Reason'])
    
    monthly_data = g.sum()
    
    return monthly_data.to_html()

# Functions returns data on details of arrivals in a settlement in a particular date 
def current_settlement_arrival_details(currentsettlement, arrival_date):
    """Retrieve displacement details by current settlement and arrival date"""
    df = get_daily_displacement_data()
    df =  df.set_index('CurrentSettlement')

    df['Needs'] = df['Need1'] + ',' + df['Need2'] 

        
    #Filter by key
    df = df[df['Arrival'] == arrival_date]
    
    
    #Filter By Current settlement
    currentsettlement = currentsettlement
    df1 = df[df.index == currentsettlement]
    df_grouped =  df1.groupby(
        ['CurrentSettlement', 'Arrival', 'PreviousSettlement', 'PreviousDistrict', 'PreviousRegion', 'Reason', 'Needs'], 
        dropna=True)['AllPeople'].sum().to_frame().reset_index()
  
    
    return df_grouped.to_json(orient='records')



# -----------------------------------------------------------
# Functions below are for protection data
# all data is found in csv file called protection_cases.csv
# found in the data folder
# -----------------------------------------------------------

#This function returns the total number of violation categories
def get_total_violation_cases(regions, violations, perpetrators, period, *args, **kwargs):
   
    """Get the total number of violation cases"""
    
    # Get protection datafrane
    df = get_daily_protection_data()
    
    #Filter dataframe
    df = displacement_filters_protection(df, regions, violations, perpetrators, period, *args, **kwargs)
        
    df1= df.groupby('VictimId')['VictimId'].count()
        
    
    return str(len(df1))


def get_daily_protection_cases_series(regions, violations, perpetrators, period, *args, **kwargs):
    
    # Get protection datafrane
    df = get_daily_protection_data()
    
    #Filter dataframe
    df = displacement_filters_protection(df, regions, violations, perpetrators, period, *args, **kwargs)
    
    df = df[['ReportDate', 'VictimId']]
    df = df.set_index('ReportDate')
    
    df.columns = ['Cases']   
    daily_data = df.resample('D').count()
    return daily_data.to_json()


# This functions returns the top viloation categories
def get_top_violation_categories(regions, violations, perpetrators, period, *args, **kwargs):
   
    """Get top 5 violation group categories""" 
    
    # Get protection datafrane
    df = get_daily_protection_data()
    
    #Filter dataframe
    df = displacement_filters_protection(df, regions, violations, perpetrators, period, *args, **kwargs)
        
    df1 = df.groupby('ViolationGroup')['ViolationGroup'].agg('count').nlargest(5)
    #df1 =  (100. * df1 / df1.sum()).round(0)
    
    return df1.to_json()
    

# This functions returns the top perpetrators 
def get_top_perpetrator_groups(regions, violations, perpetrators, period, *args, **kwargs):
   
    """Get top 5 perpetrator groups""" 
    
    # Get protection datafrane
    df = get_daily_protection_data()
    
    #Filter dataframe
    df = displacement_filters_protection(df, regions, violations, perpetrators, period, *args, **kwargs)
    
    #Remove null values    
    df = df[df['PerpetratorGroup'] != '(null)']
        
    df1 = df.groupby('PerpetratorGroup')['PerpetratorGroup'].agg('count').nlargest(5)
    #df1 =  (100. * df1 / df1.sum()).round(0)
    
    return df1.to_json()


#This function returns the top 5 responses by agencies regarding violation cases    
def get_top_responses(regions, violations, perpetrators, period, *args, **kwargs):
    
    """Get top 5 response categories by agencies""" 
    
    # Get protection datafrane
    df = get_daily_protection_data()
    
    #Filter dataframe
    df = displacement_filters_protection(df, regions, violations, perpetrators, period, *args, **kwargs)
        
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

def get_filtered_daily_protection_data(regions, violations, perpetrators, period, *args, **kwargs):
    
    # Get protection datafrane
    df = get_daily_protection_data()
    
    #Filter dataframe
    df = displacement_filters_protection(df, regions, violations, perpetrators, period, *args, **kwargs)
    
    # Rename columns, to enable to use df_to_geojson() function using common param names   
    df.rename(columns = {'DistrictX':'CurrentSettLon', 'DistrictY':'CurrentSettLat'}, inplace = True)
    
    #Group data and get count of total cases of violations in each district
    df_grouped =  df.groupby(
        ['ViolationDistrict', 'CurrentSettLon', 'CurrentSettLat', 'FromDate', 'ToDate'], 
        dropna=True)['ViolationDistrict'].size().reset_index(name='TotalCases')
    
    cols = ['ViolationDistrict', 'FromDate', 'ToDate', 'TotalCases']
    
    #convert dataframe to geojson
    daily_protection_data = df_to_geojson(df_grouped, cols)
        
    return daily_protection_data

def get_weekly_protection_cases(regions, violations, perpetrators, period, *args, **kwargs):
   """filter protection data"""
   df = get_daily_protection_data()
   df = displacement_filters_protection(df,regions, violations, perpetrators, period, *args, **kwargs)
   df['Week_Number'] = df['ReportDate'].dt.isocalendar().week
   
   df_grouped =  df.groupby(
        ['Week_Number'], 
        dropna=True)['Week_Number'].size().reset_index(name='TotalCases')
   
   
   return df_grouped.to_json(orient="records") 

def get_partner_protection_data(regions, violations, perpetrators, period, *args, **kwargs):
    
    # Get protection datafrane
    df = get_daily_protection_data()
    
    df['IncidentDateStr'] = df['IncidentDate'].astype(str)
    
    df = displacement_filters_protection(df,regions, violations, perpetrators, period, *args, **kwargs)
    
    return df.to_json(orient='records')