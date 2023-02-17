import dotenv from 'dotenv';

export interface AirtableConfig {
    route: string;
    table: string;
    view?: string;
    filter?: string;
    fields: string[];
}

export const airtableConfigs: Array<AirtableConfig> = [
    {
        route: "books",
        table: "Book",
        fields: [
            'id',
            'title',
            'author',
            'author_name',
            'illustrator',
            'illustrator_name',
            'publisher',
            'date_published',
            'date_added',
            'identity_description',
            'description',
            'image',
            'age_min',
            'age_max',
            'grade_min',
            'grade_max',
            'race/ethnicity',
            'religion',
            'identity_tags',
            'theme/lessons',
            'genre',
            'book_type',
            'bookshop_link',
            'read_aloud_link',
            'educator_guide_link',
            'collections',
        ],
        view: "Grid view",

    },
    {
        route: "collections",
        table: "Collection",
        fields: [
            'name',
            'description',
            'image',
            'books',
            'links',
            'featured',
        ],
        view: "Grid view",
    },
    {
        route: "dictionary",
        table: "Definition",
        fields: [
            'word',
            'definition',
            'links',
            'phonetic_spelling',
        ],
        view: "Grid view",
    },
    {
        route: "metadata",
        table: "Book Tag Metadata",
        fields: [
            'id',
            'name',
            'options',
            'display',
        ],
        view: "Grid view",
    },
        {
        route: "creator",
        table: "Creator",
        fields: [
            'id',
            'name',
            'bio',
            'authored',
            'illustrated',
            'personal_site',
            'image',
        ],
        view: "Grid view",
    },
];