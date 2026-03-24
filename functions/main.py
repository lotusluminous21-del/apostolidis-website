from firebase_admin import initialize_app

initialize_app()

from contact import on_contact_inquiry_created
