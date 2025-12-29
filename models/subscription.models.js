import userRouter from "../routes/user.routes";

const subscriptionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        maxLength:50
    },
    price:{
        type:Number,
        required:[true, 'Price is required'],
        min:[0,'Price cannot be negative']

    },
    currency:{
        type:String,
        enum:['USD','EUR','GBP','INR'],
        required:true,
        trim:true,
        default:'USD'
    },
    frequency:{
        type:String,
        enum:['daily','weekly','monthly','yearly'], 
    },
    catagory:{
        type:String,
        enum:['entertainment','education','productivity','health','other'],
        required:true,
        trim:true
    },
    paymentMode:{
        type:String,
       
        required:true,
        trim:true
    },
    status:{
        type:String,
        enum:['active','cancelled','expired'],
        default:'active',
    },
    startDate:{
        type:Date,
        required:true,
        validate:{
            validator:(value) =>value<=new Date(),
            message:'Start date cannot be in the future',
    }},
    renewalDate:{
        type:Date,
        required:true,
        validate:{
            validator: function(value){
                return value>this.startDate;
            },
            message:'Renewal date must be after start date',
    }},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true,
    }
},{ timestamps: true }); 
subscriptionSchema.pre('save', async function(next){
    if(!this.renewalDate){
        const renewalPeriods={
            daily:1,
            weekly:7,
            monthly:30,
            yearly:365
        };
        this.renewalDate=new Date(this.startDate)
        this.renewalDate.setDate(this.renewalDate.getDate()+ renewalPeriods[this.frequency] );
    }

    if(this.renewalDate <new Date()){
        this.status='expired'
    }
    next();
})

export const Subscription= mongoose.model('Subscription', subscriptionSchema);      