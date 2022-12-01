FROM python:3.10-slim

RUN useradd prmn-app

WORKDIR /home/prmn-app/api

COPY requirements.txt requirements.txt
RUN python -m venv venv
RUN venv/bin/pip install --upgrade pip
RUN venv/bin/pip install -r requirements.txt
RUN venv/bin/pip install gunicorn

COPY api api
COPY data_cache data_cache
COPY data  data
COPY migrations migrations
COPY prmn-app.py config.py .flaskenv app.json db.sqlite data.h5 large.parquet boot.sh ./
RUN chmod +x boot.sh

ENV FLASK_APP prmn-app.py

RUN chown -R prmn-app:prmn-app ./
USER prmn-app

EXPOSE 5000
ENTRYPOINT ["./boot.sh"]
