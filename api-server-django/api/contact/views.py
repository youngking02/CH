from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import Contact, Communication, IMEI, IMSI  
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
        imeis = contact.imeis.all()
        imsis = contact.imsis.all()
        communications = contact.communications.all()
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
    try:
        imei_number = request.GET.get('imei')
        if not imei_number:
            return JsonResponse({'error': 'IMEI parameter is required'}, status=400)

        imeis = IMEI.objects.filter(imei=imei_number)
        if not imeis.exists():
            return JsonResponse({'error': 'No records found for the given IMEI'}, status=404)

        results = [
            {
                'phone_number': imei.phone_number.phone_number,
                'start_date': imei.start_date,
                'end_date': imei.end_date
            } 
            for imei in imeis
        ]
        return JsonResponse(results, safe=False)

    except ObjectDoesNotExist:
        return JsonResponse({'error': 'IMEI not found'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['GET'])
def search_by_imsi(request):
    try:
        imsi = request.GET.get('imsi')
        start_date = request.GET.get('start_date')
        end_date = request.GET.get('end_date')
        
        if not imsi or not start_date or not end_date:
            return JsonResponse({'error': 'IMSI, start_date, and end_date parameters are required'}, status=400)

        table_name = f"contact_imsi_{start_date.replace('-', '_')}"
        
        with connection.cursor() as cursor:
            query = f"""
                SELECT phone_number, start_date, end_date
                FROM {table_name}
                WHERE imsi = %s AND start_date >= %s AND end_date <= %s
            """
            cursor.execute(query, [imsi, start_date, end_date])
            rows = cursor.fetchall()
        
        results = [{'phone_number': row[0], 'start_date': row[1], 'end_date': row[2]} for row in rows]
        return JsonResponse(results, safe=False)
    except Exception as e:
        logger.error(f"Error in search_by_imsi: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['GET'])
def search_traffic_by_imsi(request):
    imsi = request.GET.get('imsi')
    start_date = request.GET.get('start_date')
    end_date = request.GET.get('end_date')
    
    if not imsi or not start_date or not end_date:
        return JsonResponse({'error': 'IMSI, start_date, and end_date parameters are required'}, status=400)
    
    table_name = f"contact_imsi_{start_date.replace('-', '_')}"
    
    with connection.cursor() as cursor:
        query = f"""
            SELECT phone_number_id, communication_type, duration, timestamp, imei, site_name, locality
            FROM {table_name}
            WHERE imsi = %s AND timestamp >= %s AND timestamp <= %s
        """
        cursor.execute(query, [imsi, start_date, end_date])
        rows = cursor.fetchall()
    
    results = [{'phone_number': row[0], 'communication_type': row[1], 'duration': row[2], 'timestamp': row[3], 'imei': row[4], 'site_name': row[5], 'locality': row[6]} for row in rows]
    return JsonResponse(results, safe=False)
