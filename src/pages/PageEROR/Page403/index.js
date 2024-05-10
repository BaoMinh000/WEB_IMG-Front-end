import style from './Page403.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Page403() {
  return (
    <div className={cx('container')}>
      <div className={cx('diagonal')}>
        <div className={cx('content')}>
          <div className={cx('c-5')}>
            <div className={cx('title_page_header--403')}>403</div>
          </div>
          <div className={cx('c-5')}>
            <div className={cx('dots-container')}>
              <div className={cx('dot dot-blue')}></div>
              <div className={cx('dot dot-yellow')}></div>
              <div className={cx('dot dot-red')}></div>
            </div>
            <p className={cx('custom-font')}>Access Denied!</p>
            <p>You don't have permission to access this resource.</p>
            <div>
              <div className={cx('button')}>Back to Home</div>
              {/* <div className={cx('button')}>Logout</div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page403;
