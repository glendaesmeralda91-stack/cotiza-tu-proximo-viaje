# Viaja con Edwin

Sitio web con formulario, WhatsApp y almacenamiento en Excel.

## Ejecutar
1. Instala Node.js 18 o superior.
2. Abre una terminal en esta carpeta.
3. Ejecuta `npm install`.
4. Opcional: configura `ADMIN_TOKEN` para proteger la descarga del Excel.
5. Ejecuta `npm start`.
6. Abre `http://localhost:3000`.

## Excel
Las solicitudes se guardan en `data/cotizaciones.xlsx`. La hoja `Tarifas` queda preparada para introducir precios reales por país, ciudad y servicio.

## Descargar la base
Abre `/admin/descargar-excel`. Si configuraste token, usa `/admin/descargar-excel?token=TU_TOKEN`.

## Avisos
- El logotipo es un diseño original de avión rojo para Viaja con Edwin; no copia el logotipo de otra empresa.
- Haz copias de seguridad del Excel. Para producción con varias personas cotizando a la vez, conviene migrar a una base de datos real y exportar a Excel.
- Informa a los clientes sobre el uso de sus datos y restringe el acceso al archivo.
