import { extendObservable, runInAction } from 'mobx';

const SUFFIX = { LOADING: 'Loading', DATA: 'Data' };

export const asyncAction = (currClass, actionName) => {
  extendObservable(currClass, {
    [`${actionName}${SUFFIX.LOADING}`]: false,
    // [`${actionName}${SUFFIX.DATA}`]: null,
  });
  const old = currClass[actionName];
  currClass[actionName] = async (...args) => {
    if (currClass[`${actionName}${SUFFIX.LOADING}`]) {
      return null;
    }
    runInAction(() => {
      currClass[`${actionName}${SUFFIX.LOADING}`] = true;
    });
    const data = await old(...args);
    runInAction(() => {
      currClass[`${actionName}${SUFFIX.LOADING}`] = false;
    });
    return data;
  };
};

export const asyncListAction = (currClass, currAction) => {
  const actionName = currAction.replace('async_list_', '');
  extendObservable(currClass, {
    [`${actionName}Page`]: {
      page: 1, // 当前页数
      page_size: 10, // 每页条数
    },
    [`${actionName}Query`]: null,
    [`${actionName}Loading`]: false,
    [`${actionName}Data`]: null,
  });
  const old = currClass[currAction];
  currClass[currAction] = async () => {
    runInAction(() => {
      currClass[`${actionName}Loading`] = true;
    });
    const data = await old();
    console.log(data);
    if (data && data.success) {
      runInAction(() => {
        currClass[`${actionName}Data`] = data.data;
        currClass[`${actionName}Loading`] = false;
      });
    } else {
      runInAction(() => {
        currClass[`${actionName}Loading`] = false;
      });
    }
  };
};
