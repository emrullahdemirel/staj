'use client'

import { useState } from 'react'

export default function About() {
  const [activeTab, setActiveTab] = useState('education')

  const tabs = [
    { id: 'education', label: 'Eğitim', icon: '🎓' },
    { id: 'experience', label: 'Deneyim', icon: '💼' },
    { id: 'skills', label: 'Beceriler', icon: '🎨' },
    { id: 'interests', label: 'İlgi Alanları', icon: '✨' },
  ]

  const content = {
    education: [
      {
        title: 'Sanat Tarihi Lisans',
        institution: 'Ege Üniversitesi',
        period: '2020-2024',
        description: 'Sanat tarihi alanında kapsamlı eğitim aldım. Antik çağlardan günümüze kadar olan sanat dönemlerini inceledim.'
      },
      {
        title: 'Müze Müdürlüğü Sertifikası',
        institution: 'Kültür ve Turizm Bakanlığı',
        period: '2023',
        description: 'Müze yönetimi ve sergileme teknikleri konularında uzmanlaştım.'
      }
    ],
    experience: [
      {
        title: 'Stajyer Araştırmacı',
        institution: 'İzmir Arkeoloji Müzesi',
        period: '2023 Yaz',
        description: 'Antik dönem eserlerin kataloglanması ve araştırılması projelerinde yer aldım.'
      },
      {
        title: 'Freelance Sanat Yazarı',
        institution: 'Çeşitli Sanat Dergileri',
        period: '2022-Devam',
        description: 'Sanat tarihi ve çağdaş sanat üzerine makaleler yazıyorum.'
      }
    ],
    skills: [
      { name: 'Sanat Tarihi Araştırması', level: 95 },
      { name: 'Akademik Yazım', level: 90 },
      { name: 'Görsel Analiz', level: 88 },
      { name: 'Müze Çalışmaları', level: 85 },
      { name: 'Arşiv Araştırması', level: 82 },
      { name: 'Sergi Küratörlüğü', level: 78 }
    ],
    interests: [
      'Rönesans Dönemi Sanatı',
      'Osmanlı Saray Sanatları',
      'Modern ve Çağdaş Türk Sanatı',
      'Bizans Mozaik Sanatı',
      'Sanat Restorasyon Teknikleri',
      'Dijital Sanat Arşivleri'
    ]
  }

  return (
    <section id="about" className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Hakkımda
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sanat tarihine olan tutkum, beni bu güzel alanda araştırmalar yapmaya ve
            keşifler yapmaya yönlendirdi. Her eser bir hikaye anlatır, ben de bu hikayeleri sizlerle paylaşıyorum.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Personal Info */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mr-6">
                  <span className="text-2xl text-white font-bold">E</span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">Emrullah Demirel</h3>
                  <p className="text-primary-600 font-medium">Sanat Tarihçisi & Araştırmacı</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                Sanat tarihi alanında uzmanlaşan genç bir araştırmacıyım. Antik çağlardan günümüze
                kadar olan sanat eserlerini inceleyerek, onların kültürel ve tarihsel bağlamlarını
                keşfetmeye odaklanıyorum. Özellikle Türk-İslam sanatları ve Rönesans dönemi üzerine
                yoğunlaşmış araştırmalar yapıyorum.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Konum:</span>
                  <p className="font-medium">İzmir, Türkiye</p>
                </div>
                <div>
                  <span className="text-gray-500">Dil:</span>
                  <p className="font-medium">Türkçe, İngilizce</p>
                </div>
                <div>
                  <span className="text-gray-500">Uzmanlık:</span>
                  <p className="font-medium">Sanat Tarihi</p>
                </div>
                <div>
                  <span className="text-gray-500">Durum:</span>
                  <p className="font-medium text-green-600">Proje İçin Müsait</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 text-white text-center">
                <div className="text-3xl font-bold mb-2">15+</div>
                <div className="text-sm opacity-90">Tamamlanan Proje</div>
              </div>
              <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-xl p-6 text-white text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-90">İncelenen Eser</div>
              </div>
            </div>
          </div>

          {/* Tabbed Content */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-4 px-2 text-center font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg mr-2">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {activeTab === 'education' && (
                <div className="space-y-6">
                  {content.education.map((item, index) => (
                    <div key={index} className="border-l-4 border-primary-600 pl-6">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-primary-600 font-medium mb-2">{item.institution} • {item.period}</p>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'experience' && (
                <div className="space-y-6">
                  {content.experience.map((item, index) => (
                    <div key={index} className="border-l-4 border-secondary-600 pl-6">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-secondary-600 font-medium mb-2">{item.institution} • {item.period}</p>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-4">
                  {content.skills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className="text-sm text-gray-600">{skill.level}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'interests' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {content.interests.map((interest, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 rounded-lg p-3 text-center text-gray-700 font-medium"
                    >
                      {interest}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}