# 🚀 Integración Supabase - Guía Completa

## 📦 Instalación y Configuración

### 1. Variables de Entorno ✅
Tu archivo `.env` ya está configurado con:
```env
VITE_SUPABASE_URL=https://gfnpncaworrnvllulfqq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Archivos Creados

```
project_giftip/
├── src/
│   ├── lib/
│   │   └── supabaseClient.js           ← Cliente inicializado
│   ├── services/
│   │   └── supabaseServices.js         ← CRUD para todas las tablas
│   ├── hooks/
│   │   └── useSupabase.js              ← Hooks para React
│   └── contexts/
│       └── SupabaseContext.jsx         ← Context de autenticación
├── supabase_schema.sql                 ← Script de base de datos
├── SUPABASE_INTEGRATION.md             ← Documentación
└── SUPABASE_EXAMPLES.jsx               ← Ejemplos de uso
```

## 🗄️ Base de Datos

### Crear Tablas en Supabase

1. **Abre tu dashboard de Supabase**: https://app.supabase.com
2. **Selecciona tu proyecto**
3. **Ve a SQL Editor**
4. **Copia todo el contenido de `supabase_schema.sql`**
5. **Pega y ejecuta**

**Esto crea automáticamente:**
- ✅ 11 tablas principales
- ✅ Índices para optimización
- ✅ Políticas de Row Level Security (RLS)

## 🛠️ Uso en Componentes

### Opción 1: Servicios (Recomendado)
```jsx
import { advisorsService } from '@/services/supabaseServices';

export function MyComponent() {
  const [advisors, setAdvisors] = useState([]);

  useEffect(() => {
    advisorsService.getAll()
      .then(data => setAdvisors(data));
  }, []);

  return <div>{advisors.length} asesores</div>;
}
```

### Opción 2: Hooks
```jsx
import { useSupabaseQuery } from '@/hooks/useSupabase';

export function MyComponent() {
  const { data, loading, query } = useSupabaseQuery();

  useEffect(() => {
    query('products', { select: '*', limit: 10 });
  }, []);

  return loading ? <p>...</p> : <p>{data?.length} productos</p>;
}
```

### Opción 3: Cliente directo
```jsx
import supabase from '@/lib/supabaseClient';

const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('role', 'advisor');
```

## 📚 Servicios Disponibles

### Usuarios
```jsx
import { usersService } from '@/services/supabaseServices';

usersService.getAll()
usersService.getById(userId)
usersService.create(userData)
usersService.update(userId, userData)
usersService.delete(userId)
```

### Asesores
```jsx
import { advisorsService } from '@/services/supabaseServices';

advisorsService.getAll()
advisorsService.getById(advisorId)
advisorsService.create(advisorData)
advisorsService.getBySpecialty(specialty)
```

### Planes
```jsx
import { plansService } from '@/services/supabaseServices';

plansService.getAll()
plansService.getById(planId)
plansService.create(planData)
```

### Productos
```jsx
import { productsService } from '@/services/supabaseServices';

productsService.getAll()
productsService.getById(productId)
productsService.getByCategory(category)
productsService.create(productData)
```

### Blog
```jsx
import { blogService } from '@/services/supabaseServices';

blogService.getAll()
blogService.getById(postId)
blogService.getByAuthor(authorId)
blogService.create(postData)
```

### Comunidad
```jsx
import { communityService } from '@/services/supabaseServices';

communityService.getPosts()
communityService.createPost(postData)
communityService.getComments(postId)
communityService.createComment(commentData)
```

### Órdenes
```jsx
import { ordersService } from '@/services/supabaseServices';

ordersService.getAll()
ordersService.getById(orderId)
ordersService.getByUserId(userId)
ordersService.create(orderData)
```

### Contacto
```jsx
import { contactService } from '@/services/supabaseServices';

contactService.create(contactData)
contactService.getAll()
contactService.markAsRead(messageId)
```

## 🔐 Autenticación

### Con Hooks
```jsx
import { useSupabaseAuth } from '@/hooks/useSupabase';

