import * as crypto from "crypto";
import * as Aes from "aes-js";

export type ISendPaymentRequestToNewebParameter = {
  paymentId: number;
  orderId: number
  courses: {
    courseId: number;
    name: string;
    price: number;
  }[];
};

export type INewebPayReturnCallbackBody = {
  Status: string;
  MerchantID: string;
  Version: string;
  TradeInfo: string;
  TradeSha: string;
};

type ITradeInfo = {
  MerchantID: string;
  RespondType: string;
  TimeStamp: string;
  Version: string;
  MerchantOrderNo: string;
  Amt: string;
  ItemDesc: string;
  ReturnURL: string;
  NotifyURL: string;
};

type IDescryptResponse = {
  Status: string;
  Message: string;
  Result: {
    MerchantID: string;
    Amt: number;
    TradeNo: string;
    MerchantOrderNo: string;
    RespondType: string;
    IP: string;
    EscrowBank: string;
    PaymentType: string;
    PayTime: string;
    PayerAccount5Code: string;
    PayBankCode: string;
  };
};

export class NewebPaymentService {
  readonly newebPaymentURL = process.env.NEWEB_PAYMENT_URL;
  readonly newebMerchantId = process.env.NEWEB_MERCHANT_ID;
  readonly newebHashKey = process.env.NEWEB_HASH_KEY;
  readonly newebHashIv = process.env.NEWEB_HASH_IV;

  readonly frontendURL = process.env.DOMAIN_URL;
  readonly backendURL = process.env.DOMAIN_URL_BK;

  constructor() { }

  private padding = (text: string) => {
    const len = text.length;
    const pad = 32 - (len % 32);
    text += String.fromCharCode(pad).repeat(pad);
    return text;
  };

  private getQueryString = (data: Record<string, string>) => {
    return Object.entries(data).reduce(
      (acc, [key, value]) => `${acc}${key}=${value}&`,
      ""
    );
  };

  // tradeInfoString
  private createSesDescrypt(tradeInfoString: string) {
    if (!this.newebHashKey || !this.newebHashIv) {
      throw new Error('HashKey or HashIV is empty');
    }

    const algorithm: string = 'AES-256-CBC';
    const decrypt = crypto.createDecipheriv(algorithm, this.newebHashKey, this.newebHashIv);
    decrypt.setAutoPadding(false);
    const text = decrypt.update(tradeInfoString, 'hex', 'utf8');
    const plainText = text + decrypt.final('utf8');
    const result = plainText.replace(/[\x00-\x20]+/g, '');
    return JSON.parse(result) as IDescryptResponse;
  }


  private createMpgAesEncrypt(tradeInfo: ITradeInfo) {
    if (!this.newebHashKey || !this.newebHashIv) {
      throw new Error('HashKey or HashIV is empty');
    }
    const algorithm: string = 'AES-256-CBC';
    const encrypt = crypto.createCipheriv(algorithm, this.newebHashKey, this.newebHashIv);
    const enc = encrypt.update(this.getQueryString(tradeInfo), 'utf8', 'hex');
    return enc + encrypt.final('hex');
  }


  // tradeInfoString
  private createMpgShaEncrypt(aesEncrypt: string) {
    const sha = crypto.createHash("sha256");
    const plainText = `HashKey=${this.newebHashKey}&${aesEncrypt}&HashIV=${this.newebHashIv}`;

    return sha.update(plainText).digest("hex").toUpperCase();
  }

  async getPaymentUrl(data: ISendPaymentRequestToNewebParameter) {
    const price = data.courses.reduce((acc, course) => acc + course.price, 0);

    const tradeInfo: ITradeInfo = {
      MerchantID: this.newebMerchantId.toString(),
      RespondType: "JSON",
      TimeStamp: Date.now().toString(),
      Version: "2.0",
      MerchantOrderNo: data.paymentId.toString(),
      Amt: price.toString(),
      ItemDesc: encodeURIComponent(`購買課程： ${data.courses.map(course => course.name)}`),
      ReturnURL: `${this.frontendURL}/order/${data.orderId}`,
      NotifyURL: `${this.backendURL}/api/order/neweb-pay-notify-callback`,
    };

    const cryptedTradeInfo = this.createMpgAesEncrypt(tradeInfo)

    const cryptedTradeSha = this.createMpgShaEncrypt(cryptedTradeInfo)

    const returnBody = new URLSearchParams({
      MerchantID: this.newebMerchantId,
      TradeInfo: cryptedTradeInfo,
      TradeSha: cryptedTradeSha,
      Version: "2.0",
    });

    return `${this.newebPaymentURL}&${returnBody.toString()}`;
  }

  async refundTransactionPayment(tradeNo: string, amount: number) {
    const cbc = new Aes.ModeOfOperation.cbc(
      Buffer.from(this.newebHashKey),
      Buffer.from(this.newebHashIv)
    );
    const postData = {
      RespondType: "JSON",
      Version: "1.1",
      Amt: amount.toString(),
      TimeStamp: Date.now().toString(),
      IndexType: "2",
      TradeNo: tradeNo,
      CloseType: "2",
    };
    const postDataQueryString = this.getQueryString(postData);
    const cryptedPostData = Aes.utils.hex.fromBytes(
      cbc.encrypt(Aes.utils.utf8.toBytes(this.padding(postDataQueryString)))
    );

    const res = await fetch(`${this.newebPaymentURL}/API/CreditCard/Cancel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        MerchantID: this.newebMerchantId,
        PostData_: cryptedPostData,
      }).toString(),
    });

    const result = await res.json();
  }

  async cancelTransaction(tradeNo: string, amount: number) {
    const cbc = new Aes.ModeOfOperation.cbc(
      Buffer.from(this.newebHashKey),
      Buffer.from(this.newebHashIv)
    );
    const postData = {
      RespondType: "JSON",
      Version: "1.1",
      TimeStamp: Date.now().toString(),
      IndexType: "2",
      TradeNo: tradeNo,
      CloseType: "1",
      Cancel: "1",
      Amt: amount.toString(),
    };
    const postDataQueryString = this.getQueryString(postData);
    const cryptedPostData = Aes.utils.hex.fromBytes(
      cbc.encrypt(Aes.utils.utf8.toBytes(this.padding(postDataQueryString)))
    );

    const res = await fetch(`${this.newebPaymentURL}/API/CreditCard/Close`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        MerchantID: this.newebMerchantId,
        PostData_: cryptedPostData,
      }).toString(),
    });

    const result = (await res.json()) as { Status: string };

    if (result.Status !== "SUCCESS") {
      throw new Error("Cancel failed");
    }
  }

  confirmOrderPayment(
    cryptedTradeInfoString: string,
    cryptedTradeShaString: string
  ) {
    const decodedInfo = this.createSesDescrypt(cryptedTradeInfoString);
    if (decodedInfo.Status !== "SUCCESS") {
      throw new Error("Payment failed");
    }
    const thisShaEncrypt = this.createMpgShaEncrypt(cryptedTradeInfoString);
    if (thisShaEncrypt !== cryptedTradeShaString) {
      throw new Error("Invalid TradeSha");
    }

    return decodedInfo;
  }
}
