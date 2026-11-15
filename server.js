const express=require('express');const path=require('path');const fs=require('fs');const XLSX=require('xlsx');const {randomUUID}=require('crypto');
const app=express();const PORT=process.env.PORT||3000;const FILE=path.join(__dirname,'data','cotizaciones.xlsx');const PHONE='50487900263';
app.use(express.json({limit:'200kb'}));app.use(express.static(path.join(__dirname,'public')));
const clean=(v,max=300)=>String(v??'').trim().slice(0,max);
app.post('/api/cotizaciones',(req,res)=>{try{const b=req.body||{};const required=['nombre','telefono','paisOrigen','ciudadOrigen','paisDestino','ciudadDestino','salida'];for(const k of required){if(!clean(b[k]))return res.status(400).json({error:'Falta completar: '+k});}
const wb=XLSX.readFile(FILE);const ws=wb.Sheets['Cotizaciones'];const rows=XLSX.utils.sheet_to_json(ws,{defval:''});const id=randomUUID().split('-')[0].toUpperCase();const services=Array.isArray(b.servicios)?b.servicios.map(x=>clean(x,50)).join(', '):clean(b.servicios,200);
rows.push({'ID':id,'Fecha y hora':new Date().toLocaleString('es-HN',{timeZone:'America/Tegucigalpa'}),'Nombre completo':clean(b.nombre,100),'Telefono':clean(b.telefono,30),'Correo':clean(b.correo,100),'Pais de origen':clean(b.paisOrigen,60),'Ciudad de origen':clean(b.ciudadOrigen,60),'Pais de destino':clean(b.paisDestino,60),'Ciudad de destino':clean(b.ciudadDestino,60),'Fecha salida':clean(b.salida,20),'Fecha regreso':clean(b.regreso,20),'Pasajeros':Number(b.pasajeros)||1,'Tipo de viaje':clean(b.tipo,40),'Servicios requeridos':services,'Presupuesto (HNL)':Number(b.presupuesto)||'','Observaciones':clean(b.observaciones,500),'Estado':'Nueva'});
wb.Sheets['Cotizaciones']=XLSX.utils.json_to_sheet(rows,{header:Object.keys(rows[0])});XLSX.writeFile(wb,FILE);
const msg=`✈️ *NUEVA COTIZACIÓN - cotiza tu proximo vije a cualquier parte del mundo*

🆔 ${id}
👤 *Nombre:* ${clean(b.nombre)}
📱 *Teléfono:* ${clean(b.telefono)}
📍 *Origen:* ${clean(b.ciudadOrigen)}, ${clean(b.paisOrigen)}
🌎 *Destino:* ${clean(b.ciudadDestino)}, ${clean(b.paisDestino)}
📅 *Salida:* ${clean(b.salida)}
📅 *Regreso:* ${clean(b.regreso)||'No especificada'}
👥 *Pasajeros:* ${Number(b.pasajeros)||1}
🎫 *Tipo:* ${clean(b.tipo)}
🧳 *Servicios:* ${services||'Boleto aéreo'}
💰 *Presupuesto:* ${clean(b.presupuesto)||'No especificado'} HNL
📝 *Observaciones:* ${clean(b.observaciones)||'Ninguna'}`;
res.json({ok:true,id,whatsappUrl:`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`});}catch(err){console.error(err);res.status(500).json({error:'No se pudo guardar la cotización en Excel.'});}});
app.get('/admin/descargar-excel',(req,res)=>{if(process.env.ADMIN_TOKEN&&req.query.token!==process.env.ADMIN_TOKEN)return res.status(401).send('No autorizado');res.download(FILE,'cotizaciones-viaja-con-edwin.xlsx');});
app.listen(PORT,()=>console.log(`cotiza tu proximo viaje a cualquier parte del mundo : http://localhost:${PORT}`));