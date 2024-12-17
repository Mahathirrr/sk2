{`import { createServerSupabaseClient } from '@/lib/supabase/server';
import { CourseWithInstructor, CourseDetails } from './types';

export async function getCourses(): Promise<CourseWithInstructor[]> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('courses')
    .select(\`
      *,
      instructor:users!courses_instructor_id_fkey (
        id,
        full_name,
        avatar_url
      )
    \`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as CourseWithInstructor[];
}

export async function getCourseById(id: string): Promise<CourseDetails | null> {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from('courses')
    .select(\`
      *,
      instructor:users!courses_instructor_id_fkey (
        id,
        full_name,
        avatar_url
      ),
      lessons (*)
    \`)
    .eq('id', id)
    .single();

  if (error) return null;
  return data as CourseDetails;
}`}