import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  primary = false,
  outline = false,
  text = false,
  rounded,
  disable,
  small = false,
  large = false,
  children,
  className,
  lefticon,
  righticon,
  onClick,
  ...passsProps
}) {
  let Component = 'button';
  const props = {
    onClick,
    ...passsProps,
  };
  //Remove event listener when button is disable
  if (disable) {
    // delete props.onClick;
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }
  if (to) {
    props.to = to;
    Component = Link;
  } else if (href) {
    props.href = href;
    Component = 'a';
  }

  const classes = cx('wrapper', {
    [className]: className,
    primary,
    outline,
    text,
    rounded,
    disable,
    small,
    large,
  });

  return (
    <Component className={classes} {...props}>
      {lefticon && <span className={cx('icon')}>{lefticon}</span>}
      <span className={cx('title')}>{children}</span>
      {righticon && <span className={cx('icon')}>{righticon}</span>}
    </Component>
  );
}

export default Button;
