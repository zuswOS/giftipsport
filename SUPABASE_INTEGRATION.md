# Integración de Supabase en Giftip

## 📋 Estructura de la Base de Datos

### Tablas Principales

#### 1. **users** - Gestión de Usuarios
- `id`: UUID (Primary Key)
- `email`: Email único del usuario
- `full_name`: Nombre completo
- `profile_image_url`: URL de foto de perfil
- `role`: 'user', 'advisor', 'admin'
- `phone`, `country`, `city`: Información de contacto
- `is_active`: Estado del usuario

#### 2. **advisors** - Perfiles de Asesores
- `id`: UUID (Primary Key)
- `user_id`: Referencia a usuarios (Foreign Key)
- `specialty`: Área de especialidad
- `experience_years`: Años de experiencia
- `rating`, `total_reviews`: Evaluaciones
- `hourly_rate`: Tarifa por hora
- `verified`: Estado de verificación

#### 3. **plans** - Planes de Suscripción
- `id`: UUID (Primary Key)
- `name`: Nombre del plan
- `price`: Precio
- `billing_cycle`: 'monthly', 'yearly', 'one-time'
- `features`: JSON con características
- `max_sessions`, `max_advisors`: Límites del plan

#### 4. **products** - Marketplace
- `id`: UUID (Primary Key)
- `name`, `description`: Información del producto
- `category`: Categoría del producto
- `price`: Precio
- `advisor_id`: Asesor que vende el producto
- `rating`, `total_reviews`: Evaluaciones
- `stock`: Inventario disponible

#### 5. **orders** - Órdenes de Compra
- `id`: UUID (Primary Key)
- `user_id`: Comprador
- `product_id` / `plan_id`: Qué compró
- `order_number`: Número de referencia
- `status`: 'pending', 'completed', 'cancelled', 'refunded'
- `total_amount`: Monto total

#### 6. **blog_posts** - Artículos del Blog
- `id`: UUID (Primary Key)
- `title`, `content`: Contenido del artículo
- `author_id`: Autor (Referencia a usuarios)
- `slug`: URL amigable
- `published`: Estado de publicación
- `view_count`: Número de vistas

#### 7. **community_posts** - Posts de Comunidad
- `id`: UUID (Primary Key)
- `title`, `content`: Contenido del post
- `author_id`: Autor
- `likes`: Número de me gusta

#### 8. **community_comments** - Comentarios de Comunidad
- `id`: UUID (Primary Key)
- `post_id`: Post al que comenta
- `author_id`: Autor del comentario
- `content`: Texto del comentario

#### 9. **advisor_sessions** - Sesiones de Asesoría
- `id`: UUID (Primary Key)
- `user_id`: Cliente
- `advisor_id`: Asesor
- `status`: 'scheduled', 'in-progress', 'completed', 'cancelled'
- `scheduled_at`: Fecha/hora programada
- `duration_minutes`: Duración
- `rating`, `review`: Evaluación post-sesión

#### 10. **contact_messages** - Mensajes de Contacto
- Formulario de contacto
- `name`, `email`, `subject`, `message`
- `read`: Si fue leído

#### 11. **favorites** - Favoritos del Usuario
- `user_id`: Usuario
- `product_id` / `advisor_id`: Elemento favorito

---

## 🚀 Cómo Usar la Integración

### 1. **Ejecutar el Schema SQL en Supabase**

1. Ve a tu dashboard de Supabase: https://app.supabase.com
2. Selecciona tu proyecto
3. Abre la sección **SQL Editor**
4. Crea una nueva query
5. Copia y pega el contenido de `supabase_schema.sql`
6. Ejecuta la query

### 2. **Usar los Servicios en Componentes**

```jsx
import { advisorsService } from '@/services/supabaseServices';

export function AdvisorsComponent() {
  const [advisors, setAdvisors] = useState([]);
  
  useEffect(() => {
    advisorsService.getAll()
      .then(data => setAdvisors(data))
      .catch(err => console.error(err));
  }, []);
  
  return (
    <div>
      {advisors.map(advisor => (
        <div key={advisor.id}>{advisor.specialty}</div>
      ))}
    </div>
  );
}
```

### 3. **Usar los Hooks de Supabase**

```jsx
import { useSupabaseQuery, useSupabaseMutation } from '@/hooks/useSupabase';

export function ProductsComponent() {
  const { data: products, loading, query } = useSupabaseQuery();
  const { insert, loading: inserting } = useSupabaseMutation();
  
  useEffect(() => {
    query('products', { 
      select: '*',
      filter: { column: 'category', operator: 'eq', value: 'gifts' }
    });
  }, []);
  
  const handleCreate = async (productData) => {
    const newProduct = await insert('products', [productData]);
    console.log('Producto creado:', newProduct);
  };
  
  return (
    <div>
      {loading ? <p>Cargando...</p> : (
        <ul>
          {products?.map(p => <li key={p.id}>{p.name}</li>)}
        </ul>
      )}
    </div>
  );
}
```

---

## 🔐 Seguridad - Row Level Security (RLS)

Las políticas RLS ya están configuradas:

- **Usuarios**: Solo pueden ver su propio perfil (o admins ver todo)
- **Asesores**: Solo asesores verificados son públicos
- **Planes, Productos**: Todos pueden ver
- **Blog**: Solo posts publicados son visibles
- **Comunidad**: Posts y comentarios son públicos

Para agregar más políticas, usa:
```sql
CREATE POLICY "policy_name" 
ON table_name FOR SELECT 
USING (your_condition);
```

---

## 📝 Migración de Datos Existentes

Si tienes datos en `data/blogData.js` o `data/plansData.js`:

```jsx
import { blogData } from '@/data/blogData';
import { blogService } from '@/services/supabaseServices';

// Migrar datos
async function migrateBlogData() {
  for (const post of blogData) {
    await blogService.create({
      title: post.title,
      content: post.content,
      author_id: 'uuid-del-autor',
      // ... otros campos
    });
  }
}
```

---

## 🔗 Estructura del Proyecto Supabase

```
src/
├── lib/
│   └── supabaseClient.js        ← Cliente Supabase configurado
├── services/
│   └── supabaseServices.js      ← Servicios CRUD para cada tabla
├── hooks/
│   └── useSupabase.js           ← Hooks de React para consultas
├── contexts/
│   └── SupabaseContext.js       ← (Opcional) Context para autenticación
└── pages/
    ├── Dashboard.jsx
    ├── Marketplace.jsx
    ├── Blog.jsx
    ├── Community.jsx
    └── ...
```

---

## 🛠️ Próximos Pasos

1. ✅ Ejecutar el schema SQL en Supabase
2. ✅ Migrar datos existentes (si aplica)
3. ✅ Implementar autenticación con Auth de Supabase
4. ✅ Conectar componentes con los servicios
5. ✅ Configurar Storage para imágenes
6. ✅ Implementar webhooks para notificaciones

---

## 📚 Recursos

- [Documentación Supabase](https://supabase.com/docs)
- [Cliente Supabase JS](https://supabase.com/docs/reference/javascript/getting-started)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Realtime Database](https://supabase.com/docs/guides/realtime)
