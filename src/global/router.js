import Vue from 'vue'
import Router from 'vue-router'

import login from '../views/login/router'
import transactionManage from '../views/transactionManage/router'
import buyManage from '../views/buyManage/router'
import sellManage from '../views/sellManage/router'
import userManage from '../views/userManage/router'
import otherManage from '../views/otherManage/router'
// import complainManage from '../views/complainManage/router'

Vue.use(Router)

export default new Router({
	routes: [
	{
		path: '/',
		redirect: '/login',
	},
	...login,
	...transactionManage,
	...buyManage,
	...sellManage,
	...userManage,
	...otherManage
	// ...complainManage
	]
})
