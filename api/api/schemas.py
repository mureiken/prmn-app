from celery import current_app
from marshmallow import validate, validates, validates_schema, \
    ValidationError, post_dump
from marshmallow_geojson import GeoJSONSchema, PropertiesSchema, FeatureSchema
from api import ma, db
from api.auth import token_auth
from api.models import User, Subscriber, Donor, Publication


paginated_schema_cache = {}

class EmptySchema(ma.Schema):
    pass

class GeometrySchema(ma.Schema):
    type = ma.String()
    coordinates = ma.List(ma.Float())
   
class DisplacementPropertiesSchema(PropertiesSchema):
    AllPeople = ma.Integer()
    Type = ma.String()
    CurrentDistrict = ma.String()
    CurrentSettlement = ma.String()
    CurentRegion = ma.String()
    Date = ma.String()
    Category = ma.String()
    key = ma.String()
 

class DisplacementFeatureSchema(FeatureSchema):
    type = ma.String(required=True)
    geometry = ma.Nested(
        GeometrySchema,
        required=True,
    )
    properties = ma.Nested(
        DisplacementPropertiesSchema,
        required=True,
    )

class DisplacementGeoJSONSchema(GeoJSONSchema):
    type = ma.String()
    features = ma.Nested(
        DisplacementFeatureSchema,
        many=True,
    )
    
class DisplacementDataSchema(ma.Schema):
    
    geojson = ma.Nested(DisplacementGeoJSONSchema)
    top_causes = ma.Dict()
    top_needs = ma.Dict()
    top_locations_category = ma.String()
    top_locations = ma.Dict()
    weekly_displacement = ma.List(ma.Dict())
    total_arrivals = ma.String()
    
    
class DisplacementDetailsSchema(ma.Schema):
    CurrentSettlement = ma.String()
    Arrival = ma.String()
    PreviousSettlement = ma.String()
    PreviousDistrict   = ma.String()
    PreviousRegion = ma.String()
    Reason = ma.String()
    Needs = ma.String()
    AllPeople = ma.Integer()
    
#
class ProtectionPropertiesSchema(PropertiesSchema):
    FromDate = ma.String()
    ToDate = ma.String()
    ViolationDistrict = ma.String()
    TotalCases = ma.Integer()
  
 

class ProtectionFeatureSchema(FeatureSchema):
    type = ma.String(required=True)
    geometry = ma.Nested(
        GeometrySchema,
        required=True,
    )
    properties = ma.Nested(
        ProtectionPropertiesSchema,
        required=True,
    )

class ProtectionGeoJSONSchema(GeoJSONSchema):
    type = ma.String()
    features = ma.Nested(
        ProtectionFeatureSchema,
        many=True,
    )
    
class ProtectionDataSchema(ma.Schema):
    
    geojson = ma.Nested(ProtectionGeoJSONSchema)
    top_perpetrator_groups = ma.Dict()
    top_responses = ma.Dict()
    top_violation_categories = ma.Dict()
    total_violation_cases = ma.String()
    weekly_cases = ma.List(ma.Dict())
    z_daily_cases = ma.Dict()
    
class PartnerDisplacementData(ma.Schema):
    
    class Meta:
        dateformat = '%Y-%m-%d'
    
    CurentRegion = ma.String()
    CurrentDistrict = ma.String()
    CurrentSettlement = ma.String()
    PreviousRegion = ma.String()
    PreviousDistrict = ma.String()
    PreviousSettlement = ma.String()
    AllPeople = ma.Integer()
    Arrival = ma.DateTime()
    Reason = ma.String()
    Category = ma.String()
    Need1 = ma.String()
    Need2 = ma.String()
    Men = ma.Integer()
    Women=ma.Integer()
    ElderlyMen=ma.Integer()
    ElderlyWomen=ma.Integer()
    TotalM=ma.Integer()
    TotalF=ma.Integer()
    Needs = ma.String()
    ArrivalDate=ma.String()
    Week=ma.Integer()
    key=ma.String()
    IntraRegion=ma.Boolean()
    Boys=ma.Integer()
    Girls=ma.Integer()
    
    
class PartnerProtectionData(ma.Schema):
    class Meta:
        ordered = True
        
    IncidentDateStr = ma.String()
    OrganisationAcronym = ma.String()
    Age = ma.Integer()
    Sex = ma.String()
    Violation = ma.String()
    ViolationRegion = ma.String()
    ViolationDistrict = ma.String()
    ViolationSettlement = ma.String()
    
    
class DateTimePaginationSchema(ma.Schema):
    class Meta:
        ordered = True

    limit = ma.Integer()
    offset = ma.Integer()
    after = ma.DateTime(load_only=True)
    count = ma.Integer(dump_only=True)
    total = ma.Integer(dump_only=True)

    @validates_schema
    def validate_schema(self, data, **kwargs):
        if data.get('offset') is not None and data.get('after') is not None:
            raise ValidationError('Cannot specify both offset and after')


