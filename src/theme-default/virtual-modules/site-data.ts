//@ts-ignore .d.ts 报错 namespace child (hoisting) not supported yet，但实际存在
import data from 'viteland:site-data';
import { UserConfig } from '@/node/types';

const siteData = data as UserConfig;

export default siteData;
