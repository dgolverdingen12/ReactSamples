import React from 'react'
import { shallow, mount } from 'enzyme'
import NavItem from './index'

describe('The mobile nav should have the correct elements', () => {
  const ui = {
    toggleSubLinks: jest.fn(() => {

    }),
    toggleSubLink: []
  }
  ui.toggleSubLink.name = false
  const wrapperMobile = shallow(<NavItem.wrappedComponent store={{ ui }} />)

  it('should be defined', () => {
    expect(wrapperMobile).toBeDefined()
  })

  it('should have a div', () => {
    expect(wrapperMobile.find('div').exists()).toBe(true)
  })

  it('should not have a div with class line', () => {
    const wrapperMobile = mount(<NavItem.wrappedComponent store={{ ui }}  />)
    expect(wrapperMobile.find('line').exists()).toBe(false)
  })

  it('should check if a squiggly is needed', () => {
    const wrapperMobile = mount(<NavItem.wrappedComponent name='name' store={{ ui }} isLast={false} subNavLinks={[]} />)
    expect(wrapperMobile.instance().shouldHaveSquiggly()).toBe(true)
  })
})
