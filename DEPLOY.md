# 🚀 GUÍA DE DEPLOY SEGURO - GIFTIP

## 📋 PRE-DEPLOY CHECKLIST

### Seguridad ✅
- [x] `.env` NO está en git (en .gitignore)
- [x] `.env.example` incluido como referencia
- [x] Sin contraseñas/tokens hardcodeados
- [x] RLS habilitado en Supabase
- [x] SECURITY.md completado
- [x] Commit seguro hecho

### Código ✅
- [x] Supabase integrado correctamente
- [x] Servicios CRUD funcionales
- [x] Hooks personalizados listos
- [x] Context de autenticación creado
- [x] Documentación completa

### Variables de Entorno
- [x] VITE_SUPABASE_URL configurada
- [x] VITE_SUPABASE_ANON_KEY configurada
- [x] Prefijo VITE_ para variables públicas

---

## 🌍 DEPLOY A VERCEL (Recomendado)

### Opción 1: Deploy automático desde GitHub

**Paso 1: Conectar repositorio**
```
1. Ve a https://vercel.com
2. "New Project" → "Import Git Repository"
3. Selecciona: zuswOS/giftipsport
4. Vercel lo detecta automáticamente (Vite)
```

**Paso 2: Configurar variables de entorno**
```
1. En Vercel, ve a "Settings" → "Environment Variables"
2. Agregar:
   - VITE_SUPABASE_URL = https://gfnpncaworrnvllulfqq.supabase.co
   - VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
3. Seleccionar: Production, Preview, Development (si aplica)
4. "Save"
```

**Paso 3: Deploy**
```
Vercel automáticamente:
1. Detecta cambios en main
2. Ejecuta npm install
3. Ejecuta npm run build
4. Publica cambios a https://giftipsport.vercel.app
```

---

### Opción 2: Deploy manual

**Si prefieres control total:**

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Ingresar variables de entorno cuando pida
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

---

## 🔒 VERIFICACIÓN DE SEGURIDAD ANTES DE DEPLOY

### 1. Auditar archivos sensibles

```bash
# Verificar .env no está tracked
git ls-files | grep "\.env$"
# ✅ Debería estar vacío

# Verificar .env.example está limpio
cat .env.example | grep -i "eyJ\|sk_\|pk_"
# ✅ Debería estar vacío (no contiene secretos reales)

# Verificar .gitignore incluye .env
grep "\.env" .gitignore
# ✅ Debería incluir .env
```

### 2. Buscar secretos en código

```bash
# Buscar hardcoded secrets
grep -r "sk_live_" src/ --include="*.js" --include="*.jsx"
grep -r "STRIPE_SECRET" src/ --include="*.js" --include="*.jsx"
grep -r "password:" src/ --include="*.js" --include="*.jsx"
# ✅ No debería encontrar nada

# Revisar imports de .env
grep -r "import.meta.env" src/ --include="*.js" --include="*.jsx"
# ✅ Debería mostrar solo VITE_* variables
```

### 3. Verificar Supabase RLS

En https://app.supabase.com:

```
1. Selecciona proyecto
2. SQL Editor → Ejecuta esto:
```

```sql
-- Verificar RLS habilitado
SELECT tablename FROM pg_tables 
WHERE schemaname = 'public' 
AND hasindexes = true;

-- Debería listar todas las tablas
-- Si alguna NO tiene índices, ejecuta supabase_schema.sql
```

---

## 📊 URL DE DEPLOY

Después del deploy, tu app estará en:

```
https://giftipsport.vercel.app
```

O si tienes dominio personalizado:

```
https://tudominio.com
```

---

## 🔐 PASOS POST-DEPLOY

### Inmediatamente después:

1. **Verificar HTTPS está activo**
   ```
   https://giftipsport.vercel.app
   
   ✅ Debería haber candado 🔒 en navegador
   ❌ Si es http://, algo está mal
   ```

2. **Probar Supabase conecta**
   ```
   Abre DevTools (F12)
   Ve a Console
   
   Debería NO haber errores de Supabase
   ✅ Si ves "Connected to Supabase", perfecto
   ❌ Si ves error de CORS, revisa variables de entorno
   ```

3. **Probar flujo básico**
   ```
   - Abre la página de inicio
   - Intenta ver planes
   - Intenta ver blog
   - Intenta ver comunidad
   
   ✅ Todo debería cargar sin errores
   ```

4. **Revisar logs en Vercel**
   ```
   Vercel Dashboard → Deployments → Build Logs
   
   ✅ Build debería ser exitoso
   ❌ Si hay errores, revisa npm run build localmente
   ```

---

## 🛡️ MONITOREO DE SEGURIDAD

### Activos importantes después del deploy:

1. **GitHub Security** (Automático en repositorio público)
   ```
   GitHub → Settings → Security & analysis
   - Dependabot alerts: ✅ ON
   - Secret scanning: ✅ ON
   ```

2. **Vercel Analytics** (Opcional pero recomendado)
   ```
   Vercel Dashboard → Analytics
   Monitorea: Performance, tráfico, errores
   ```

3. **Supabase Logs**
   ```
   https://app.supabase.com → Logs
   Revisa errores de autenticación
   ```

---

## 🚨 TROUBLESHOOTING

### "CORS error from Supabase"

**Causa:** Variables de entorno no configuradas

**Solución:**
```
1. Vercel Dashboard → Settings → Environment Variables
2. Verificar VITE_SUPABASE_URL es correcto
3. Re-deploy: vercel --prod
```

### "Cannot find module 'supabase'"

**Causa:** npm install no corrió

**Solución:**
```
En Vercel:
1. Redeploy
2. O ejecuta localmente: npm install && npm run build
```

### "Blank page / Loading infinito"

**Causa:** Error en build

**Solución:**
```
1. Vercel → Deployments → Build logs
2. Busca errores
3. Ejecuta localmente: npm run build
4. Arregla y push
```

---

## 📈 SIGUIENTE FASE DESPUÉS DE DEPLOY

Una vez en producción, continúa con:

1. **FASE 1 - Autenticación funcional** (6h)
2. **FASE 3 - Storage para imágenes** (3h)
3. **FASE 2 - Conectar componentes** (8h)

Ver: `ROADMAP.md`

---

## 📝 DOCUMENTOS DE REFERENCIA

- `SECURITY.md` - Guía completa de seguridad
- `SUPABASE_SETUP.md` - Cómo usar Supabase en código
- `ROADMAP.md` - Fases del desarrollo
- `.env.example` - Variables de entorno requeridas

---

## ✅ CHECKLIST FINAL PRE-DEPLOY

```
SEGURIDAD:
- [ ] .env NO está en git
- [ ] .env.example existe
- [ ] No hay secrets hardcodeados
- [ ] RLS habilitado en Supabase
- [ ] Build pasa sin errores

CONFIGURACIÓN:
- [ ] VITE_SUPABASE_URL configurada
- [ ] VITE_SUPABASE_ANON_KEY configurada
- [ ] vercel.json correcto
- [ ] package.json scripts OK

DEPLOY:
- [ ] GitHub branch está actualizada
- [ ] Commit hecho y pusheado
- [ ] Variables en Vercel configuradas
- [ ] Primera prueba en staging
- [ ] Verificación HTTPS activo

POST-DEPLOY:
- [ ] App carga sin errores
- [ ] Supabase conecta correctamente
- [ ] No hay alerts de seguridad
- [ ] Logs monitoreados
```

---

**Última actualización:** 2026-06-21
**Estado:** Listo para deploy ✅

Próximo comando: `vercel --prod` o deploy desde GitHub
