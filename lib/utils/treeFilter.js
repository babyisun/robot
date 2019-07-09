/**
 * 查找树中的项目
 *
 * data - 原数组
 * filterFn - 查询方法
 * opts - 配置项 childrenKeyName 为树中子项key，默认为children
 */
const treeFilter = (data = [], filterFn, options = { childrenKeyName: 'children' }) => {
  let children = data;
  const result = [];
  let level = 0;
  do {
    // eslint-disable-next-line no-loop-func
    const foundItem = children.filter(item => filterFn(item, level))[0];
    if (!foundItem) {
      break;
    }
    result.push(foundItem);
    children = foundItem[options.childrenKeyName] || [];
    level += 1;
  } while (children.length);
  return result;
};

export default treeFilter;
