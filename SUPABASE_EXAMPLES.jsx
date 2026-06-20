/**
 * EJEMPLO DE INTEGRACIÓN CON SUPABASE
 * 
 * Este archivo muestra cómo usar los servicios de Supabase
 * en tus componentes de React.
 */

// ===== EJEMPLO 1: Usar servicios directamente =====
import { useEffect, useState } from 'react';
import { advisorsService } from '@/services/supabaseServices';

export function AdvisorsListExample() {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdvisors = async () => {
      try {
        setLoading(true);
        const data = await advisorsService.getAll();
        setAdvisors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdvisors();
  }, []);

  if (loading) return <div>Cargando asesores...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Asesores Disponibles</h2>
      <ul>
        {advisors.map((advisor) => (
          <li key={advisor.id}>
            <h3>{advisor.specialty}</h3>
            <p>Rating: {advisor.rating}/5</p>
            <p>${advisor.hourly_rate}/hora</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ===== EJEMPLO 2: Usar hooks de Supabase =====
import { useSupabaseQuery, useSupabaseMutation } from '@/hooks/useSupabase';

export function ProductsExample() {
  const { data: products, loading, query } = useSupabaseQuery();
  const { insert, loading: inserting, error: mutationError } = useSupabaseMutation();

  useEffect(() => {
    // Obtener productos con filtro
    query('products', {
      select: '*',
      filter: {
        column: 'category',
        operator: 'eq',
        value: 'wellness'
      },
      order: {
        column: 'created_at',
        ascending: false
      },
      limit: 10
    });
  }, []);

  const handleCreateProduct = async (productData) => {
    try {
      const newProduct = await insert('products', [productData]);
      console.log('Producto creado:', newProduct);
      // Recargar productos
      query('products', { select: '*' });
    } catch (err) {
      console.error('Error creando producto:', err);
    }
  };

  return (
    <div>
      <h2>Productos del Wellness</h2>
      {loading && <p>Cargando...</p>}
      {mutationError && <p style={{ color: 'red' }}>{mutationError}</p>}
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p>{product.category}</p>
          </li>
        ))}
      </ul>
      
      <button onClick={() => handleCreateProduct({
        name: 'Nuevo Producto',
        description: 'Un nuevo producto',
        category: 'wellness',
        price: 29.99,
        stock: 10
      })}>
        {inserting ? 'Creando...' : 'Crear Producto'}
      </button>
    </div>
  );
}

// ===== EJEMPLO 3: Usar autenticación =====
import { useSupabaseAuth } from '@/hooks/useSupabase';

export function AuthExample() {
  const { user, loading, signUp, signIn, signOut } = useSupabaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      alert('¡Registro exitoso! Verifica tu email.');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      alert('¡Inicio de sesión exitoso!');
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  if (user) {
    return (
      <div>
        <p>Bienvenido, {user.email}</p>
        <button onClick={signOut}>{loading ? 'Cerrando...' : 'Cerrar sesión'}</button>
      </div>
    );
  }

  return (
    <form>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button onClick={handleSignUp} disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
}

// ===== EJEMPLO 4: Blog con Supabase =====
import { blogService } from '@/services/supabaseServices';

export function BlogPostsExample() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogService.getAll();
        // Filtrar solo posts publicados
        const published = data.filter(post => post.published);
        setPosts(published);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Blog</h2>
      {loading ? <p>Cargando posts...</p> : (
        <div>
          {posts.map((post) => (
            <article key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <p>Vistas: {post.view_count}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== EJEMPLO 5: Comunidad con comentarios =====
import { communityService } from '@/services/supabaseServices';

export function CommunityPostsExample() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await communityService.getPosts();
        setPosts(data);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleAddComment = async (postId, content) => {
    try {
      await communityService.createComment({
        post_id: postId,
        author_id: 'uuid-del-usuario-actual', // Obtener del contexto de autenticación
        content: content
      });
      // Recargar posts
      const data = await communityService.getPosts();
      setPosts(data);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div>
      <h2>Comunidad</h2>
      {loading ? <p>Cargando...</p> : (
        <div>
          {posts.map((post) => (
            <div key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>Me gusta: {post.likes}</p>
              <button onClick={() => handleAddComment(post.id, 'Nuevo comentario')}>
                Comentar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default {
  AdvisorsListExample,
  ProductsExample,
  AuthExample,
  BlogPostsExample,
  CommunityPostsExample,
};
