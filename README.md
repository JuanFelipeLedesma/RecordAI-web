# README – RecordAI (Demo)

Este proyecto es una **demo front-end** de RecordAI que muestra todas las pantallas del PDF y los flujos principales:

- Dashboard (calendario navegable)
- Week
- Statistics (con **Custom por rango de fechas**)
- Upcoming
- Settings (incluye **History**)
- Menú de perfil (las opciones **Account Settings** y **Preferences** abren la sección correspondiente en Settings)
- Modales: **New Reminder** y **Detalle de Reminder**

> **Nota:** Es una demo 100% cliente (sin backend). Los datos de estadísticas usan un dataset de ejemplo generado en memoria con fechas reales para que el **Custom** funcione por rango de fechas.

---

## Tecnologías usadas

- **React + TypeScript**
- **Vite** (dev server y build)
- **Recharts** (gráfico de torta)
- CSS inline (estilos in-JS con objetos `style`)
- Sin dependencias de backend

---

## Requisitos

- **Node.js** v18 o superior (recomendado v18+)
- **npm** (o **pnpm** / **yarn** si prefieres)

Comprueba tu versión:

```bash
node -v
npm -v
