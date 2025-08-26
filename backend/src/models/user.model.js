const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
   
    registration_id: {
      type: String,
      required: true,
      trim: true
    },
    name: {
   
      first_name:{
        type: String,
        required:true,
        trim:true
      },

      last_name:{
        type: String,
        required:true,
        trim:true
      },

      full_name:{
        type: String,
        required:true,
        trim:true
      },

      with_initial_name:{
        type: String,
        required:true,
        trim:true
      }

    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    address: {
      line1:{
        type: String,
        trim:true,
        required:true

      },
      line2:{
        type: String,
        trim:true,
      },
      zip:{
        type:String,
        trim:true,
        required: true
      }
    },
    password:{
        type:String,
        required:true
    },
    access_token: {
      type: String
    },
    refresh_token: {
      type: String
    },
    last_login: {
      type: Date
    },
    enable_state: {
      type: Boolean,
      default: true
    },
    type:{
      type:String,
      enum: ['user', 'admin', 'student', 'department', 'lecturer'],
      default: 'user'
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt_timestamp',
      updatedAt: 'updatedAt_timestamp'
    },
    versionKey: false
  }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
