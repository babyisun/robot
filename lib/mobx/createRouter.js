import React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";
import { PROPS_KEY } from "./decorator";
import Loading from "../components/loading";
import { Panel, MESSAGE } from "../components/panel";

const load = (folder, file = "Index", store, defaultStore = "store") =>
  Loadable({
    loader: async () => {
      const promises = [import(`@/pages${folder}/${file}`)];
      // 文件夹中必须含有src/stores/index文件来包含基础store
      promises.push(import("@/stores/index"));
      let stores;
      if (store) {
        if (defaultStore) {
          stores = [...new Set([defaultStore].concat(store))];
        } else {
          stores = store;
        }
      } else if (defaultStore) {
        stores = [defaultStore];
      }
      if (stores && stores.length) {
        stores.forEach(item => {
          if (!item.includes("/")) {
            promises.push(import(`@/pages${folder}/${item}`));
          } else {
            promises.push(import(`@/${item}`));
          }
        });
      }
      const loaded = await Promise.all(promises);
      return loaded;
    },

    loading: props => {
      const { error } = props;
      if (error)
        return (
          <Panel
            message={{
              title: "Error",
              content: error.message
            }}
          />
        );
      return <Loading />;
    },
    render: (loaded, props) => {
      let Component = null;
      const stores = {};
      let base = null;
      if (!loaded) return <Panel message={MESSAGE.ERROR} />;
      const len = loaded.length;
      if (len > 1) {
        Component = loaded[0].default || loaded;
        base = loaded[1].default;
        if (len > 2) {
          for (let i = 2; i < len; i++) {
            // const name = loaded[i].default.constructor.name.split('');
            // name[0] = name[0].toLowerCase();
            const name = loaded[i].default.constructor[PROPS_KEY];
            // eslint-disable-next-line no-prototype-builtins
            if (!stores.hasOwnProperty(name)) {
              stores[name] = loaded[i].default || loaded;
            } else {
              console.error("The key of props already exists");
            }
          }
        }
      }
      return <Component base={base} {...stores} {...props} />;
    }
    //   delay: 1000,
    // timeout: 3000,
  });

const setRoute = route => {
  const { path, folder, file, store, defaultStore } = route;
  const LoadedComponent = load(folder, file, store, defaultStore);

  const Component = props => <LoadedComponent {...props} />;
  return <Route key={path} path={path} render={Component} exact />;
};


const createRouter = router => {
  const Routes = [];
  router.forEach(item => {
    if (item.children) {
      if (item.folder && !item.link) {
        Routes.push(setRoute(item));
      }
      const RS = createRouter(item.children);
      RS.Routes.forEach(i => Routes.push(i));
      //   RS.Stores.forEach(i => Stores.push(i));
    } else if (item.folder && !item.link) {
      Routes.push(setRoute(item));
    }
  });
  return {
    Routes
  };
};

export default createRouter;
