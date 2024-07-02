const mongoose = require('./mongoConnect');

const agentSchema = new mongoose.Schema({
  agent: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true 
  },
  gender: {
    type: String
  },
  userType: {
    type: String,
    required: true
  },
  policies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy', 
  }]
});

const userAccountSchema = new mongoose.Schema({
  account_name: {
    type: String,
    required: true
  }
});

const lobSchema = new mongoose.Schema({
  category_name: {
    type: String,
    required: true
  }
});

const carrierSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true
  }
});

const policySchema = new mongoose.Schema({
  policy_number: {
    type: String,
    required: true,
    unique: true
  },
  policy_start_date: {
    type: Date,
    required: true
  },
  policy_mode: {
    type: String,
    required: true
  },
  policy_end_date: {
    type: Date,
    required: true
  },  
  policy_type: {
    type: String,
    required: true
  },


policyCategory: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'LOB', 
},

company: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Carrier', 
},

user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User',
},
});

const messageSchema = new mongoose.Schema({
  message: String,
  scheduledAt: Date,
});

module.exports = {
  Agent: mongoose.model('Agent', agentSchema),
  User: mongoose.model('User', userSchema),
  UserAccount: mongoose.model('UserAccount', userAccountSchema),
  LOB: mongoose.model('LOB', lobSchema),
  Carrier: mongoose.model('Carrier', carrierSchema),
  Policy: mongoose.model('Policy', policySchema),
  Message: mongoose.model('Message', messageSchema)
};