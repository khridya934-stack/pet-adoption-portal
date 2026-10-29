from django.core.mail import send_mail

def send_adoption_email (adoption_request, action):
    applicant = adoption_request.applicant
    pet = adoption_request.pet

    if not applicant.email:
        return

    send_mail(
        subject=f"Adoption Request {action}",
        message=(
            f"Hello {applicant.username},\n\n"
            f"Your adoption request for {pet.name} has been {action.lower()}, \n\n"
            "Thankyou for using Pet Adoption Portal."
        ),
        from_email=None,
        recipient_list=[applicant.email],
        fail_silently=False
    )