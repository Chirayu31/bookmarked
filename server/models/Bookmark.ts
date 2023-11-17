import mongoose from 'mongoose';

interface Bookmark {
    title: string;
    userId: mongoose.Types.ObjectId;
    categoryId: mongoose.Types.ObjectId;
    url: string;
}

const bookmarkSchema = new mongoose.Schema<Bookmark>(
    {
        title: {
            type: String, required: true
        },
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
