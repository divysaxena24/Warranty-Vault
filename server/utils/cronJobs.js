const cron = require('node-cron');
const Product = require('../models/Product');
const Notification = require('../models/Notification');
const sendEmail = require('./emailService');

const initCronJobs = () => {
  // Run every day at 09:00 AM
  cron.schedule('0 9 * * *', async () => {
    console.log('Running daily warranty check...');
    
    try {
      const today = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(today.getDate() + 7);
      
      // Set to start and end of that day to catch everything in the 24h window
      const startOfDay = new Date(sevenDaysFromNow.setHours(0, 0, 0, 0));
      const endOfDay = new Date(sevenDaysFromNow.setHours(23, 59, 59, 999));

      // Find products expiring in exactly 7 days that haven't been notified yet
      const expiringProducts = await Product.find({
        expiryDate: {
          $gte: startOfDay,
          $lte: endOfDay
        },
        expiryWarningSent: false
      }).populate('user');

      for (const product of expiringProducts) {
        if (!product.user) continue;

        const title = 'Warranty Expiring Soon!';
        const message = `Your warranty for "${product.productName}" (${product.brand}) will expire in 7 days on ${product.expiryDate.toLocaleDateString()}.`;

        // 1. Create In-App Notification
        await Notification.create({
          user: product.user._id,
          title,
          message,
          type: 'expiry_warning',
          relatedProduct: product._id
        });

        // 2. Send Email
        try {
          await sendEmail({
            email: product.user.email,
            subject: title,
            message,
            html: `
              <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #ec4899;">Warranty Expiry Alert</h2>
                <p>Hello <strong>${product.user.name}</strong>,</p>
                <p>This is an automated reminder from <strong>WarrantyVault</strong>.</p>
                <div style="background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #ec4899; margin: 20px 0;">
                  <p style="margin: 5px 0;"><strong>Product:</strong> ${product.productName}</p>
                  <p style="margin: 5px 0;"><strong>Brand:</strong> ${product.brand}</p>
                  <p style="margin: 5px 0;"><strong>Expiry Date:</strong> ${product.expiryDate.toLocaleDateString()}</p>
                </div>
                <p>We recommend checking the item and performing any necessary maintenance before the warranty period ends.</p>
                <p>Best regards,<br/>The WarrantyVault Team</p>
              </div>
            `
          });
        } catch (emailErr) {
          console.error(`Failed to send email to ${product.user.email}:`, emailErr.message);
        }

        // 3. Mark as sent
        product.expiryWarningSent = true;
        await product.save();
        
        console.log(`Notification sent for ${product.productName} (User: ${product.user.email})`);
      }
    } catch (error) {
      console.error('Error in warranty check cron job:', error);
    }
  });
};

module.exports = initCronJobs;
