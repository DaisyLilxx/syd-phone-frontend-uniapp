//pinia 独立化，main中抽出，在这统一处理
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(persist)
export default pinia
// 统一导出
//import { useCounterStore } from './modules/counter'
//export { useCounterStore }
//等价于
export * from './modules/header'
export * from './modules/serialNo'
export * from './modules/userMess'
// export * from './modules/user'
