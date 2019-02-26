import LoginPopup from './index'
import React from 'react'
import { mount } from 'enzyme'

describe('The popup should have the correct elements', () => {
  const ui = {
    loginPopupStatus: false,
    toggleLoginPopup: () => {
      ui.loginPopupStatus = !ui.loginPopupStatus
    },
    hideMobileNav: () => {},
    popupShow: () => {},
    hidePopup: () => {}
  }
  const user = { isLoggedIn: false }
  const wrapper = mount(<LoginPopup.wrappedComponent store={{ ui, user }} />)

  it('test', () => {
    expect(wrapper.find('div').exists()).toBe(true)
  })

  it('Should toggle the login pop-up', () => {
    user.isLoggedIn = true
    const wrapper = mount(<LoginPopup.wrappedComponent store={{ ui, user }} />)
    expect(wrapper.find('.popupLink').exists()).toBe(true)
  })

  it('Should change a value in the store', () => {
    user.isLoggedIn = true
    const wrapper = mount(<LoginPopup.wrappedComponent store={{ ui, user }} />)
    const icon = wrapper.find('Icon')
    icon.simulate('click')
    expect(ui.loginPopupStatus).toBe(true)
  })
})
