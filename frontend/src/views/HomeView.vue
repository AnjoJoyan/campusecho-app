<template>
  <div class="app-bg">
    <header class="main-header">
      <div class="header-content">
        <h1 class="brand-title">Campus<span>Eco</span> Dashboard</h1>
        <div class="status-indicator">
          <span class="dot animate-pulse"></span> Local Server Active
        </div>
      </div>
    </header>

    <main class="main-container">
      <section class="card form-card">
        <h2 class="section-title">Sell Something New</h2>
        <form @submit.prevent="addItem" class="interactive-form">
          <div class="form-row">
            <div class="input-group">
              <input v-model="newItem.title" placeholder="What are you selling?" required />
            </div>
            <div class="input-group price-input">
              <span class="currency-prefix">Rs.</span>
              <input v-model="newItem.price" type="number" placeholder="0.00" required />
            </div>
          </div>
          
          <div class="form-row">
            <div class="input-group">
              <select v-model="newItem.category">
                <option value="Textbooks">📚 Textbooks</option>
                <option value="Electronics">💻 Electronics</option>
                <option value="Carpool">🚗 Carpool</option>
              </select>
            </div>
            <button type="submit" class="btn-submit">Post Listing</button>
          </div>
        </form>
      </section>

      <div class="search-wrapper">
        <span class="search-icon">🔍</span>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Filter by title, textbook name, category..."
          class="global-search"
        />
      </div>

      <div v-if="loading" class="feed-status-box">
        <p>Fetching active campus listings...</p>
      </div>
      
      <div v-else-if="error" class="feed-status-box error-state">
        <p class="error-msg">⚠️ Connection Failure: {{ error }}</p>
      </div>
      
      <div v-else class="listings-grid">
        <ListingCard 
          v-for="listing in filteredListings" 
          :key="listing.id" 
          :item="listing" 
        />
      </div>

      <div v-if="filteredListings.length === 0 && !loading" class="feed-status-box">
        <p>No matching listings found on your campus query.</p>
      </div>
    </main>

    <footer class="app-footer">
      <p>CampusEco Marketplace Engine &bull; Relational Data System Active</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ListingCard from '../components/ListingCard.vue';

const listings = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const newItem = ref({ title: '', price: '', category: 'Textbooks' });

const filteredListings = computed(() => {
  return listings.value.filter(item => {
    return item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
           item.category.toLowerCase().includes(searchQuery.value.toLowerCase());
  });
});

const addItem = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem.value)
    });

    if (response.ok) {
      const savedItem = await response.json();
      listings.value.unshift(savedItem);
      newItem.value = { title: '', price: '', category: 'Textbooks' };
    }
  } catch (err) {
    console.error("Failed to post listing:", err);
  }
};

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:5000/api/listings');
    if (!response.ok) throw new Error('Could not resolve data pipeline.');
    listings.value = await response.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.app-bg {
  min-height: 100vh;
  background-color: #f8fafc;
  background-image: 
    radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.06) 0px, transparent 50%), 
    radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.04) 0px, transparent 50%), 
    linear-gradient(to right, rgba(226, 232, 240, 0.3) 1px, transparent 1px), 
    linear-gradient(to bottom, rgba(226, 232, 240, 0.3) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 30px 30px, 30px 30px;
  color: #2d3748;
  font-family: system-ui, -apple-system, sans-serif;
  display: flex;
  flex-direction: column;
}

.main-header {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  padding: 1.25rem 2rem;
  position: sticky;
  top: 0;
  z-index: 50;
}

.header-content {
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
}

.brand-title span {
  color: #10b981;
}

.status-indicator {
  font-size: 0.85rem;
  color: #718096;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
}

.main-container {
  max-width: 1140px;
  width: 100%;
  margin: 2rem auto;
  padding: 0 1.5rem;
  flex: 1;
  box-sizing: border-box;
}

.card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

.form-card {
  padding: 2rem;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.interactive-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: flex;
  gap: 1.25rem;
  width: 100%;
}

.input-group {
  flex: 1;
  position: relative;
}

.price-input {
  max-width: 250px;
}

.currency-prefix {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  font-weight: 600;
  font-size: 0.95rem;
}

input, select {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background-color: #ffffff;
  font-size: 0.95rem;
  box-sizing: border-box;
}

.price-input input {
  padding-left: 2.5rem;
}

input:focus, select:focus {
  outline: none;
  border-color: #10b981;
}

.btn-submit {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
}

.search-wrapper {
  position: relative;
  margin-bottom: 2.5rem;
}

.search-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
}

.global-search {
  padding-left: 3rem !important;
  font-size: 1.05rem;
  height: 3.25rem;
}

.listings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feed-status-box {
  text-align: center;
  padding: 4rem 2rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px dashed #cbd5e1;
  color: #64748b;
}

.error-state {
  border-color: #fecaca;
  background: #fef2f2;
}

.error-msg {
  color: #dc2626;
  font-weight: 600;
}

.app-footer {
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  color: #94a3b8;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}
.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}
</style>