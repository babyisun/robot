// import AV from '@/utils/av';
import AV from 'leancloud-storage';

class Task extends AV.Object {

  // 任务名
  get name() { return this.get('name'); }

  set name(value) { this.set('name', value); }

  // 计划
  get corn() { return this.get('corn'); }

  set corn(value) { this.set('corn', value); }
  
  // 内容
  get content() { return this.get('content'); }

  set content(value) { this.set('content', value); }
  
  // 格式
  get msgtype() { return this.get('msgtype'); }

  set msgtype(value) { this.set('msgtype', value); }

  // 链接地址
  get mentioned() { return this.get('mentioned'); }

  set mentioned(value) { this.set('mentioned', value); }
  
  // news
//   get articles() { return this.get('articles'); }

//   set articles(value) { this.set('articles', value); }

  // 状态
  get status() { return this.get('status'); }

  set status(value) { this.set('status', value); }
  
}

AV.Object.register(Task, 'Task');

export default Task;