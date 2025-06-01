import mongoose, {Schema} from 'mongoose';

const cropSchema = new Schema({
    name: String,
    floweringStart: Date,
    floweringEnd: Date,
    location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true,
          validate: {
            validator: function (value) {
              if (!Array.isArray(value) || value.length !== 2) return false;
    
              const [lng, lat] = value;
    
              if (lng < -180 || lng > 180) return false;
        
              if (lat < -180 || lat > 180) return false;
    
              return true;
            },
            message: props => `Invalid coordinates: [${props.value}]. Expected [longitude, latitude] within valid bounds.`
          }
        }
    },
    recommendedHiveDensity: {
        type: Number,
        min: 0
    }
}, {timestamp: true})

cropSchema.index({ location: '2dsphere' });

export const Crop = mongoose.model("Crop", cropSchema);