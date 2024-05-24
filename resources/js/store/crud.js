import axios from 'axios';
import router from '@/router';

export default {
    namespaced: true,
    state: {
        items: [],
        searchQuery: '',
        currentPage: 1,
        itemsPerPage: 5,
      },
      mutations: {
        SET_ITEMS(state, items) {
          state.items = items;
        },
        ADD_ITEM(state, item) {
          state.items.push(item);
        },
        UPDATE_ITEM(state, updatedItem) {
          const index = state.items.findIndex(item => item.id === updatedItem.id);
          if (index !== -1) {
            state.items.splice(index, 1, updatedItem);
          }
        },
        DELETE_ITEM(state, itemId) {
          state.items = state.items.filter(item => item.id !== itemId);
        },
        SET_SEARCH_QUERY(state, query) {
          state.searchQuery = query;
        },
        SET_CURRENT_PAGE(state, page) {
          state.currentPage = page;
        },
      },
      actions: {
        fetchItems({ commit }) {
          // Simulate fetching items from an API
          const items = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
            { id: 3, name: 'Item 3' },
            { id: 4, name: 'Item 4' },
            { id: 5, name: 'Item 5' },
            { id: 6, name: 'Item 6' },
            // Add more items as needed
          ];
          commit('SET_ITEMS', items);
        },
        deleteItem({ commit }, itemId) {
          commit('DELETE_ITEM', itemId);
        },
        setSearchQuery({ commit }, query) {
          commit('SET_SEARCH_QUERY', query);
        },
        setCurrentPage({ commit }, page) {
          commit('SET_CURRENT_PAGE', page);
        },
      },
      getters: {
        filteredItems: state => {
          const query = state.searchQuery.toLowerCase();
          return state.items.filter(item => item.name.toLowerCase().includes(query));
        },
        paginatedItems: (state, getters) => {
          const start = (state.currentPage - 1) * state.itemsPerPage;
          const end = start + state.itemsPerPage;
          return getters.filteredItems.slice(start, end);
        },
        totalPages: (state, getters) => {
          return Math.ceil(getters.filteredItems.length / state.itemsPerPage);
        },
        currentPage: state => state.currentPage,
      },
}
