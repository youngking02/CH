from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Contact, Communication, IMEI, IMSI ,PhoneNumber
from django.db import connection
import logging
@api_view(['GET'])
def search_by_name(request):
    # Obtenir les noms depuis les paramètres de requête
    names = request.GET.getlist('name')

    if not names:
        return JsonResponse({'error': 'At least one name parameter is required'}, status=400)

    results = []

    # Rechercher les contacts pour chaque nom
    for name in names:
        first_name, last_name = name.split(' ', 1) if ' ' in name else (name, '')

        # Rechercher les contacts en fonction des noms fournis
        contacts = Contact.objects.filter(
            first_name__icontains=first_name,
            last_name__icontains=last_name
        )

        for contact in contacts:
            phone_numbers = contact.phone_numbers.all()
            for phone_number in phone_numbers:
                results.append({
                    'phone_number': phone_number.number,
                    'first_name': contact.first_name,
                    'last_name': contact.last_name,
                    'birth_date': contact.birth_date
                })

    return JsonResponse(results, safe=False)

@api_view(['GET'])
def search_by_phone_number(request):
    phone_number = request.GET.get('phone_number')
    contacts = Contact.objects.filter(phone_numbers__number=phone_number).distinct()

    if not contacts.exists():
        return JsonResponse({'error': 'Contact not found'}, status=404)

    results = []
    for contact in contacts:
        
        contact_data = {
            'first_name': contact.first_name,
            'last_name': contact.last_name,
            'birth_date': contact.birth_date,
        }
        results.append(contact_data)

    return JsonResponse(results, safe=False)

@api_view(['GET'])
def search_communications_by_date_range(request):
    phone_number = request.GET.get('phone_number')
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    communications = Communication.objects.filter(
        contact__phone_numbers__number=phone_number,
        timestamp__range=[start_date, end_date]
    )
    results = [{'correspondent': comm.correspondent, 'duration': comm.duration, 'timestamp': comm.timestamp, 'imei': comm.imei, 'site_name': comm.site_name, 'locality': comm.locality, 'imsi': comm.imsi, 'communication_type': comm.get_communication_type_display()} for comm in communications]
    return JsonResponse(results, safe=False)

@api_view(['GET'])
def search_by_imei(request):
    imei_number = request.GET.get('imei')
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    if not imei_number or not start_date or not end_date:
        return JsonResponse({'error': 'IMEI, start_date, and end_date parameters are required'}, status=400)

    try:
        # Récupérer toutes les communications liées à l'IMEI donné et filtrer par plage de dates
        communications = Communication.objects.filter(
            imei=imei_number,
            timestamp__range=[start_date, end_date]
        ).select_related('contact')

        results = []
        for comm in communications:
            # Récupérer tous les numéros de téléphone associés au contact
            phone_numbers = PhoneNumber.objects.filter(contact=comm.contact)
            for phone_number in phone_numbers:
                results.append({
                    'phone_number': phone_number.number,
                    'correspondent': comm.correspondent,
                    'duration': comm.duration,
                    'timestamp': comm.timestamp,
                    'site_name': comm.site_name,
                    'locality': comm.locality,
                    'imsi': comm.imsi,
                    'communication_type': comm.get_communication_type_display(),
                })

        return JsonResponse(results, safe=False)
    
    except Exception as e:
        # Gérer toute exception et retourner une erreur
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['GET'])
def search_by_imsi(request):
    try:
        imsi = request.GET.get('imsi')
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')

        if not imsi or not start_date or not end_date:
            return JsonResponse({'error': 'IMSI, start_date, and end_date parameters are required'}, status=400)

        table_name = 'contact_imsi'
        logger.debug(f"Querying table: {table_name} with IMSI: {imsi}, start_date: {start_date}, end_date: {end_date}")

        with connection.cursor() as cursor:
            query = f"""
                SELECT pn.number, ci.start_date, ci.end_date
                FROM {table_name} ci
                JOIN contact_phonenumber pn ON ci.phone_number_id = pn.id
                WHERE ci.imsi = %s AND ci.start_date >= %s AND ci.end_date <= %s
            """
            logger.debug(f"Executing query: {query} with params: {[imsi, start_date, end_date]}")
            cursor.execute(query, [imsi, start_date, end_date])
            rows = cursor.fetchall()

        results = [{'phone_number': row[0], 'start_date': row[1], 'end_date': row[2]} for row in rows]
        return JsonResponse(results, safe=False)
    except Exception as e:
        logger.error(f"Error in search_by_imsi: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['GET'])
def search_communications_by_imsi(request):
    imsi_number = request.GET.get('imsi')
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')

    if not imsi_number or not start_date or not end_date:
        return JsonResponse({'error': 'IMSI, start_date, and end_date parameters are required'}, status=400)

    try:
        imsi_records = IMSI.objects.filter(imsi=imsi_number)
        phone_numbers = [record.phone_number for record in imsi_records]

        if not phone_numbers:
            return JsonResponse({'error': 'No phone numbers found for the given IMSI'}, status=404)

        communications = Communication.objects.filter(
            contact__phone_numbers__in=phone_numbers,
            timestamp__range=[start_date, end_date]
        ).select_related('contact')

        results = []
        for comm in communications:
            results.append({
                'phone_number': comm.contact.phone_numbers.first().number,
                'correspondent': comm.correspondent,
                'duration': comm.duration,
                'timestamp': comm.timestamp,
                'imei': comm.imei,
                'site_name': comm.site_name,
                'locality': comm.locality,
                'communication_type': comm.get_communication_type_display(),
            })

        return JsonResponse(results, safe=False)
    
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)