<template>
  <v-container fluid class="admin-dashboard pa-6">
    <!-- Header -->
    <v-row class="mb-6">
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <div>
          <h1 class="text-h4 font-weight-bold">Admin Dashboard</h1>
          <p class="text-body-2 grey--text mb-0">Manage your products and orders</p>
        </div>
        <div>
          <v-btn outlined color="primary" to="/" class="mr-2">
            <v-icon left>mdi-eye</v-icon>
            View Site
          </v-btn>
          <v-btn color="error" @click="logout">
            <v-icon left>mdi-logout</v-icon>
            Logout
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4" color="primary" dark>
          <div class="d-flex justify-space-between align-center">
            <div>
              <p class="text-body-2 mb-1">Total Products</p>
              <h2 class="text-h4 font-weight-bold">{{ products.length }}</h2>
            </div>
            <v-icon size="48" style="opacity: 0.3;">mdi-package-variant</v-icon>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4" color="success" dark>
          <div class="d-flex justify-space-between align-center">
            <div>
              <p class="text-body-2 mb-1">Total Orders</p>
              <h2 class="text-h4 font-weight-bold">{{ orders.length }}</h2>
            </div>
            <v-icon size="48" style="opacity: 0.3;">mdi-cart-check</v-icon>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4" color="warning" dark>
          <div class="d-flex justify-space-between align-center">
            <div>
              <p class="text-body-2 mb-1">Sold Out</p>
              <h2 class="text-h4 font-weight-bold">{{ soldOutCount }}</h2>
            </div>
            <v-icon size="48" style="opacity: 0.3;">mdi-alert-circle</v-icon>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4" color="accent" dark>
          <div class="d-flex justify-space-between align-center">
            <div>
              <p class="text-body-2 mb-1">Categories</p>
              <h2 class="text-h4 font-weight-bold">{{ categories.length }}</h2>
            </div>
            <v-icon size="48" style="opacity: 0.3;">mdi-tag-multiple</v-icon>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Tabs -->
    <v-tabs v-model="tab" background-color="transparent" grow class="mb-6">
      <v-tab>
        <v-icon left>mdi-package-variant</v-icon>
        Products
      </v-tab>
      <v-tab>
        <v-icon left>mdi-cart</v-icon>
        Orders
      </v-tab>
      <v-tab>
        <v-icon left>mdi-cog</v-icon>
        Settings
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <!-- Products Tab -->
      <v-tab-item>
        <v-card class="pa-6">
          <div class="d-flex justify-space-between align-center mb-6">
            <h3 class="text-h6 font-weight-bold">Manage Products</h3>
            <v-btn color="primary" @click="openProductDialog()">
              <v-icon left>mdi-plus</v-icon>
              Add Product
            </v-btn>
          </div>

          <v-data-table
            :headers="productHeaders"
            :items="products"
            :loading="loading"
            :search="search"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-text-field
                v-model="search"
                label="Search products..."
                prepend-inner-icon="mdi-magnify"
                outlined
                dense
                class="mx-4 mt-4"
                style="max-width: 400px;"
              ></v-text-field>
            </template>

            <template v-slot:item.imageUrl="{ item }">
              <v-avatar size="40" class="my-2">
                <v-img :src="item.imageUrl || 'https://via.placeholder.com/40'" />
              </v-avatar>
            </template>

            <template v-slot:item.price="{ item }">
              ₹{{ item.price.toLocaleString('en-IN') }}
            </template>

            <template v-slot:item.category="{ item }">
              <v-chip small outlined>{{ item.category }}</v-chip>
            </template>

            <template v-slot:item.isSoldOut="{ item }">
              <v-switch
                :input-value="item.isSoldOut"
                @change="toggleSoldOut(item)"
                color="error"
                dense
                hide-details
              ></v-switch>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn icon small color="primary" @click="openProductDialog(item)">
                <v-icon small>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon small color="error" @click="confirmDelete(item)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

      <!-- Orders Tab -->
      <v-tab-item>
        <v-card class="pa-6">
          <h3 class="text-h6 font-weight-bold mb-6">Recent Orders</h3>

          <v-data-table
            :headers="orderHeaders"
            :items="orders"
            :loading="ordersLoading"
            class="elevation-1"
          >
            <template v-slot:item.createdAt="{ item }">
              {{ formatDate(item.createdAt) }}
            </template>

            <template v-slot:item.items="{ item }">
              <v-chip small>{{ item.items.length }} items</v-chip>
            </template>

            <template v-slot:item.finalAmount="{ item }">
              <span class="font-weight-bold">₹{{ item.finalAmount.toLocaleString('en-IN') }}</span>
            </template>

            <template v-slot:item.discount="{ item }">
              <v-chip small :color="item.discount > 0 ? 'success' : 'grey'" dark>
                {{ item.discount }}% OFF
              </v-chip>
            </template>

            <template v-slot:item.freeGift="{ item }">
              <span v-if="item.freeGift">{{ item.freeGift }}</span>
              <span v-else class="grey--text">-</span>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-btn icon small color="primary" @click="viewOrderDetails(item)">
                <v-icon small>mdi-eye</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>

      <!-- Settings Tab -->
      <v-tab-item>
        <v-card class="pa-6">
          <h3 class="text-h6 font-weight-bold mb-6">Settings</h3>

          <v-row>
            <v-col cols="12" md="6">
              <v-card outlined class="pa-4">
                <h4 class="text-subtitle-1 font-weight-bold mb-4">Diwali Date</h4>
                <p class="text-body-2 grey--text mb-4">
                  Set the Diwali date for free shipping calculation (10 days before)
                </p>
                <v-text-field
                  v-model="diwaliDate"
                  label="Diwali Date"
                  type="date"
                  outlined
                  dense
                ></v-text-field>
                <v-btn color="primary" @click="saveDiwaliDate">
                  <v-icon left>mdi-content-save</v-icon>
                  Save
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-tab-item>
    </v-tabs-items>

    <!-- Product Dialog -->
    <v-dialog v-model="productDialog" max-width="600" persistent>
      <v-card>
        <v-card-title>
          {{ editingProduct ? 'Edit Product' : 'Add New Product' }}
          <v-spacer></v-spacer>
          <v-btn icon @click="closeProductDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-form ref="productForm" v-model="productFormValid">
            <v-text-field
              v-model="productForm.name"
              label="Product Name"
              :rules="[v => !!v || 'Name is required']"
              outlined
              dense
            ></v-text-field>

            <v-text-field
              v-model.number="productForm.price"
              label="Price (₹)"
              type="number"
              :rules="[v => v > 0 || 'Price must be greater than 0']"
              outlined
              dense
            ></v-text-field>

            <v-select
              v-model="productForm.category"
              :items="categoryOptions"
              item-text="name"
              item-value="slug"
              label="Category"
              :rules="[v => !!v || 'Category is required']"
              outlined
              dense
            ></v-select>

            <v-text-field
              v-model.number="productForm.popularity"
              label="Popularity Score (1-100)"
              type="number"
              outlined
              dense
            ></v-text-field>

            <!-- Image Upload -->
            <v-file-input
              v-model="imageFile"
              label="Product Image"
              accept="image/*"
              prepend-icon="mdi-camera"
              outlined
              dense
              show-size
            ></v-file-input>

            <v-img
              v-if="productForm.imageUrl"
              :src="productForm.imageUrl"
              max-height="150"
              contain
              class="mb-4"
            ></v-img>

            <v-switch
              v-model="productForm.isSoldOut"
              label="Mark as Sold Out"
              color="error"
            ></v-switch>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeProductDialog">Cancel</v-btn>
          <v-btn color="primary" :loading="saving" @click="saveProduct">
            <v-icon left>mdi-content-save</v-icon>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Delete Confirmation Dialog -->
    <v-dialog v-model="deleteDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete "{{ productToDelete?.name }}"?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="error" :loading="deleting" @click="deleteProduct">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Order Details Dialog -->
    <v-dialog v-model="orderDialog" max-width="600">
      <v-card v-if="selectedOrder">
        <v-card-title>
          Order Details
          <v-spacer></v-spacer>
          <v-btn icon @click="orderDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-list dense>
            <v-list-item v-for="(item, i) in selectedOrder.items" :key="i">
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  ₹{{ item.price }} x {{ item.quantity }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                ₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}
              </v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider class="my-4"></v-divider>

          <div class="d-flex justify-space-between mb-2">
            <span>Subtotal:</span>
            <span>₹{{ selectedOrder.subtotal.toLocaleString('en-IN') }}</span>
          </div>
          <div class="d-flex justify-space-between mb-2">
            <span>Discount:</span>
            <span>{{ selectedOrder.discount }}%</span>
          </div>
          <div v-if="selectedOrder.freeGift" class="d-flex justify-space-between mb-2">
            <span>Free Gift:</span>
            <span>{{ selectedOrder.freeGift }}</span>
          </div>
          <div class="d-flex justify-space-between font-weight-bold">
            <span>Total:</span>
            <span>₹{{ selectedOrder.finalAmount.toLocaleString('en-IN') }}</span>
          </div>

          <v-divider class="my-4"></v-divider>

          <div v-if="selectedOrder.customerPhone">
            <strong>Customer Phone:</strong> {{ selectedOrder.customerPhone }}
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { storage } from '@/firebase/config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      tab: 0,
      search: '',
      productDialog: false,
      deleteDialog: false,
      orderDialog: false,
      productFormValid: true,
      saving: false,
      deleting: false,
      editingProduct: null,
      productToDelete: null,
      selectedOrder: null,
      imageFile: null,
      productForm: {
        name: '',
        price: 0,
        category: '',
        imageUrl: '',
        isSoldOut: false,
        popularity: 50
      },
      productHeaders: [
        { text: 'Image', value: 'imageUrl', sortable: false },
        { text: 'Name', value: 'name' },
        { text: 'Price', value: 'price' },
        { text: 'Category', value: 'category' },
        { text: 'Sold Out', value: 'isSoldOut', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      orderHeaders: [
        { text: 'Date', value: 'createdAt' },
        { text: 'Items', value: 'items' },
        { text: 'Total', value: 'finalAmount' },
        { text: 'Discount', value: 'discount' },
        { text: 'Free Gift', value: 'freeGift' },
        { text: 'Phone', value: 'customerPhone' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters('products', ['allProducts', 'categories', 'isLoading']),
    ...mapGetters('orders', ['allOrders', 'isLoading']),
    ...mapGetters('settings', ['diwaliDate']),
    products() {
      return this.allProducts
    },
    orders() {
      return this.allOrders
    },
    loading() {
      return this.$store.getters['products/isLoading']
    },
    ordersLoading() {
      return this.$store.getters['orders/isLoading']
    },
    soldOutCount() {
      return this.products.filter(p => p.isSoldOut).length
    },
    categoryOptions() {
      return this.categories
    },
    diwaliDate: {
      get() {
        return this.$store.getters['settings/diwaliDate']
      },
      set(val) {
        this._diwaliDate = val
      }
    }
  },
  created() {
    this.fetchProducts()
    this.fetchOrders()
  },
  methods: {
    ...mapActions('products', ['fetchProducts', 'addProduct', 'updateProduct', 'deleteProduct']),
    ...mapActions('orders', ['fetchOrders']),
    ...mapActions('auth', ['logout']),
    ...mapActions('settings', ['setDiwaliDate']),

    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.push('/admin/login')
    },

    openProductDialog(product = null) {
      this.editingProduct = product
      if (product) {
        this.productForm = { ...product }
      } else {
        this.productForm = {
          name: '',
          price: 0,
          category: '',
          imageUrl: '',
          isSoldOut: false,
          popularity: 50
        }
      }
      this.imageFile = null
      this.productDialog = true
    },

    closeProductDialog() {
      this.productDialog = false
      this.editingProduct = null
      this.imageFile = null
    },

    async saveProduct() {
      if (!this.$refs.productForm.validate()) return

      this.saving = true
      try {
        // Upload image if provided
        if (this.imageFile) {
          const storageRef = ref(storage, `products/${Date.now()}_${this.imageFile.name}`)
          await uploadBytes(storageRef, this.imageFile)
          this.productForm.imageUrl = await getDownloadURL(storageRef)
        }

        if (this.editingProduct) {
          await this.$store.dispatch('products/updateProduct', {
            id: this.editingProduct.id,
            data: this.productForm
          })
        } else {
          await this.$store.dispatch('products/addProduct', this.productForm)
        }

        this.closeProductDialog()
        await this.fetchProducts()
      } catch (error) {
        console.error('Error saving product:', error)
      } finally {
        this.saving = false
      }
    },

    async toggleSoldOut(product) {
      try {
        await this.$store.dispatch('products/updateProduct', {
          id: product.id,
          data: { isSoldOut: !product.isSoldOut }
        })
        await this.fetchProducts()
      } catch (error) {
        console.error('Error toggling sold out:', error)
      }
    },

    confirmDelete(product) {
      this.productToDelete = product
      this.deleteDialog = true
    },

    async deleteProduct() {
      this.deleting = true
      try {
        await this.$store.dispatch('products/deleteProduct', this.productToDelete.id)
        this.deleteDialog = false
        this.productToDelete = null
        await this.fetchProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
      } finally {
        this.deleting = false
      }
    },

    viewOrderDetails(order) {
      this.selectedOrder = order
      this.orderDialog = true
    },

    formatDate(date) {
      if (!date) return '-'
      const d = date.toDate ? date.toDate() : new Date(date)
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    saveDiwaliDate() {
      this.$store.dispatch('settings/setDiwaliDate', this._diwaliDate || this.diwaliDate)
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  background: #f5f5f5;
  min-height: 100vh;
}
</style>
