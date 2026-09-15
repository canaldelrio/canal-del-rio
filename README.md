# Canal del Río

Primer scaffold del portal web de Canal del Río, basado en la maqueta visual entregada.

## Stack
- Next.js + React + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL (modelo inicial)
- Lucide React
- Vercel para despliegue
- Cloudinary recomendado para imágenes en producción

## Arranque

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre http://localhost:3000

## Base de datos

Configura `DATABASE_URL` y ejecuta:

```bash
npx prisma generate
npx prisma db push
```

## Próximas fases
1. Convertir las tarjetas en datos reales desde PostgreSQL.
2. Crear panel de administración para noticias y programas.
3. Integrar señal en vivo.
4. Integrar clima real.
5. Crear páginas internas: noticia, programa, deportes, opinión, galería y contacto.
6. Añadir SEO, sitemap, analítica y despliegue.
