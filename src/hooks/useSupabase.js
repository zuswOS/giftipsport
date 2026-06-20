import { useState, useCallback } from 'react';
import supabase from '../lib/supabaseClient';

export const useSupabaseQuery = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = useCallback(async (table, options = {}) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from(table).select(options.select || '*');

      if (options.filter) {
        const { column, operator, value } = options.filter;
        query = query[operator](column, value);
      }

      if (options.order) {
        const { column, ascending = false } = options.order;
        query = query.order(column, { ascending });
      }

      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data: result, error: err } = await query;
      if (err) throw err;
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Query error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, query };
};

export const useSupabaseMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const insert = useCallback(async (table, records) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from(table)
        .insert(records)
        .select();
      if (err) throw err;
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Insert error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(async (table, records, filter) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from(table).update(records);
      if (filter) {
        const { column, operator, value } = filter;
        query = query[operator](column, value);
      }
      const { data, error: err } = await query.select();
      if (err) throw err;
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const delete_ = useCallback(async (table, filter) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from(table).delete();
      if (filter) {
        const { column, operator, value } = filter;
        query = query[operator](column, value);
      }
      const { error: err } = await query;
      if (err) throw err;
    } catch (err) {
      setError(err.message);
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, insert, update, delete: delete_ };
};

export const useSupabaseAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
      });
      if (err) throw err;
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Sign up error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (err) throw err;
      setUser(data.user);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Sign in error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { error: err } = await supabase.auth.signOut();
      if (err) throw err;
      setUser(null);
    } catch (err) {
      setError(err.message);
      console.error('Sign out error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, signUp, signIn, signOut };
};
