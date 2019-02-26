import { Component } from 'react'
import { observer, inject } from 'mobx-react'
// import Link from 'next/link'
import styles from './subnav.scss'

@inject('store') @observer
class SubNavigation extends Component {
  render () {
    const { pages } = this.props.store
    return (
      pages.pagesArray.length > 0 && (
        <nav className={styles.subnav}>
          <ul className={styles.list}>
            {pages.pagesArray.map((item, i) => {
              return (
                <li className={styles.item} key={i}>
                  <a href={item.href} className={[styles.link, item.active && styles.active].join(' ')} key={i}>
                    {item.text}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      )
    )
  }
}
export default SubNavigation
