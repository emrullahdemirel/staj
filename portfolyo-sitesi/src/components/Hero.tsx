'use client'

import React, { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToProjects = () => {
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToAbout = () => {
    const element = document.getElementById('about')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return React.createElement(
    'section',
    {
      id: 'hero',
      className: 'relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600'
    },
    // Background Pattern
    React.createElement(
      'div',
      { className: 'absolute inset-0 opacity-10' },
      React.createElement('div', {
        className: "absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
      })
    ),
    // Floating Elements
    React.createElement(
      'div',
      { className: 'absolute inset-0 overflow-hidden pointer-events-none' },
      React.createElement('div', { className: 'absolute top-1/4 left-1/4 w-20 h-20 bg-white/10 rounded-full animate-float' }),
      React.createElement('div', { className: 'absolute top-1/3 right-1/4 w-32 h-32 bg-white/5 rounded-full animate-float animation-delay-200' }),
      React.createElement('div', { className: 'absolute bottom-1/4 left-1/3 w-16 h-16 bg-white/10 rounded-full animate-float animation-delay-400' }),
      React.createElement('div', { className: 'absolute bottom-1/3 right-1/3 w-24 h-24 bg-white/5 rounded-full animate-float animation-delay-600' })
    ),
    // Main Content
    React.createElement(
      'div',
      { className: 'relative z-10 text-center text-white px-4 max-w-5xl mx-auto' },
      React.createElement(
        'div',
        { className: `transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}` },
        // Main Title
        React.createElement(
          'h1',
          { className: 'text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight' },
          React.createElement('span', { className: 'block' }, 'Sanat Tarihi'),
          React.createElement(
            'span',
            { className: 'block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent' },
            'Portfolyo'
          )
        ),
        // Subtitle
        React.createElement(
          'p',
          { className: 'text-xl md:text-2xl mb-8 text-white/90 font-light max-w-3xl mx-auto leading-relaxed' },
          'Sanat tarihinin derinliklerinde yolculuk. Çağlar boyunca yaratılan eserlerin hikayelerini keşfedin.'
        ),
        // Author Info
        React.createElement(
          'div',
          { className: 'mb-12' },
          React.createElement(
            'div',
            { className: 'inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20' },
            React.createElement(
              'div',
              { className: 'w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-3' },
              React.createElement('span', { className: 'text-white font-bold text-lg' }, 'E')
            ),
            React.createElement(
              'div',
              { className: 'text-left' },
              React.createElement('p', { className: 'font-semibold' }, 'Emrullah Demirel'),
              React.createElement('p', { className: 'text-sm text-white/80' }, 'Sanat Tarihçisi & Araştırmacı')
            )
          )
        ),
        // CTA Buttons
        React.createElement(
          'div',
          { className: 'flex flex-col sm:flex-row gap-4 justify-center items-center' },
          React.createElement(
            'button',
            {
              onClick: scrollToProjects,
              className: 'bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg'
            },
            'Projeleri İncele'
          ),
          React.createElement(
            'button',
            {
              onClick: scrollToAbout,
              className: 'border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all duration-200 transform hover:scale-105'
            },
            'Hakkımda'
          )
        ),
        // Stats
        React.createElement(
          'div',
          { className: 'mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto' },
          React.createElement(
            'div',
            { className: 'text-center' },
            React.createElement('div', { className: 'text-3xl font-bold mb-2' }, '15+'),
            React.createElement('div', { className: 'text-sm text-white/80' }, 'Araştırma Projesi')
          ),
          React.createElement(
            'div',
            { className: 'text-center' },
            React.createElement('div', { className: 'text-3xl font-bold mb-2' }, '8'),
            React.createElement('div', { className: 'text-sm text-white/80' }, 'Sanat Dönemi')
          ),
          React.createElement(
            'div',
            { className: 'text-center' },
            React.createElement('div', { className: 'text-3xl font-bold mb-2' }, '500+'),
            React.createElement('div', { className: 'text-sm text-white/80' }, 'İncelenen Eser')
          ),
          React.createElement(
            'div',
            { className: 'text-center' },
            React.createElement('div', { className: 'text-3xl font-bold mb-2' }, '3'),
            React.createElement('div', { className: 'text-sm text-white/80' }, 'Yıl Deneyim')
          )
        )
      ),
      // Scroll Indicator
      React.createElement(
        'div',
        {
          className: `absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-500 ${
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`
        },
        React.createElement(
          'div',
          { className: 'flex flex-col items-center animate-bounce' },
          React.createElement('span', { className: 'text-sm text-white/80 mb-2' }, 'Aşağı Kaydır'),
          React.createElement(
            'svg',
            {
              className: 'w-6 h-6 text-white',
              fill: 'none',
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              strokeWidth: '2',
              viewBox: '0 0 24 24',
              stroke: 'currentColor'
            },
            React.createElement('path', { d: 'M19 14l-7 7m0 0l-7-7m7 7V3' })
          )
        )
      )
    )
  )
}