import cn from 'classnames';
import styles from './styles.scss'
export default (...classNames) => cn(classNames.map(className => styles[className]))
