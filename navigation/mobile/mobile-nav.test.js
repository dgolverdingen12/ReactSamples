import React from 'react'
import { shallow } from 'enzyme'
import Mobile from './index'

describe('The mobile nav should have the correct elements', () => {
  const links = {
    subNavigations:
    {
      'about': {
        'link': 'about',
        'subLinks': [
          { 'text': 'About FTSF', 'href': 'ftsf' },
          { 'text': 'Board', 'href': 'board' },
          { 'text': 'History', 'href': 'history' },
          { 'text': 'Future', 'href': 'future' },
          { 'text': 'Partners & Members', 'href': 'partners-members' },
          { 'text': 'Sustainable Development Goals', 'href': 'goals', 'notNested': true }
        ]
      },
      'cases': {
        'link': 'cases',
        'subLinks': null
      },
      'publications': {
        'link': 'publications',
        'subLinks': [
          { 'text': 'Updates', 'href': 'update' },
          { 'text': 'Research & Papers', 'href': 'research' },
          { 'text': 'Press Centre', 'href': 'press-centre' }
        ]
      },
      'events': {
        'link': 'events',
        'subLinks': null
      },
      'shop': {
        'link': 'shop',
        'subLinks': null
      },
      'contact': {
        'link': 'contact',
        'subLinks': null
      }
    }
  }
  const store = {
    pages: { subNavigations: links.subNavigations },
    ui: { mobileNav: true }
  }
  const wrapperMobile = shallow(<Mobile.wrappedComponent store={store} />)

  it('should be defined', () => {
    expect(wrapperMobile).toBeDefined()
  })

  it('should have a div', () => {
    expect(wrapperMobile.find('div').exists()).toBe(true)
  })

  it('should have a ul', () => {
    expect(wrapperMobile.find('ul').exists()).toBe(true)
  })

  it('should have a li', () => {
    expect(wrapperMobile.find('li').exists()).toBe(true)
  })
})
