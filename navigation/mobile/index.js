import React from 'react'
import styles from './mobile-nav.scss'
import NavItem from './nav-item'
import { observer, inject } from 'mobx-react'
import mobileService from '../mobile/mobile-service'
import { socialMediaLinks } from './mock-data'
import Icon from '../../icon/icon'

@inject('store') @observer
class MobileNav extends React.Component {
  hideMobileNav = () => {
    const { ui } = this.props.store
    ui.hideMobileNav()
    mobileService.publish({ name: 'burgerClose' })
  }

  render () {
    const { pages, ui } = this.props.store
    const { subNavigations } = pages
    const subNavigationsKeys = Object.keys(subNavigations)
    return (
      <div className={`${styles.popup} ${ui.mobileNav && styles.popupShow}`}>
        <ul className={styles.list}>
          <div className={styles.rail} />
          {subNavigationsKeys.map(key => (
            <li key={key} className={styles.item}>
              <NavItem
                isLast={subNavigationsKeys.indexOf(key) === (subNavigationsKeys.length - 1)}
                subNavLinks={subNavigations[key].subLinks && subNavigations[key].subLinks}
                iconName={subNavigations[key] && subNavigations[key].icon}
                href={`/${key}`}
                key={key}
                name={key}
              />
            </li>
          ))}
        </ul>
        <div className={styles.mobileFooter}>
          <div className={styles.mobileFooterWrapper}>
            {socialMediaLinks.map((object, key) => (
              <a key={key} href={object.href}>
                <Icon key={key} className={styles.socialMediaLink} iconName={object.icon} />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.navOpenBackground} />
      </div>
    )
  }
}

export default MobileNav
