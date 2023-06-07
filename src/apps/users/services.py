from django.core.mail import send_mass_mail
from utils.exceptions import SendEmailError
from utils.logger import logger


def send_notifications_emails(patient, student):
    logger.info("Sending emails to patient and student")

    msg_patient = f"""Saludos, {patient.first_name} {patient.last_name}. 
    Hemos procesado su triaje online en la Fucultad de Odontologia. 
    El estudiante asignado para su cita se comunicará con usted a la brevedad posible. 
    Feliz Día.

    Estudiante Asignado: {student.username}

    """

    msg_student = f"""Saludos. Usted ha tomado el siguiente paciente de la lista de triaje Online de la facultad de Odontologia.
    Por favor, contactar al paciente a la brevedad posible para coordinar la cita.

    Paciente: {patient.first_name} {patient.last_name}
    Email: {patient.email}
    Teléfono: {patient.phone}

    """

    data_tuple = (
        (
            "Correo Paciente",
            msg_patient,
            "settings.EMAIL_HOST_USER",
            [f"{patient.email}"]
        ),
        (
            "Correo Estudiante",
            msg_student,
            "settings.EMAIL_HOST_USER",
            [f"{student.email}"]
        ),
    )

    try:
        send_mass_mail(data_tuple, fail_silently=False)
        logger.info("Emails sent")
    except OSError as exc:
        error_message = "Error: Se asignó el paciente pero no se enviaron" \
                        " los correos de confirmación. Por favor, hacerlo manualmente"
        logger.error(f"{error_message}. Error: {exc}")
        raise SendEmailError(error_message)

    except Exception as exc:
        error_message = "Error al Tomar el paciente. Por favor, vuelva a intentarlo"
        logger.error(f"{error_message}. Error: {exc}")
        raise SendEmailError(error_message)