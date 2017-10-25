// 不同状态的事项列表
var filters = {
	all: function (todos) {
		return todos;
	},
	active: function (todos) {
		return todos.filter(function (item) {
			return !item.completed;
		})
	},
	completed: function (todos) {
		return todos.filter(function (item) {
			return item.completed;
		})
	}
}

// 创建vue实例
var vm = new Vue({
	el: "#todo_app",
	data: {
		todos: todoStorage.fetch(),
		newTodo: "",
		visibility: "all",
		editedTodo: null
		// tabBol: 0
	},
	watch: {
		todos: {
			handler: function (newTodos) {
				todoStorage.save(newTodos);
			},
			deep: true
		}
	},
	computed: {
		filteredTodos: function () {
			return filters[this.visibility](this.todos);
		},
		leftTasks: function () {
			var leftTasks = this.todos.filter(function (item) {
				return !item.completed;
			});
			return leftTasks.length;
		},
		isCompleted: function () {
			var comp = this.todos.filter(function (item) {
				return item.completed;
			});
			if (comp.length > 0) {
				return true;
			}
			return false;
		},
		allCompleted: function () {
			return this.todos.every(function (item) {
				return item.completed;
			})
		}
	},
	methods: {
		addTodo: function () {
			var des = this.newTodo && this.newTodo.trim();
			if (!des) {
				return;
			}
			var obj = {
				des: des,
				completed: false
			};
			this.todos.push(obj);
			this.newTodo = "";
		},
		editTodo: function (todo) {
			this.beforeEditCache = todo.des;
			this.editedTodo = todo;
		},
		removeTodo: function (todo) {
			var index = this.todos.indexOf(todo);
			this.todos.splice(index, 1);
		},
		doneEdit: function (todo) {
			this.editedTodo = null;
		},
		cancelEdit: function (todo) {
			this.editedTodo = null;
			todo.des = this.beforeEditCache;
		},
		/*changeTab: function (state) {
			this.tabBol = state;
			var key = Object.keys(filters)[state];
			this.visibility = key;
		},*/
		clearCompleted: function () {
			this.todos = this.todos.filter(function (item) {
				return !item.completed;
			})
		},
		toggleAll: function () {
			if (this.allCompleted) {
				this.todos = this.todos.map(function (item) {
					item.completed = false;
					return item;
				});
				return;
			}
			this.todos = this.todos.map(function (item) {
				item.completed = true;
				return item;
			})
		}
	},
	directives: {
		"todo-focus": function (el, binding) {
			if (binding.value) {
				el.focus();
			}
		}
	}
})

// 配置路由
function onHashChange() {
	var visibility = location.hash.replace(/#\/?/, "");
	if (filters[visibility]) {
		vm.visibility = visibility;
	} else {
		location.hash = "";
		vm.visibility = "all";
	}
}

onHashChange();
window.addEventListener("hashchange", onHashChange);