import mongoose, {Schema} from 'mongoose';

const hiveSchema = new Schema(
    {
        hiveId: {
            type: String,
            unique: true,
            required: true
        },
        datePlaced: Date,
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
        numColonies: {
            type: Number,
            min: 0
        }
    }, {timestamps: true}
)

hiveSchema.index({ location: '2dsphere' });

export const Hive = mongoose.model("Hive", hiveSchema);