import React, { Component } from 'react'
import styles from './main.scss'
import Logo from '../../../components/logo/logo'
import Icon from '../../../components/icon/icon'
// import LoginPopup from '../desktop/login-pop-up'
import Hamburger from '../../../components/hamburger'
import { observer, inject } from 'mobx-react'
import mobileService from '../mobile/mobile-service'

// There are a lot of comments in this document but this is for later use //
@inject('store') @observer
class DesktopNavigation extends Component {
  constructor (props) {
    super(props)
    this.LoginPopup = React.createRef()
    this.state = {
      currentLocation: '',
      mobileNav: false,
      hamburgerActive: ''
    }
    mobileService.setReceive = this.receiveFromService
  }

  receiveFromService = data => {
    if (this.hasOwnProperty(data.name)) {
      this[data.name](data)
    }
  }

  calculateSubNavLinks = data => {
    const result = data.mobileSubNavStatus ? 58 * data.mobileSubNavLength : 0
    this.setState({ mobileSubNavLength: result })
  }

  userIconClick = () => {
    const { ui } = this.props.store
    ui.toggleLoginPopup()
    if (ui.loginPopupStatus) {
      ui.hideMobileNav()
    }
    this.burgerClose()
  }

  componentDidMount = () => {
    let location = window.location.pathname.split('/')
    location.shift()
    this.setState({ currentPage: `/${location[0]}`, screenWidth: window.innerWidth })

    window.addEventListener('resize', () => this.setState({ screenWidth: window.innerWidth }))
  }

  burgerClose = () => {
    this.setState({
      hamburgerActive: ''
    })
  }

  burgerClick = () => {
    const { ui } = this.props.store
    this.setState({
      hamburgerActive: !this.state.hamburgerActive
    })
    ui.toggleMobileNav()
    if (ui.mobileNav) {
      ui.hidePopup()
    }
  }

  render () {
    let items = [
      { 'text': 'About', 'href': '/about' },
      { 'text': 'Cases', 'href': '/cases' },
      { 'text': 'Publications', 'href': '/publications' }
      // { 'text': 'Events', 'href': '/events' },
      // { 'text': 'Shop', 'href': '/shop', 'icon': 'faShoppingBag' }
    ]

    // const { user, ui } = this.props.store
    const { scrollClass, hamburgerActive } = this.state

    return (
      <div className={[styles.wrapperContainer, scrollClass].join(' ')}>
        <div className={styles.containerLeft}>
          <Hamburger active={hamburgerActive} onClick={this.burgerClick} className={styles.hamburger} />
          <Logo />
          <ul className={styles.menuNav}>
            {
              items.map((item, i) => {
                const navLinkClass = this.state.currentPage === item.href ? `${styles.menuItem} ${styles.menuItemActive}` : styles.menuItem
                return (
                  <li key={i} className={styles.menuList}>
                    <a className={navLinkClass} href={item.href}>
                      {item.text}
                      {item.icon && <Icon className={styles.icon + ' ' + styles.inlineIcon} iconName={item.icon} />}
                    </a>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className={styles.containerRight}>
          {/* <Icon className={styles.icon + ' ' + styles.iconInvisible} iconName='faSearch' /> */}
          <div className={styles.line} />
          <a href='/contact' className={styles.iconPhone}>
            <Icon className={styles.icon} iconName='faPhone' />
          </a>
          {/* <div className={styles.line + ' ' + styles.lineInvisible} /> */}
          {/* <div onMouseEnter={this.state.screenWidth > 1023 && ui.showPopup}>
            {user.isLoggedIn ? (
              <div className={styles.popupImage} onClick={this.userIconClick}><img src='../../../../static/assets/images/profileImage.jpg' /></div>
            ) : (
              <Icon onClick={this.userIconClick} className={styles.icon + ' ' + styles.iconUser} iconName='faUser' />
            )}
          </div>
          <LoginPopup ref={this.LoginPopup} /> */}
        </div>
      </div>
    )
  }
}

export default DesktopNavigation
