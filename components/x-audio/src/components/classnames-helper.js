import classNames from 'classnames';
import styles from './styles.scss'
export default (...classes) => classNames(classes.map(className => styles[className]));
