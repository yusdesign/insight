// Real-world Vue.js application component
<template>
  <div class="user-management">
    <div class="header">
      <h1>User Management</h1>
      <button @click="showAddUser = true" class="btn-primary">
        Add User
      </button>
    </div>

    <div class="filters">
      <input 
        v-model="searchQuery" 
        placeholder="Search users..." 
        class="search-input"
      />
      <select v-model="roleFilter" class="role-select">
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="user">User</option>
        <option value="moderator">Moderator</option>
      </select>
    </div>

    <div v-if="loading" class="loading">
      Loading users...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else class="user-list">
      <div 
        v-for="user in filteredUsers" 
        :key="user.id" 
        class="user-card"
        :class="{ 'user-active': user.isActive }"
      >
        <div class="user-avatar">
          <img :src="user.avatar" :alt="user.name" />
        </div>
        <div class="user-info">
          <h3>{{ user.name }}</h3>
          <p class="user-email">{{ user.email }}</p>
          <span class="user-role">{{ user.role }}</span>
        </div>
        <div class="user-actions">
          <button @click="editUser(user)" class="btn-secondary">
            Edit
          </button>
          <button 
            @click="toggleUserStatus(user)" 
            :class="['btn', user.isActive ? 'btn-warning' : 'btn-success']"
          >
            {{ user.isActive ? 'Deactivate' : 'Activate' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddUser" class="modal-overlay">
      <div class="modal">
        <h2>Add New User</h2>
        <form @submit.prevent="addUser">
          <div class="form-group">
            <label>Name:</label>
            <input v-model="newUser.name" required />
          </div>
          <div class="form-group">
            <label>Email:</label>
            <input v-model="newUser.email" type="email" required />
          </div>
          <div class="form-group">
            <label>Role:</label>
            <select v-model="newUser.role" required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
          </div>
          <div class="modal-actions">
            <button type="button" @click="showAddUser = false" class="btn-secondary">
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserManagement',
  data() {
    return {
      users: [],
      loading: false,
      error: null,
      searchQuery: '',
      roleFilter: '',
      showAddUser: false,
      newUser: {
        name: '',
        email: '',
        role: 'user'
      }
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            user.email.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesRole = !this.roleFilter || user.role === this.roleFilter;
        return matchesSearch && matchesRole;
      });
    }
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        this.users = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    
    async addUser() {
      try {
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.newUser)
        });
        
        if (!response.ok) throw new Error('Failed to add user');
        
        const user = await response.json();
        this.users.push(user);
        this.showAddUser = false;
        this.resetNewUser();
      } catch (err) {
        this.error = err.message;
      }
    },
    
    editUser(user) {
      // Implementation for editing user
      console.log('Edit user:', user);
    },
    
    async toggleUserStatus(user) {
      try {
        const response = await fetch(`/api/users/${user.id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ isActive: !user.isActive })
        });
        
        if (!response.ok) throw new Error('Failed to update user status');
        
        user.isActive = !user.isActive;
      } catch (err) {
        this.error = err.message;
      }
    },
    
    resetNewUser() {
      this.newUser = {
        name: '',
        email: '',
        role: 'user'
      };
    }
  }
}
</script>

<style scoped>
.user-management {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.search-input, .role-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 10px;
  background: white;
}

.user-card.user-active {
  border-left: 4px solid #4CAF50;
}

.user-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-info {
  flex: 1;
}

.user-email {
  color: #666;
  margin: 5px 0;
}

.user-role {
  background: #e3f2fd;
  color: #1976d2;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
}

.user-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary { background: #2196F3; color: white; }
.btn-secondary { background: #f5f5f5; color: #333; }
.btn-success { background: #4CAF50; color: white; }
.btn-warning { background: #ff9800; color: white; }

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 30px;
  border-radius: 8px;
  min-width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input, .form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.loading, .error {
  text-align: center;
  padding: 40px;
  font-size: 1.1em;
}

.error {
  color: #f44336;
}
</style>