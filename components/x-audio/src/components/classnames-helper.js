import classNames from 'classnames';
import styles from './styles.scss'
export default (...classes) => classNames(classes.map(className => {
	return typeof className === 'string' ? styles[className] : mapObject(className)
}));

const mapObject = classObj => Object.entries(classObj).reduce((acc, [key, value]) => {
	return {...acc, [styles[key]] : value }
}, {})
