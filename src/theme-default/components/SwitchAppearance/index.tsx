import { toggle } from '../../utils/toggleAppearance';
import styles from './index.module.scss';
// 逻辑部分待补充

interface SwitchProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

// 导出一个名为Switch的函数，接收一个SwitchProps类型的props参数
export function Switch(props: SwitchProps) {
  // 返回一个button元素，包含className、id、type、role等属性，以及onClick事件
  return (
    <button
      className={`${styles.switch} ${props.className}`}
      id={props.id ?? ''}
      type="button"
      role="switch"
      {...(props.onClick ? { onClick: props.onClick } : {})}>
      {/* 在button元素内部包含一个span元素，包含check和icon两个className */}
      <span className={styles.check}>
        <span className={styles.icon}>{props.children}</span>
      </span>
    </button>
  );
}

// 导出一个名为SwitchAppearance的函数
export function SwitchAppearance() {
  // 返回一个Switch组件，点击时触发toggle函数
  return (
    <Switch onClick={toggle}>
      <div className={styles.sun}>
        <div className={styles.iCarbonSun}></div>
      </div>
      <div className={styles.moon}>
        <div className={styles.iCarbonMoon}></div>
      </div>
    </Switch>
  );
}
