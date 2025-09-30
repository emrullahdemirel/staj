'use client'

import { useState, useEffect } from 'react'
import { Project } from '@/types'
import { projectsService } from '@/lib/supabase'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const categories = ['all', 'Rönesans', 'Barok', 'Empresyonizm', 'Osmanlı', 'Bizans', 'Çağdaş']

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      const data = await projectsService.getProjects()
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProjects = projects.filter(project =>
    filter === 'all' || project.category === filter
  )

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'auto'
  }

  if (loading) {
    return (
      <section id="projects" className="section-padding">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
              Projelerim
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 shimmer" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-3 shimmer" />
                  <div className="h-3 bg-gray-200 rounded mb-2 shimmer" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 shimmer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="section-padding">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Projelerim
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sanat tarihi alanında gerçekleştirdiğim araştırma projeleri ve incelemeler.
            Her proje, sanatın ve tarihin derinliklerinde yapılan bir keşif yolculuğudur.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                filter === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category === 'all' ? 'Tümü' : category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => openProjectModal(project)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {project.featured && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Öne Çıkan
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <span className="text-sm text-gray-500">{project.period}</span>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-gray-500 text-xs">+{project.tags.length - 3}</span>
                  )}
                </div>

                {/* Read More Button */}
                <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700">
                  <span>Detayları İncele</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bu kategoride proje bulunamadı
            </h3>
            <p className="text-gray-600">
              Farklı bir kategori seçerek diğer projeleri inceleyebilirsiniz.
            </p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-serif font-bold text-gray-900">
                    {selectedProject.title}
                  </h2>
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedProject.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  <span>📅 {selectedProject.period}</span>
                  <span>🏷️ {selectedProject.tags.length} etiket</span>
                  <span>📝 {new Date(selectedProject.createdAt).toLocaleDateString('tr-TR')}</span>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Extended Description */}
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Proje Detayları</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Bu proje kapsamında {selectedProject.category.toLowerCase()} döneminin önemli eserlerini
                    inceleyerek, sanatçıların tekniklerini ve dönemin kültürel atmosferini analiz ettim.
                    Araştırma sürecinde birincil kaynakları kullanarak, eserlerin tarihsel bağlamını
                    ve sanat tarihindeki yerini belirledim.
                  </p>
                </div>

                {/* Tags */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Etiketler</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button className="btn-primary">
                    Tam Makaleyi Oku
                  </button>
                  <button className="btn-secondary">
                    PDF İndir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}