import supabase from '../lib/supabaseClient';

// USUARIOS
export const usersService = {
  async getAll() {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(userData) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, userData) {
    const { data, error } = await supabase
      .from('users')
      .update(userData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async delete(id) {
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) throw error;
  },
};

// ASESORES
export const advisorsService = {
  async getAll() {
    const { data, error } = await supabase.from('advisors').select('*');
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('advisors')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(advisorData) {
    const { data, error } = await supabase
      .from('advisors')
      .insert([advisorData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, advisorData) {
    const { data, error } = await supabase
      .from('advisors')
      .update(advisorData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async delete(id) {
    const { error } = await supabase.from('advisors').delete().eq('id', id);
    if (error) throw error;
  },

  async getBySpecialty(specialty) {
    const { data, error } = await supabase
      .from('advisors')
      .select('*')
      .eq('specialty', specialty);
    if (error) throw error;
    return data;
  },
};

// PLANES
export const plansService = {
  async getAll() {
    const { data, error } = await supabase.from('plans').select('*');
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('plans')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(planData) {
    const { data, error } = await supabase
      .from('plans')
      .insert([planData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, planData) {
    const { data, error } = await supabase
      .from('plans')
      .update(planData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async delete(id) {
    const { error } = await supabase.from('plans').delete().eq('id', id);
    if (error) throw error;
  },
};

// PRODUCTOS/ITEMS DEL MARKETPLACE
export const productsService = {
  async getAll() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(productData) {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, productData) {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async delete(id) {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  },

  async getByCategory(category) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category);
    if (error) throw error;
    return data;
  },
};

// BLOG
export const blogService = {
  async getAll() {
    const { data, error } = await supabase.from('blog_posts').select('*');
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(postData) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, postData) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(postData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async delete(id) {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) throw error;
  },

  async getByAuthor(authorId) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('author_id', authorId);
    if (error) throw error;
    return data;
  },
};

// COMUNIDAD (POSTS/COMENTARIOS)
export const communityService = {
  async getPosts() {
    const { data, error } = await supabase
      .from('community_posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getPostById(id) {
    const { data, error } = await supabase
      .from('community_posts')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async createPost(postData) {
    const { data, error } = await supabase
      .from('community_posts')
      .insert([postData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async updatePost(id, postData) {
    const { data, error } = await supabase
      .from('community_posts')
      .update(postData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async deletePost(id) {
    const { error } = await supabase
      .from('community_posts')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async getComments(postId) {
    const { data, error } = await supabase
      .from('community_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    if (error) throw error;
    return data;
  },

  async createComment(commentData) {
    const { data, error } = await supabase
      .from('community_comments')
      .insert([commentData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async deleteComment(id) {
    const { error } = await supabase
      .from('community_comments')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },
};

// ORDENES/COMPRAS
export const ordersService = {
  async getAll() {
    const { data, error } = await supabase.from('orders').select('*');
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert([orderData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id, orderData) {
    const { data, error } = await supabase
      .from('orders')
      .update(orderData)
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async getByUserId(userId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  },
};

// CONTACTO
export const contactService = {
  async create(contactData) {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([contactData])
      .select();
    if (error) throw error;
    return data[0];
  },

  async getAll() {
    const { data, error } = await supabase.from('contact_messages').select('*');
    if (error) throw error;
    return data;
  },

  async markAsRead(id) {
    const { data, error } = await supabase
      .from('contact_messages')
      .update({ read: true })
      .eq('id', id)
      .select();
    if (error) throw error;
    return data[0];
  },
};
