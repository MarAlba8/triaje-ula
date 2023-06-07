# Triaje-ULA

## Quick Start

To get this project up and running locally on your computer follow the following steps.

1. Clone this repository to your local machine.
```
$ git clone https://github.com/MarAlba8/triaje-ula.git
```
2. Create a python virtual environment and activate it.

```
$ python3 -m venv venv
$ source venv/bin/activate
```
4. Open up your terminal and run the following command to install the packages used in this project.

```
$ pip install -r requirements.txt
```
4. Create an `.env` file inside `config` folder and update with the environment variables accordingly.
5. Go to the `src` folder and run the following commands to setup the database tables.

```
$ python manage.py makemigrations
$ python manage.py migrate
```
6. Create a superuser
```
$ python manage.py createsuperuser
```

7. Load the data for the clinics 
```
$ python manage.py loaddata addClinics.json
```
8. Run the development server using:

```
$ python manage.py runserver
```

8. Open a browser and go to http://localhost:8000/.
