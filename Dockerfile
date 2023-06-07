FROM python:3.9.13

ENV SECRET_KEY = "django-insecure-cu)p4wds$5sf9#wnc*!+g1!-xd!&@_6#2e=!7w@0nd%d#oo%wu"
# Install dependencies
RUN pip install pipenv
COPY Pipfile* /
#RUN pipenv lock --requirements > requirements.txt
#RUN apk add --update --no-cache --virtual .tmp gcc libc-dev

COPY requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt
# Copy sources files
WORKDIR /code
COPY . .
# Default port
ARG ARG_DEFAULT_PORT=8000
EXPOSE $ARG_DEFAULT_PORT
ENV DEFAULT_PORT=${ARG_DEFAULT_PORT}
# Install migrations
RUN python manage.py migrate
# Run server
ENTRYPOINT python manage.py runserver 0.0.0.0:${DEFAULT_PORT}