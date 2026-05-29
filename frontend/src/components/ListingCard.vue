<template>
  <div class="product-card">
    <div class="card-header">
      <span :class="['category-badge', item.category.toLowerCase()]">
        {{ item.category }}
      </span>
    </div>
    <div class="card-body">
      <h3 class="product-title">{{ item.title }}</h3>
      <div class="price-tag">Rs. {{ item.price }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true }
});
</script>

<style scoped>
.product-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.08);
}

.card-header {
  margin-bottom: 1rem;
}

.category-badge {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}

/* Category Color Systems */
.textbooks { background-color: #ecfdf5; color: #059669; }
.electronics { background-color: #eff6ff; color: #2563eb; }
.carpool { background-color: #fef3c7; color: #d97706; }

.product-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.price-tag {
  font-size: 1.4rem;
  font-weight: 800;
  color: #0f172a;
}
</style>