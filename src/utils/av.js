import AV from 'leancloud-storage';
import APP from '../config';

AV.init(APP.ID, APP.KEY);
// 调试信息
if (process.env.NODE_ENV === 'development') {
  localStorage.setItem('debug', 'leancloud*,LC*');
}

export default AV;
