import VueI18n from './vue-i18n.js';//需先安装vue-i18n
import Vue from 'vue';

Vue.use(VueI18n);
import messagesEn from './locales/en.js';   // 英文
import messagesCn from './locales/cn.js';	// 中文
import messagesAr from './locales/ar.js';	// 日文
import messagesCn_fanti from './locales/cn_fanti.js';  // 中文繁体


const messages = {
	'en': { message: messagesEn },
	'cn': { message: messagesCn },
	'cn_fanti': { message: messagesCn_fanti },
	'ar': { message: messagesAr },
}
 
var lang = uni.getStorageSync('languageHS') ? uni.getStorageSync('languageHS') : 'cn';

var i18n = new VueI18n({
  locale: lang,    // 语言标识
  messages
});
Vue.prototype._i18n = i18n; 
 
export default i18n
