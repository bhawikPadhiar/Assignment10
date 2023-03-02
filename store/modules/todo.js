const state = {
    todolist: []
};

const getters = {
    allTable: state => state.todolist

}

const actions = {
    // DisplayTodo
    async fetchTodo({ commit }) {
        const response = await this.$axios.get('http://localhost:8080/todolist');
        commit('setTodo', response.data)

    },

    //AddTodo
    async addTodo({ commit }, param) {
        const response = await this.$axios.post('http://localhost:8080/todolist', param);
        commit('addTodo', response.data)
      //  console.log(response.data)
    },

    //DeleteTodo
    async deleteTodo({ commit }, id) {
        await this.$axios.delete(`http://localhost:8080/todolist/${id}`);
        commit('removeItem', id);
    },
    //EditTodo
    async editTodo({ commit }, edit) {
        const response = await this.$axios.put(`http://localhost:8080/todolist/${edit.id}`, edit);
        commit('editTodo', edit);
     //   console.log(response.data)
    }

}

const mutations = {
    setTodo: (state, todolist) => (state.todolist = todolist),
    addTodo: (state, todolist) => state.todolist.unshift(todolist),
    removeItem: (state, id) => state.todolist = state.todolist.filter(todolist => todolist.id !== id),
    editTodo: (state, edit) => {
        const index = state.todolist.findIndex(todolist => todolist.id === edit.id);
        if (index !== -1) {
            state.todolist.splice(index, 1, edit);
            console.warn(edit)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}