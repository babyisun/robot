import React from "react";
import styles from "./index.scss";

/**
 * Launcher 默认为圆环加载 <Launcher />
 *
 * @param  {string} text           loading时显示在屏幕中间的文字，空为Loading... <Loading text="加载中..." />
 */
const Loading = ({ text }) => {
  return (
    <div
      style={{ color: "rgba(136, 136, 136, 0.5)" }}
      className={styles.cpLoadingPage}
    >
      <div style={{ fontSize: 26 }} className={styles.cpLoadingColorful} />
      {text && <div className={styles.text}>{text}</div>}
    </div>
  );
};

export default Loading;
