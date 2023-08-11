module.exports = class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        }:{}

        console.log(keyword)
        this.query=this.query.find({...keyword})
        return this;
    }

    filter() {
        
        const queryCopy  = {...this.queryStr};

        console.log("in filter ",queryCopy)

        //Removing fields from the query
        const removeFields = ['keyword','limt','page']
        removeFields.forEach(el => delete queryCopy[el])

        console.log("in filter ",queryCopy)
        
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr))
        return this;
    }
}