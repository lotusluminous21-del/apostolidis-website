import os
from firebase_functions import firestore_fn, options
from firebase_admin import firestore
import resend

@firestore_fn.on_document_created(document="contact_inquiries/{docId}", secrets=["RESEND_API_KEY"], region="europe-west1")
def on_contact_inquiry_created(event: firestore_fn.Event[firestore_fn.DocumentSnapshot | None]) -> None:
    if event.data is None:
        return
    data = event.data.to_dict()
    
    resend.api_key = os.environ.get("RESEND_API_KEY", "").strip()
    
    name = data.get('name', 'User')
    email = data.get('email', 'No email provided')
    message = data.get('message', 'No message')
    
    html_content = f"""
    <h2>New Contact Inquiry from {name}</h2>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Message:</strong></p>
    <p>{message}</p>
    """
    
    params = {
        "from": "New Lead <info@apostolidisconstructions.gr>",
        "to": "apostolidisconstruction@gmail.com",
        "reply_to": email,
        "subject": f"New Contact Inquiry from {name}",
        "html": html_content
    }
    
    try:
        resend.Emails.send(params)
        print("Email sent successfully.")
    except Exception as e:
        print(f"Error sending email: {e}")
