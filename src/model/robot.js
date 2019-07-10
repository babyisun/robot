import AV from '@/utils/av';

class Robot extends AV.Object {

  // 公司名
  get companyName() { return this.get('companyName'); }

  set companyName(value) { this.set('companyName', value); }

  // 群名
  get groupName() { return this.get('groupName'); }

  set groupName(value) { this.set('groupName', value); }
  
  // 机器人名
  get name() { return this.get('name'); }

  set name(value) { this.set('name', value); }
  
  // 唯一键
  get key() { return this.get('key'); }

  set key(value) { this.set('key', value); }

  // 链接地址
  get url() { return this.get('url'); }

  set url(value) { this.set('url', value); }
  
  // 签名
  get sign() { return this.get('sign'); }

  set sign(value) { this.set('sign', value); }

  // 状态
  get status() { return this.get('status'); }

  set status(value) { this.set('status', value); }
  
}

AV.Object.register(Robot, 'Robot');

export default Robot;