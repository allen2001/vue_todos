// 设置localstorage本地缓存
(function (exports) {
	"use strict";
	var STORAGE_KEY = "todos_vue";
	exports.todoStorage = {
		fetch: function () {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
		},
		save: function (todos) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		}
	}
})(window)