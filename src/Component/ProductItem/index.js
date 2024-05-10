import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';

const cx = classNames.bind(styles);

function ProductItem() {
  return (
    <div className={cx('wrapper')}>
      <img
        className={cx('Imgitem')}
        width={20}
        src="https://nguyenliemstore.io.vn/assets/img/Product-img/den-led-bup-9w-doi-mau-rang-dong-LED-A60-DM-9W-min.png"
        alt="Bóng đèn led"
      />
      <div className={cx('info')}>
        <p className={cx('name')}>Bóng đèn led</p>
      </div>
    </div>
  );
}

export default ProductItem;
