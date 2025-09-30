import { createClient } from '@supabase/supabase-js'
import { SupabaseProject, Project } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Projects CRUD operations
export const projectsService = {
  // Fetch all projects
  async getProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      return data?.map(transformSupabaseProject) || []
    } catch (error) {
      console.error('Error fetching projects:', error)
      return getDemoProjects()
    }
  },

  // Fetch featured projects
  async getFeaturedProjects(): Promise<Project[]> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6)

      if (error) throw error

      return data?.map(transformSupabaseProject) || []
    } catch (error) {
      console.error('Error fetching featured projects:', error)
      return getDemoProjects().slice(0, 6)
    }
  },

  // Fetch project by slug
  async getProjectBySlug(slug: string): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error) throw error

      return data ? transformSupabaseProject(data) : null
    } catch (error) {
      console.error('Error fetching project:', error)
      return getDemoProjects().find(p => p.slug === slug) || null
    }
  },

  // Create new project
  async createProject(project: Omit<SupabaseProject, 'id' | 'created_at' | 'updated_at'>): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single()

      if (error) throw error

      return data ? transformSupabaseProject(data) : null
    } catch (error) {
      console.error('Error creating project:', error)
      return null
    }
  },

  // Update project
  async updateProject(id: string, updates: Partial<SupabaseProject>): Promise<Project | null> {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return data ? transformSupabaseProject(data) : null
    } catch (error) {
      console.error('Error updating project:', error)
      return null
    }
  },

  // Delete project
  async deleteProject(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error

      return true
    } catch (error) {
      console.error('Error deleting project:', error)
      return false
    }
  }
}

// Transform Supabase project to local Project type
function transformSupabaseProject(supabaseProject: SupabaseProject): Project {
  return {
    id: supabaseProject.id,
    title: supabaseProject.title,
    description: supabaseProject.description,
    category: supabaseProject.category,
    period: supabaseProject.period,
    imageUrl: supabaseProject.image_url,
    slug: supabaseProject.slug,
    tags: supabaseProject.tags || [],
    featured: supabaseProject.featured,
    createdAt: supabaseProject.created_at,
    updatedAt: supabaseProject.updated_at
  }
}

// Demo data for when Supabase is not available
function getDemoProjects(): Project[] {
  return [
    {
      id: '1',
      title: 'Rönesans Dönemi Sanat Analizi',
      description: 'İtalyan Rönesansı döneminde ortaya çıkan sanat eserlerinin detaylı analizi ve yorumları.',
      category: 'Rönesans',
      period: '15-16. Yüzyıl',
      imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop',
      slug: 'ronesans-donemi-sanat-analizi',
      tags: ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Floransa'],
      featured: true,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      title: 'Barok Sanatında Işık ve Gölge',
      description: 'Barok dönem resimlerinde kullanılan chiaroscuro tekniğinin incelenmesi.',
      category: 'Barok',
      period: '17. Yüzyıl',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      slug: 'barok-sanatinda-isik-ve-golge',
      tags: ['Caravaggio', 'Rembrandt', 'Chiaroscuro', 'Barok'],
      featured: true,
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-10T10:00:00Z'
    },
    {
      id: '3',
      title: 'Empresyonizm ve Modern Sanat',
      description: 'Empresyonist hareketin modern sanata etkileri ve dönüşümü.',
      category: 'Empresyonizm',
      period: '19. Yüzyıl',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      slug: 'empresyonizm-ve-modern-sanat',
      tags: ['Monet', 'Renoir', 'Empresyonizm', 'Modern Sanat'],
      featured: true,
      createdAt: '2024-01-05T10:00:00Z',
      updatedAt: '2024-01-05T10:00:00Z'
    },
    {
      id: '4',
      title: 'Osmanlı Saray Sanatları',
      description: 'Osmanlı İmparatorluğu döneminde saray çevresinde gelişen sanat dalları.',
      category: 'Osmanlı',
      period: '14-20. Yüzyıl',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      slug: 'osmanli-saray-sanatlari',
      tags: ['Tezhip', 'Hat Sanatı', 'Minyatür', 'Osmanlı'],
      featured: false,
      createdAt: '2024-01-01T10:00:00Z',
      updatedAt: '2024-01-01T10:00:00Z'
    },
    {
      id: '5',
      title: 'Bizans Mozaik Sanatı',
      description: 'Bizans İmparatorluğu döneminde gelişen mozaik sanatının analizi.',
      category: 'Bizans',
      period: '4-15. Yüzyıl',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      slug: 'bizans-mozaik-sanati',
      tags: ['Mozaik', 'Bizans', 'Ayasofya', 'İkonografi'],
      featured: false,
      createdAt: '2023-12-25T10:00:00Z',
      updatedAt: '2023-12-25T10:00:00Z'
    },
    {
      id: '6',
      title: 'Çağdaş Türk Sanatı',
      description: 'Cumhuriyet dönemi Türk sanatçıları ve eserleri üzerine araştırmalar.',
      category: 'Çağdaş',
      period: '20-21. Yüzyıl',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      slug: 'cagdas-turk-sanati',
      tags: ['Osman Hamdi Bey', 'Fikret Mualla', 'Çağdaş Sanat', 'Türk Sanatı'],
      featured: true,
      createdAt: '2023-12-20T10:00:00Z',
      updatedAt: '2023-12-20T10:00:00Z'
    }
  ]
}