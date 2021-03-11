import Vue from 'vue'
import App from './App.vue'
import { Parse } from 'parse';
import { ParseVueObject } from './ParseVueObject';
Parse.initialize("YOUR_APP_ID");
Parse.enableLocalDatastore();
const classes = ['Monster', 'MyObject'];
for (const className of classes) {
  Parse.Object.registerSubclass(className, ParseVueObject);
}
new Vue({
  render: h => h(App),
}).$mount('#app')
