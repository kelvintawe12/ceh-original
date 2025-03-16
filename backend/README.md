## Circular Economy Hub

This guide provides step-by-step instructions to set up the Circular Economy Hub Django project on your local machine.

Prerequisites

Ensure you have the following installed:

 Python (>=3.8)

 pip (Python package manager)

## virtualenv (for creating virtual environments)

PostgreSQL or SQLite (depending on project settings)

Setup Instructions

## Clone the Repository

git clone 'https://github.com/kelvintawe12/ceh-original.git'
cd circular-economy-hub

## Create and Activate Virtual Environment

On macOS/Linux:

python3 -m venv venv
source venv/bin/activate

On Windows:

python -m venv venv
venv\Scripts\activate

## Install Dependencies

pip install -r requirements.txt

## Setup Environment Variables

Create a .env file in the root of the project if it doesn’t already exist and add the following:

SECRET_KEY='django-insecure-!a*ea8!+&3xzved!_uu6mt2mzvm3&7nz&ls0oal@w83x^^qj!s'
DEBUG=True

## Apply Migrations

python manage.py migrate

## Create a Superuser (Optional, for Admin Access)

python manage.py createsuperuser

Follow the prompts to set up an admin user.

## Run the Development Server

python manage.py runserver

Access the project at http://127.0.0.1:8000/.

## Additional Commands

Running Tests

python manage.py test

## Collecting Static Files

python manage.py collectstatic

## Contributing

Feel free to fork this project and submit pull requests!

License

This project is licensed under the MIT License.