export function LoginComponent() {
  const { user, loading, signUp, signIn, signOut } = useSupabaseAuth();

  return (
    <>
      {user ? (
        <button onClick={signOut}>Cerrar sesión</button>
      ) : (
        <button onClick={() => signIn(email, password)}>Iniciar sesión</button>
      )}
    </>
  );
}
```

### Con Context
```jsx
import { useSupabaseContext } from '@/contexts/SupabaseContext';

export function MyComponent() {
  const { user, loading, signUp, signIn, signOut } = useSupabaseContext();

  if (loading) return <p>Cargando...</p>;

  return user ? (
    <p>Bienvenido {user.email}</p>
  ) : (
    <p>No autenticado</p>
  );
}
```

## 📝 Ejemplos Prácticos

### 1. Mostrar lista de asesores
```jsx
import { advisorsService } from '@/services/supabaseServices';

export function AdvisorsList() {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await advisorsService.getAll();
        setAdvisors(data);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      {advisors.map(advisor => (
        <div key={advisor.id}>
          <h3>{advisor.specialty}</h3>
          <p>Rating: {advisor.rating}</p>
          <p>${advisor.hourly_rate}/hora</p>
        </div>
      ))}
    </div>
  );
}
```

### 2. Crear producto
```jsx
import { productsService } from '@/services/supabaseServices';

export function CreateProduct() {
  const handleCreate = async (e) => {
    e.preventDefault();
    
    const productData = {
      name: 'Mi Producto',
      description: 'Descripción del producto',
      category: 'wellness',
      price: 29.99,
      stock: 10
    };

    try {
      const newProduct = await productsService.create(productData);
      console.log('Producto creado:', newProduct);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={handleCreate}>Crear Producto</button>;
}
```

### 3. Publicar en comunidad
```jsx
import { communityService } from '@/services/supabaseServices';

export function CreatePost() {
  const handlePublish = async (title, content) => {
    try {
      const post = await communityService.createPost({
        title,
        content,
        author_id: currentUser.id // Del contexto de autenticación
      });
      console.log('Post publicado:', post);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={() => handlePublish('Título', 'Contenido')}>Publicar</button>;
}
```

## 🔄 Migrar Datos Existentes

Si tienes datos en `src/data/blogData.js` o `src/data/plansData.js`:

```jsx
import { blogData } from '@/data/blogData';
import { blogService } from '@/services/supabaseServices';

async function migrateBlogData() {
  for (const post of blogData) {
    await blogService.create({
      title: post.title,
      content: post.content,
      slug: post.slug,
      author_id: 'uuid-del-autor',
      category: post.category,
      excerpt: post.excerpt,
      published: true
    });
  }
  console.log('Blog migrado exitosamente');
}

// Llamar: migrateBlogData()
```

## 🎯 Tareas Pendientes

- [ ] Ejecutar `supabase_schema.sql` en Supabase
- [ ] Migrar datos existentes (si aplica)
- [ ] Reemplazar llamadas a datos estáticos por servicios de Supabase
- [ ] Configurar Storage para imágenes
- [ ] Implementar webhooks para notificaciones
- [ ] Agregar más políticas de RLS según necesites

## 🆘 Solución de Problemas

### "Table 'users' does not exist"
**Solución**: Aún no has ejecutado el script SQL. Ve a Supabase > SQL Editor y copia/pega `supabase_schema.sql`.

### "Row Level Security (RLS) violation"
**Solución**: Las políticas RLS están configuradas. Verifica que el usuario esté autenticado y tenga permisos en esa tabla.

### Error de CORS
**Solución**: Supabase maneja CORS automáticamente. Si persiste, verifica que `VITE_SUPABASE_URL` sea correcto.

### Variables de entorno no se cargan
**Solución**: Reinicia el servidor de desarrollo (`npm run dev`).

## 📞 Recursos

- [Docs Supabase](https://supabase.com/docs)
- [Guía Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime](https://supabase.com/docs/guides/realtime)
- [Storage](https://supabase.com/docs/guides/storage)

## 📋 Checklist de Configuración

- ✅ Archivo `.env` configurado
- ✅ `supabaseClient.js` creado
- ✅ `supabaseServices.js` creado
- ✅ `useSupabase.js` creado
- ✅ `SupabaseContext.jsx` creado
- ✅ Script SQL documentado
- ✅ Ejemplos proporcionados

**¡Tu proyecto está listo para usar Supabase! 🎉**