class StringPaginationSchema(ma.Schema):
    class Meta:
        ordered = True

    limit = ma.Integer()
    offset = ma.Integer()
    after = ma.String(load_only=True)
    count = ma.Integer(dump_only=True)
    total = ma.Integer(dump_only=True)

    @validates_schema
    def validate_schema(self, data, **kwargs):
        if data.get('offset') is not None and data.get('after') is not None:
            raise ValidationError('Cannot specify both offset and after')


def PaginatedCollection(schema, pagination_schema=StringPaginationSchema):
    if schema in paginated_schema_cache:
        return paginated_schema_cache[schema]

    class PaginatedSchema(ma.Schema):
        class Meta:
            ordered = True

        pagination = ma.Nested(pagination_schema)
        data = ma.Nested(schema, many=True)

    PaginatedSchema.__name__ = 'Paginated{}'.format(schema.__class__.__name__)
    paginated_schema_cache[schema] = PaginatedSchema
#     return PaginatedSchema


class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        ordered = True

    id = ma.auto_field(dump_only=True)
    url = ma.String(dump_only=True)
    username = ma.auto_field(required=True,
                             validate=validate.Length(min=3, max=64))
    email = ma.auto_field(required=True, validate=[validate.Length(max=120),
                                                   validate.Email()])
    password = ma.String(required=True, load_only=True,
                         validate=validate.Length(min=3))
    avatar_url = ma.String(dump_only=True)
    about_me = ma.auto_field()
    first_seen = ma.auto_field(dump_only=True)
    last_seen = ma.auto_field(dump_only=True)
    # posts_url = ma.URLFor('posts.user_all', values={'id': '<id>'},
    #                       dump_only=True)

    @validates('username')
    def validate_username(self, value):
        if not value[0].isalpha():
            raise ValidationError('Username must start with a letter')
        user = token_auth.current_user()
        old_username = user.username if user else None
        if value != old_username and \
                db.session.scalar(User.select().filter_by(username=value)):
            raise ValidationError('Use a different username.')

    @post_dump
    def fix_datetimes(self, data, **kwargs):
        data['first_seen'] += 'Z'
        data['last_seen'] += 'Z'
        return data


class UpdateUserSchema(UserSchema):
    old_password = ma.String(load_only=True, validate=validate.Length(min=3))

    @validates('old_password')
    def validate_old_password(self, value):
        if not token_auth.current_user().verify_password(value):
            raise ValidationError('Password is incorrect')


# class PostSchema(ma.SQLAlchemySchema):
#     class Meta:
#         model = Post
#         include_fk = True
#         ordered = True

#     id = ma.auto_field(dump_only=True)
#     url = ma.String(dump_only=True)
#     text = ma.auto_field(required=True, validate=validate.Length(
#         min=1, max=280))
#     timestamp = ma.auto_field(dump_only=True)
#     author = ma.Nested(UserSchema, dump_only=True)

#     @post_dump
#     def fix_datetimes(self, data, **kwargs):
#         data['timestamp'] += 'Z'
        # return data


class TokenSchema(ma.Schema):
    class Meta:
        ordered = True

    access_token = ma.String(required=True)
    refresh_token = ma.String()


class PasswordResetRequestSchema(ma.Schema):
    class Meta:
        ordered = True

    email = ma.String(required=True, validate=[validate.Length(max=120),
                                               validate.Email()])


class PasswordResetSchema(ma.Schema):
    class Meta:
        ordered = True

    token = ma.String(required=True)
    new_password = ma.String(required=True, validate=validate.Length(min=3))


class SubscriberSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Subscriber
        # ordered = True
        # unknown = EXCLUDE
        
    id = ma.auto_field(dump_only=True)
    email = ma.auto_field(required=True, validate=[validate.Length(max=120),
                                                   validate.Email()])
    organisation = ma.auto_field()
    region = ma.auto_field()
    subscription_date = ma.auto_field(dump_only=True)
    report_type = ma.auto_field()
    daily = ma.auto_field()
    weekly = ma.auto_field()
    active = ma.auto_field()
    
    @post_dump
    def fix_datetimes(self, data, **kwargs):
        data['subscription_date'] += 'Z'
        return data
    
class FeedbackSchema(ma.Schema):
    email = ma.String(required=True, validate=[validate.Length(max=120), validate.Email()])
    subject = ma.String(required=False)
    body = ma.String(required=True)
    
class DonorSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Donor
    id = ma.auto_field(dump_only=True)
    donor_name = ma.String(required=True)
    logo_image = ma.String(required=True)

class PublicationSchema(ma.Schema):
    class Meta:
        model = Publication
    publication_id = ma.Integer(required=True)
   
