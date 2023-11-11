import mongoose from 'mongoose'

interface ICategory {
    userId: mongoose.Types.ObjectId;
    title: string;
}

const categorySchema = new mongoose.Schema<ICategory>({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    }
})

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema)

export default Category