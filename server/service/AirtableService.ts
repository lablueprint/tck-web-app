import airtable from 'airtable';
import { AirtableConfig } from '../airtableConfig';
import CacheService from './CacheService';

export default class AirtableService {
    
    private config: AirtableConfig;
    private table: Airtable.Table<any>;
    private cache: CacheService;

    constructor(config: AirtableConfig) {
        this.config = config;
        const base = new airtable({apiKey: process.env.AIRTABLE_KEY}).base(process.env.AIRTABLE_BASE_ID!);
        this.table = base(config.table);
        this.cache = new CacheService();
    }

    private async getTableContent() {
        const opts: Airtable.SelectOptions = {
            maxRecords: 1000,
        };
        if (this.config.view) {
            opts.view = this.config.view;
        }
        if (this.config.filter) {
            opts.filterByFormula = this.config.filter;
        }
        if (this.config.fields) {
            opts.fields = this.config.fields;
        }

        const records = await this.table.select(opts).all();

        const mappedRecords = records.map(record => {
            return {
                fields: {...record.fields},
                id: record.id,
            };
        })

        return mappedRecords;
    }

    public async getCachedRecord(id: string) {
        if (!this.cache.has()) {
            console.log(`[cache]: Cache is empty, fetching`, `${new Date()}`);
            const records = await this.getTableContent();
            this.cache.set(records);
            const record = records.find((el: any) => {el.id=== id});
            return record;
        }
        if (this.cache.expired()) {
            console.log(`[cache]: Cache is expired, refetching`, `${new Date()}`);
            this.getTableContent().then(records => {
                this.cache.set(records);
                console.log(`[cache]: Cache updated`, `${new Date()}`);
            });
        }
        return this.cache.get().find((el: any) => { return el.id === id});
    }

    public async getCachedTableContent() {
        if (!this.cache.has()) {
            console.log(`[cache]: Cache is empty, fetching`, `${new Date()}`);
            const records = await this.getTableContent();
            this.cache.set(records);
            return records;
        }
        if (this.cache.expired()) {
            console.log(`[cache]: Cache is expired, refetching`, `${new Date()}`);
            this.getTableContent().then(records => {
                this.cache.set(records);
                console.log(`[cache]: Cache updated`, `${new Date()}`);
            });
        }
        return this.cache.get();
    }
}