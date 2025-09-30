'use client'

import { useState } from 'react'
import { ContactForm } from '@/types'

export default function Contact() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Form submitted:', formData)
      setSubmitStatus('success')

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const contactInfo = [
    {
      icon: '📧',
      title: 'E-posta',
      value: 'emrullah@example.com',
      href: 'mailto:emrullah@example.com'
    },
    {
      icon: '📱',
      title: 'Telefon',
      value: '+90 (555) 123-4567',
      href: 'tel:+905551234567'
    },
    {
      icon: '📍',
      title: 'Konum',
      value: 'İzmir, Türkiye',
      href: '#'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'linkedin.com/in/emrullah',
      href: 'https://linkedin.com/in/emrullah'
    }
  ]

  const socialLinks = [
    {
      name: 'Academia',
      icon: '🎓',
      href: 'https://independent.academia.edu/EmrullahDemirel',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'ResearchGate',
      icon: '🔬',
      href: 'https://www.researchgate.net/profile/Emrullah-Demirel',
      color: 'bg-teal-600 hover:bg-teal-700'
    },
    {
      name: 'ORCID',
      icon: '📝',
      href: 'https://orcid.org/0000-0000-0000-0000',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      href: 'https://twitter.com/emrullah',
      color: 'bg-sky-600 hover:bg-sky-700'
    }
  ]

  return (
    <section id="contact" className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            İletişim
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sanat tarihi projeleriniz için işbirliği yapmak, araştırmalarım hakkında bilgi almak
            veya sadece sohbet etmek için bana ulaşabilirsiniz.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                İletişim Bilgileri
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors duration-200 group"
                  >
                    <div className="text-2xl mr-4 group-hover:scale-110 transition-transform duration-200">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{item.title}</p>
                      <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Academic Networks */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                Akademik Ağlar
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center p-4 rounded-xl text-white font-medium transition-all duration-200 transform hover:scale-105 ${link.color}`}
                  >
                    <span className="text-xl mr-2">{link.icon}</span>
                    <span className="text-sm">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-serif font-bold mb-4">
                🚀 Proje İçin Müsait
              </h3>
              <p className="text-primary-100 mb-4">
                Sanat tarihi araştırmaları, müze projeleri ve akademik işbirlikleri için
                yeni projeler arıyorum.
              </p>
              <div className="flex items-center text-sm text-primary-200">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                Genellikle 24 saat içinde yanıtlıyorum
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">
              Mesaj Gönder
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                    placeholder="E-posta adresiniz"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Konu
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Mesajınızın konusu"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mesaj
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 transform ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Gönderiliyor...
                  </div>
                ) : (
                  'Mesajı Gönder'
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Mesajınız başarıyla gönderildi! En kısa sürede yanıtlayacağım.
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}