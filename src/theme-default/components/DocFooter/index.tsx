import { usePrevNextPage } from '@/theme-default/hooks/usePrevNextPage';
import styles from './index.module.scss';

// 导出一个名为DocFooter的函数
export function DocFooter() {
  // 使用usePrevNextPage钩子获取prevPage和nextPage
  const { prevPage, nextPage } = usePrevNextPage();
  return (
    // 返回一个footer元素
    <footer mt="8">
      {/* 使用flex布局，设置gap为2，设置divider-top为~，设置pt为6 */}
      <div flex="~" gap="2" divider-top="~" pt="6">
        {/* 使用flex布局，设置方向为列，设置className为styles.prev */}
        <div flex="~ col" className={styles.prev}>
          {/* 如果prevPage存在，则渲染一个a标签 */}
          {prevPage && (
            <a href={prevPage.link} className={styles.pagerLink}>
              {/* 渲染上一页的描述 */}
              <span className={styles.desc}>上一页</span>
              {/* 渲染上一页的标题 */}
              <span className={styles.title}>{prevPage.text}</span>
            </a>
          )}
        </div>
        {/* 使用flex布局，设置方向为列，设置className为styles.next */}
        <div flex="~ col" className={styles.next}>
          {/* 如果nextPage存在，则渲染一个a标签 */}
          {nextPage && (
            <a href={nextPage.link} className={`${styles.pagerLink} ${styles.next}`}>
              {/* 渲染下一页的描述 */}
              <span className={styles.desc}>下一页</span>
              {/* 渲染下一页的标题 */}
              <span className={styles.title}>{nextPage.text}</span>
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
