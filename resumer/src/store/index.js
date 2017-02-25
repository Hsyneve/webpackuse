import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        
        selected: 'workHistory',
        resume: {
            config: [
                { field: 'profile', icon: 'id' },
                { field: 'workHistory', icon: 'work' },
                { field: 'education', icon: 'book' },
                { field: 'projects', icon: 'heart' },
                { field: 'awards', icon: 'cup' },
                { field: 'contacts', icon: 'phone' },
            ],
            profile: {
                name: '何羽',
                city: '南京',
                title: ''
            },
            workHistory: [
              
                { company: '公司1', content: '我的第一份工作是北京大学教授，负责教授西方音乐文化与中国文化差异' },
                  { company: '公司2', content: '我的第二份工作是香港中文大学教授，负责教授近代史及现代史' },
            ],
            projects: [
                { name: '研究生项目1', content: '组织学生学习近代史' },
                { name: '研究生项目2', content: '组织学生学习西方音乐' },
            ],
            education: [
                { school: '清华大学', content: '本科' },
                { school: '香港中文大学', content: '本科' },
            ],
            awards: [
                { name: '奖学金', content: '获得校一等奖学金' },
                { name: '学术创造奖', content: '获得论文奖' },
            ],
            contacts: [
                { contact: 'phone', content: '13812345678' },
                { contact: 'qq', content: '12345678' },
            ]

        }


    },
    mutations: {
      

   switchTab (state, payload){
      state.selected = payload // 关于 payload 看这里 http://vuex.vuejs.org/zh-cn/mutations.html#提交载荷（payload）
    }}
})
