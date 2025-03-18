const { modelName } = require("../models/brandModel");

module.exports=class ApiFeatures{
    constructor(queryMongoose,queryStr){
 this.queryMongoose = queryMongoose;
 this.queryStr = queryStr;
}
Filter(){
    const queryStringObj = { ...this.queryStr };
    const excludesFields = ["page", "limit", "sort", "fields", "keyword"];
    excludesFields.forEach((e) => {
      delete queryStringObj[e];
    });
  
    let queyString = JSON.stringify(queryStringObj);
    queyString = queyString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queyString = JSON.parse(queyString);
    this.queryMongoose = this.queryMongoose.find(queyString);
    return this;
}

 Sort(){
    if (this.queryStr.sort) {
        const sortBy = this.queryStr.sort.split(",").join(" ");
        this.queryMongoose = this.queryMongoose.sort(sortBy);
      } else {
        this.queryMongoose = this.queryMongoose.sort("-createdAt");
      }
      return this;
 }
 
 LimitFields(){
    if (this.queryStr.fields) {
        const fieldsBy = this.queryStr.fields.split(",").join(" ");
        this.queryMongoose = this.queryMongoose.select(fieldsBy);
      } else {
        this.queryMongoose = this.queryMongoose.select("-__v");
      }
      return this;
 }


 Search(modeName){
    if (this.queryStr.keyword) {
        let query = {};
        if(modelName=="Product"){
        query.$or = [
          { title: { $regex: this.queryStr.keyword, $options: "i" } },
          { description: { $regex: this.queryStr.keyword, $options: "i" } },
        ];}
        else{
            query= { name: { $regex: this.queryStr.keyword, $options: "i" } };
        }
        this.queryMongoose = this.queryMongoose.find(query);
      }
      return this;
 }
 Pagination(countDocument){
    const limit = +this.queryStr.limit || 5;
    const Page = +this.queryStr.page || 1;
    const Skip = (Page - 1) * limit;

    let pagination = {};
    pagination.Page=Page;
    pagination.limit=limit;
    // num page
    let numPage=Math.ceil(countDocument/limit);
    pagination.numberPage = numPage;
    // next Page
    if(countDocument > (Page*limit)){
        pagination.nextPage = Page +1;
    }
    // prev Page
    if(Skip>0){
        pagination.prevPage = Page-1;
    }

     this.paginationResult = pagination;
    this.queryMongoose= this.queryMongoose.skip(Skip)
    .limit(limit);
    return this;
 }


}



// module.exports =  ApiFeatures;