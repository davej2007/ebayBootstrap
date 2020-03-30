export interface IAUCTION {
  _id:String,
  status : number,
  category :number,
  auction : {
      dateListed : Array<number>
      description : string,
      initialPrice : number,
      postage : number,
      weight : number
  },
  sold : {
      dateSold : number,
      auctionNo : string,
      price : number,
      buyer : {userName:String, name:String, postCode:String}
  },
  paid : {
      paidBy          : String,
      postage         : number,
      transactionNo   : String
  },
  fees :{
      finalFee : number,
      postageFee : number,
      paypalFee : number,
  },
  courier : {
      company:String,
      trackingNo:String,
      cost:number,
      delivered : number
  }
}