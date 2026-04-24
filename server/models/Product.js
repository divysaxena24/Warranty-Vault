const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    productName: {
      type: String,
      required: [true, 'Please add a product name'],
    },
    brand: {
      type: String,
      required: [true, 'Please add a brand'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    purchaseDate: {
      type: Date,
      required: [true, 'Please add a purchase date'],
    },
    warrantyPeriod: {
      type: Number,
      required: [true, 'Please add a warranty period in months'],
    },
    expiryDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'expiring soon'],
      default: 'active',
    },
    price: {
      type: Number,
      default: 0,
    },
    serialNumber: {
      type: String,
    },
    invoiceUrl: {
      type: String,
    },
    notes: {
      type: String,
    },
    expiryWarningSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to calculate expiryDate and status
productSchema.pre('save', async function () {
  if (this.purchaseDate && this.warrantyPeriod) {
    const purchase = new Date(this.purchaseDate);
    this.expiryDate = new Date(purchase.setMonth(purchase.getMonth() + this.warrantyPeriod));

    const today = new Date();
    const diffTime = this.expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      this.status = 'expired';
    } else if (diffDays <= 30) {
      this.status = 'expiring soon';
    } else {
      this.status = 'active';
    }
  }
});

module.exports = mongoose.model('Product', productSchema);
