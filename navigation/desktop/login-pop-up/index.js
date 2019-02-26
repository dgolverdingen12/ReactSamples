import { Component } from 'react'
import styles from './login-popup-style.scss'
import buttonStyles from './login-button.scss'
import Icon from '../../../icon/icon'
import { observer, inject } from 'mobx-react'
import mobileService from '../../mobile/mobile-service'
@inject('store') @observer
class LoginPopup extends Component {
  constructor (props) {
    super(props)
    this.state = { popupShow: styles.popupShow, loggedIn: true }
  }

  togglePopup = () => {
    const { ui } = this.props.store
    ui.toggleLoginPopup()
    ui.hideMobileNav()
    console.log('loginPopupStatus: ', ui.loginPopupStatus)
    console.log('toggleMobileNav: ', ui.mobileNav)
    global.ui = ui
    mobileService.publish({ name: 'burgerClose' })
  }

  render () {
    const { ui, user } = this.props.store
    if (user.isLoggedIn) {
      return (
        <div onMouseLeave={global.innerWidth > 1023 && ui.hidePopup} className={`${styles.popupContainerOpen} ${!ui.loginPopupStatus && styles.popupShow}`}>
          <Icon onClick={this.togglePopup} className={styles.icon + ' ' + styles.iconClose} iconName='faTimes' />
          <div className={styles.popupArrow} />
          <a className={styles.popupLink + ' ' + styles.popupTextOpen} href='#'>Dashboard</a>
          <div className={styles.popupLine} />
          <a className={styles.popupLink + ' ' + styles.popupTextOpen} href='#'>Your tenders</a>
          <div className={styles.popupLine} />
          <a className={styles.popupLink + ' ' + styles.popupTextOpen} href='#'>Bids &amp; saved projects</a>
          <div className={styles.popupLine} />
          <a className={styles.popupLink + ' ' + styles.popupTextOpen} href='#'>messages</a>
          <div className={styles.popupLine} />
          <a className={styles.popupLink + ' ' + styles.popupTextOpen} href='#'>Settings</a>
          <div className={styles.popupLine} />
          <div className={styles.popupText + ' ' + styles.popupTextBottom}><a href='#'>Logout</a></div>
        </div>
      )
    } else {
      return (
        <div onMouseLeave={global.innerWidth > 1023 && ui.hidePopup} className={`${styles.popupContainer} ${!ui.loginPopupStatus && styles.popupShow}`}>
          <Icon onClick={this.togglePopup} className={styles.icon + ' ' + styles.iconClose} iconName='faTimes' />
          <div className={styles.popupArrow} />
          <div className={styles.popupText}>To view projects or to create a tender login to your account.</div>
          <button className={buttonStyles.buttonLogin}>Login</button>
          <div className={styles.popupText + ' ' + styles.popupTextBottom}>I want to <a href='#'>register</a></div>
        </div>
      )
    }
  }
}

export default LoginPopup
