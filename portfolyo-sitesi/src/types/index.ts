export interface Project {
  id: string
  title: string
  description: string
  category: string
  period: string
  imageUrl: string
  slug: string
  tags: string[]
  featured: boolean
  createdAt: string
  updatedAt: string
}

export interface ProjectDetail extends Project {
  content: string
  images: string[]
  relatedProjects: string[]
}

export interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface SupabaseProject {
  id: string
  title: string
  description: string
  category: string
  period: string
  image_url: string
  slug: string
  tags: string[]
  featured: boolean
  content?: string
  images?: string[]
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  data: T
  error?: string
  success: boolean
}

export type ThemeMode = 'light' | 'dark' | 'system'

export interface UserPreferences {
  theme: ThemeMode
  language: 'tr' | 'en'
}