import React from 'react'
import styles from './nav-item.scss'
// import Navlink from '../../../navlink/navlink'
import Icon from '../../../icon/icon'
import { observer, inject } from 'mobx-react'
import * as check from '../../../../services/browsercheck'

@inject('store') @observer
class NavItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isToggle: false,
      isLast: '',
      upClasss: ''
    }
  }

  componentDidMount () {
    const browser = check.browserCheck()
    if (browser === 'IE11' || browser === 'Edge') {
      this.setState({
        lineUpIE: styles.lineUpIE,
        lineDownIE: styles.lineDownIE
      })
    }
  }

  shouldHaveSquiggly = () => {
    const { ui } = this.props.store
    return ((ui.toggleSubLink[this.props.name] || !this.props.isLast) && !this.state.isToggle)
  }

  subNav = () => {
    return (
      <div className={`${styles.subnav} ${this.state.isToggle && 'show'}`}>
        <style jsx>{`
        .show {
          max-height: ${58 * this.props.subNavLinks.length}px;
          margin-top: 10px;
        }
      `}</style>
        <div className={styles.lineContainer}>
          <div className={`${styles.lineUp} ${this.state.lineUpIE}`} />
        </div>
        {this.props.subNavLinks && this.props.subNavLinks.map((link, key) => (
          <a key={key} href={`/${link.href}`} className={styles.subnavLink}>
            <p key={key} className={styles.subnavLink}>{link.text}</p>
          </a>
        ))}
        <div className={styles.lineContainer}>
          <div className={`${styles.lineDown} ${this.state.lineDownIE}`} />
        </div>
      </div>
    )
  }

  toggleSubNav = () => {
    const upClass = this.state.upClass ? '' : styles.arrowUp
    const result = !this.state.isToggle
    this.setState({ isToggle: result, upClass })
    const { ui } = this.props.store
    ui.mobileNavHeightset(result, this.props.subNavLinks.length)
  }

  render () {
    return (
      <div className={`${styles.item} ${this.props.isLast && styles.itemLast}`}>
        <div className={styles.mobileDropdown}>
          <a className={styles.link} href={this.props.href}>
            {this.props.name} {this.props.iconName && <Icon className={styles.linkIcon} iconName={this.props.iconName} />}
          </a>
          {this.props.subNavLinks && <Icon className={`${styles.arrow} ${this.state.upClass}`} onClick={this.toggleSubNav} iconName='faCaretDown' />}
        </div>
        <div className={styles.mobileSubnav}>
          {this.props.subNavLinks && this.subNav()}
          {this.shouldHaveSquiggly() && <div className={styles.line} />}
        </div>
      </div>
    )
  }
}

export default NavItem
