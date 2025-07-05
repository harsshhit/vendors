const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

// Vendor schema (simplified for seeding)
const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bankAccountNo: { type: String, required: true },
  bankName: { type: String, required: true },
  addressLine1: String,
  addressLine2: String,
  city: String,
  country: String,
  zipCode: String,
}, {
  timestamps: true
});

const Vendor = mongoose.models.Vendor || mongoose.model('Vendor', vendorSchema);

// Sample vendor data
const sampleVendors = [
  {
    name: "ABC Corporation",
    bankAccountNo: "1234567890",
    bankName: "Chase Bank",
    addressLine1: "123 Main Street",
    addressLine2: "Suite 100",
    city: "New York",
    country: "USA",
    zipCode: "10001"
  },
  {
    name: "XYZ Industries",
    bankAccountNo: "0987654321",
    bankName: "Wells Fargo",
    addressLine1: "456 Business Ave",
    city: "Los Angeles",
    country: "USA",
    zipCode: "90210"
  },
  {
    name: "Tech Solutions Inc",
    bankAccountNo: "1122334455",
    bankName: "Bank of America",
    addressLine1: "789 Innovation Drive",
    addressLine2: "Floor 3",
    city: "San Francisco",
    country: "USA",
    zipCode: "94105"
  },
  {
    name: "Global Services Ltd",
    bankAccountNo: "5566778899",
    bankName: "Citibank",
    addressLine1: "321 Corporate Plaza",
    city: "Chicago",
    country: "USA",
    zipCode: "60601"
  },
  {
    name: "Innovation Partners",
    bankAccountNo: "9988776655",
    bankName: "Goldman Sachs",
    addressLine1: "555 Enterprise Way",
    addressLine2: "Building A",
    city: "Boston",
    country: "USA",
    zipCode: "02108"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Vendor.deleteMany({});
    console.log('Cleared existing vendors');

    // Insert sample data
    const result = await Vendor.insertMany(sampleVendors);
    console.log(`Successfully seeded ${result.length} vendors`);

    // Display the seeded data
    console.log('\nSeeded vendors:');
    result.forEach(vendor => {
      console.log(`- ${vendor.name} (${vendor.bankName})`);
    });

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seed function
seedDatabase(); 