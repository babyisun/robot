import AV from 'leancloud-storage';

AV.init("jSEFKegpVHveHRdim2kASMzV-gzGzoHsz", "sgbaSoyNpSod5Eu9N68FpcJk");
// 调试信息
if (process.env.NODE_ENV === 'development') {
  localStorage.setItem('debug', 'leancloud*,LC*');
}

export default AV;
