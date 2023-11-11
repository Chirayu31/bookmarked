import mongoose from 'mongoose';

interface Bookmark {
    userId: mongoose.Types.ObjectId;
    categoryId: mongoose.Types.ObjectId;
    url: string;
}

const bookmarkSchema = new mongoose.Schema<Bookmark>(
    {
        userId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'User'
        },
        categoryId: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: 'Category'
        },
        url: { type: String, required: true },
    },
    { timestamps: true }
);

const Bookmark = mongoose.models.Bookmark || mongoose.model('Bookmark', bookmarkSchema);

export default Bookmark;
