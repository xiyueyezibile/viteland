import { toggle } from '../../utils/toggleAppearance';
import styles from './index.module.scss';
// 逻辑部分待补充

interface SwitchProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Switch(props: SwitchProps) {
  return (
    <button
      className={`${styles.switch} ${props.className}`}
      id={props.id ?? ''}
      type="button"
      role="switch"
      {...(props.onClick ? { onClick: props.onClick } : {})}>
      <span className={styles.check}>
        <span className={styles.icon}>{props.children}</span>
      </span>
    </button>
  );
}

export function SwitchAppearance() {
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
