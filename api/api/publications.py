import json
import requests
from flask import Blueprint
from config import Config

publications = Blueprint('publications', __name__)

@publications.route('/publications')
def all():
    try:
        resp = requests.get(
                "https://data.unhcr.org/api-content/documents.json", verify=False, 
                params={"API_KEY":Config.API_KEY_UNHCR, "order[created]":"desc", "country":"som"}
        )
    except requests.exceptions.SSLError:
        pass
    publications = resp.json()
    
    return json.dumps(publications)

#from apifairy import  body, response, other_responses


# from api import db
# from api.models import Publication
# from api.schemas import PublicationSchema



# publications = Blueprint('publications', __name__)
# publication_schema = PublicationSchema()
# publications_schema = PublicationSchema(many=True)


# @publications.route('/publications', methods=['POST'])
# @body(publication_schema)
# @response(publication_schema, 201)
# def new(args):
#     """Create a new publication"""
#     publication = Publication(**args)
#     db.session.add(publication)
#     db.session.commit()

#     return publication

# @publications.route('/publications', methods=['GET'])
# @response(publication_schema, 201)
# def all():
#     """Retrieve all publications"""
#     all_publications = db.session.query(Publication).all()
#     return all_publications


# @publications.route('/publications/<int:id>', methods=['DELETE'])
# # @authenticate(token_auth)
# @other_responses({403: 'Not allowed to delete the publication'})
# def delete(id):
#     """Delete a publication"""
#     publication = db.session.get(Publication, id)

#     db.session.delete(publication)
#     db.session.commit()
#     return '', 204



         