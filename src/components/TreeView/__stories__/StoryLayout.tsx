import { ReactNode } from 'react'
import styles from './styles.css'

type StoryLayoutProps = {
  title: string
  value: string[]
  children: ReactNode
}

export function StoryLayout({ title, children, value }: StoryLayoutProps) {
  return (
    <div className={styles.root}>
      <div className={styles.tree}>
        <h2>{title}</h2>
        {children}
      </div>

      <div className={styles.values}>
        <h2>Values</h2>

        <div className={styles.valuesList}>
          {value.map((v) => (
            <span className={styles.value}>{v}</span>
          ))}
        </div>
      </div>
    </div>
  )
}
