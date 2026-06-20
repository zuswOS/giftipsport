# 🔒 GUÍA DE SEGURIDAD - GIFTIP

## ⚠️ REGLAS CRÍTICAS DE SEGURIDAD

### 1. NUNCA PUBLIQUES EN GIT:
```
❌ NUNCA
.env (archivo real con secretos)
Contraseñas
API Keys de servicios privados
Stripe Secret Keys
Database passwords
Private encryption keys

✅ SÍ PUEDES
.env.example (sin valores)
VITE_SUPABASE_URL (es pública)
VITE_SUPABASE_ANON_KEY (tiene RLS, es segura)
Variables públicas (VITE_*)
```

### 2. VARIABLES DE ENTORNO

**PÚBLICAS (en cliente)** - Prefijo `VITE_`:
```
VITE_SUPABASE_URL     ✅ Segura (es la URL pública)
VITE_SUPABASE_ANON_KEY ✅ Segura (limitada por RLS)
VITE_GA_ID            ✅ Segura (Google Analytics)
VITE_STRIPE_PUBLISHABLE_KEY ✅ Segura (Stripe pública)
```

**PRIVADAS (en servidor SOLO)** - Sin prefijo `VITE_`:
```
STRIPE_SECRET_KEY     ❌ NUNCA en cliente
SUPABASE_SERVICE_ROLE_KEY ❌ NUNCA en cliente
JWT_SECRET            ❌ NUNCA en cliente
DATABASE_PASSWORD     ❌ NUNCA en cliente
API_KEYS              ❌ NUNCA en cliente
```

### 3. POLÍTICAS DE ROW LEVEL SECURITY (RLS)

**YA ESTÁN HABILITADAS EN TODAS LAS TABLAS:**
```sql
-- Usuarios pueden ver solo su perfil
SELECT auth.uid() = id

-- Asesores solo si verificados
SELECT verified = TRUE

-- Comunidad es pública
SELECT true
```

Esto significa:
- ✅ Nadie puede ver datos privados de otros usuarios
- ✅ Sin autenticación = datos limitados
- ✅ Incluso si alguien tiene la ANON_KEY, solo ve lo permitido por RLS

### 4. AUTENTICACIÓN

**Supabase Auth proporciona:**
- ✅ Hashing de contraseñas (bcrypt)
- ✅ Sessions seguras
- ✅ 2FA opcional
- ✅ Email verification
- ✅ Password recovery

**Mejor práctica:**
```jsx
// ✅ CORRECTO - Usar sesiones de Supabase
const { user } = await supabase.auth.getSession()

// ❌ NUNCA - Guardar contraseñas
localStorage.setItem('password', password) // ❌ MAL
```

### 5. COMUNICACIÓN

**HTTPS OBLIGATORIO:**
```
✅ https://app.tudominio.com
❌ http://app.tudominio.com
```

**En desarrollo:**
```
✅ http://localhost:3000 (solo local)
❌ Acceder desde otra máquina en HTTP
```

### 6. DATOS SENSIBLES EN COMPONENTES

**❌ NO HAGAS ESTO:**
```jsx
// Nunca hardcodear secretos
const API_KEY = "sk_live_xxxxx" // ❌ MAL

// Nunca imprimir en logs
console.log("User password:", password) // ❌ MAL

// Nunca guardar en localStorage sin encriptar
localStorage.setItem("token", token) // ❌ Supabase lo hace bien
```

**✅ HAZ ESTO:**
```jsx
// Variables de entorno con VITE_
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL

// Logging seguro
console.log("User authenticated:", user.email)

// Supabase maneja tokens automáticamente
const { data: { session } } = await supabase.auth.getSession()
```

### 7. SANITIZACIÓN DE DATOS

**Antes de guardar en BD:**
```jsx
// ✅ CORRECTO - Validar entrada
const sanitizedEmail = email.trim().toLowerCase()
if (!isValidEmail(sanitizedEmail)) throw new Error("Invalid email")

// ✅ CORRECTO - Usar prepared statements (ya lo hace Supabase)
const { data } = await supabase
  .from('users')
  .insert([{ email: userEmail }])

// ❌ NUNCA - SQL injection (Supabase no permite)
await supabase.from('users').select(`* WHERE email = '${email}'`)
```

### 8. GESTIÓN DE ERRORES

**Seguro:**
```jsx
// ✅ CORRECTO - Error genérico en UI
catch (error) {
  toast.error("Algo salió mal. Intenta de nuevo.")
  console.error("Details:", error) // Solo en desarrollo
}

// ❌ INCORRECTO - Exponer detalles a usuario
toast.error(`Database error: ${error.message}`)
```

### 9. RATE LIMITING

**Supabase proporciona:**
- Auth: 3-4 requests/segundo por IP
- API: Según tu plan

**Implementar en cliente:**
```jsx
// Prevenir spam de clicks
const [loading, setLoading] = useState(false)

const handleSubmit = async () => {
  if (loading) return // Prevenir envíos múltiples
  setLoading(true)
  try {
    await submit()
  } finally {
    setLoading(false)
  }
}
```

### 10. LOGS Y MONITOREO

**En desarrollo:**
```
Logs locales están OK
console.log es seguro (solo ves tú)
```

**En producción:**
```
Usar servicio de logging: Sentry, LogRocket
Nunca loguear: emails, contraseñas, datos privados
Loguear: eventos, errores, métricas
```

---

## 📋 CHECKLIST PRE-DEPLOY

### Seguridad:
- [ ] .env.example existe y NO tiene secretos reales
- [ ] .gitignore incluye .env
- [ ] Sin contraseñas/tokens hardcodeados
- [ ] RLS habilitado en todas las tablas
- [ ] HTTPS en producción
- [ ] Variables de entorno correctamente configuradas

### Datos:
- [ ] Sanitización de inputs
- [ ] Validación de formularios
- [ ] Error handling seguro
- [ ] Logging apropiado

### API:
- [ ] Supabase Auth funcionando
- [ ] Políticas RLS verificadas
- [ ] No hay SQL injection posible
- [ ] Rate limiting en lugar

---

## 🚨 SI ALGO SE EXPONE:

1. **Credenciales comprometidas:**
   ```
   Ir a: https://app.supabase.com
   Proyecto → Settings → API
   "Regenerate keys" (esto invalida las viejas)
   ```

2. **Código comprometido:**
   ```
   git log --all --grep="secret"
   git log --all --oneline | grep -E "(password|key|secret|token)"
   ```

3. **Inmediatamente:**
   ```
   Cambiar todas las contraseñas
   Regenerar API keys
   Revisar logs de acceso
   Notificar usuarios si necesario
   ```

---

## 📚 RECURSOS

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Supabase Security](https://supabase.com/docs/guides/auth)
- [Node Security](https://snyk.io)
- [Dependabot (GitHub)](https://dependabot.com)

---

## 🔗 COMANDOS ÚTILES

```bash
# Verificar si hay secretos en git
git log -p | grep -i "password\|secret\|key"

# Buscar archivos sensibles
find . -name "*.env" -o -name "*.key" -o -name "*.pem"

# Verificar .gitignore
cat .gitignore | grep -E "\.env|secrets|keys"

# Auditar dependencias
npm audit
npm audit fix

# Verificar variables de entorno
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

---

**Última actualización:** 2026-06-21
**Estado:** ✅ Proyecto seguro para deploy
